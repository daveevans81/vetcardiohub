#!/usr/bin/env node
/**
 * sign-echo-reference.js — sign, verify or inspect the published reference set.
 *
 * The iOS app adopts an over-the-air `echo-reference.json` only if `echo-reference.json.sig`,
 * published beside it, is a valid Ed25519 signature over the file's exact bytes by the key whose
 * public half is embedded in `Logic/ReferenceSignature.swift`. Uploading a regenerated JSON
 * without re-signing it means every installed copy silently keeps the set it has.
 *
 * USAGE
 *   node Tools/sign-echo-reference.js sign   <echo-reference.json>          writes <file>.sig
 *   node Tools/sign-echo-reference.js verify <echo-reference.json>          exit 0 iff valid
 *   node Tools/sign-echo-reference.js public-key                            prints the base64 key
 *   node Tools/sign-echo-reference.js generate-key                          one-off; refuses to overwrite
 *
 * The private key is read from $VCH_ECHO_SIGNING_KEY, or
 * ~/.vetcardiohub/echo-reference-signing.pem — deliberately outside every repository and outside
 * Dropbox. Back it up to a password manager. Losing it means no further over-the-air updates until
 * an app release carries a new public key.
 */
'use strict';
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const KEY_PATH = process.env.VCH_ECHO_SIGNING_KEY
  || path.join(os.homedir(), '.vetcardiohub', 'echo-reference-signing.pem');

/// The public key the APP trusts. Kept in step with Logic/ReferenceSignature.swift by
/// `Tools/check-generated-files.sh`; `public-key` prints the key derived from the private file so
/// the two can be compared.
const APP_PUBLIC_KEY_BASE64 = 'PQCZjsLICGOUW7qru4dsifdaerUxqlHYFle25P1x7SM=';

function fail(message) { console.error(`✖ ${message}`); process.exit(1); }

function loadPrivateKey() {
  if (!fs.existsSync(KEY_PATH)) fail(`No signing key at ${KEY_PATH}. Run "generate-key" once, or point VCH_ECHO_SIGNING_KEY at it.`);
  return crypto.createPrivateKey(fs.readFileSync(KEY_PATH));
}

function rawPublicKey(publicKey) {
  // SPKI DER for Ed25519 is a fixed 12-byte prefix followed by the 32-byte key.
  return publicKey.export({ type: 'spki', format: 'der' }).subarray(-32);
}

function publicKeyFromRaw(base64) {
  const raw = Buffer.from(base64, 'base64');
  if (raw.length !== 32) fail('public key is not 32 bytes');
  const prefix = Buffer.from('302a300506032b6570032100', 'hex');
  return crypto.createPublicKey({ key: Buffer.concat([prefix, raw]), type: 'spki', format: 'der' });
}

const [command, file] = process.argv.slice(2);

switch (command) {
  case 'sign': {
    if (!file) fail('sign needs the JSON file to sign');
    const data = fs.readFileSync(file);
    JSON.parse(data.toString('utf8')); // refuse to sign something the app could not decode
    const privateKey = loadPrivateKey();
    const derived = rawPublicKey(crypto.createPublicKey(privateKey)).toString('base64');
    if (derived !== APP_PUBLIC_KEY_BASE64) {
      fail(`the key at ${KEY_PATH} is not the key the app trusts (${derived} vs ${APP_PUBLIC_KEY_BASE64}). Signing with it would produce a file every installed copy refuses.`);
    }
    const signature = crypto.sign(null, data, privateKey).toString('base64');
    fs.writeFileSync(`${file}.sig`, signature + '\n');
    console.log(`✔ signed ${path.basename(file)} → ${path.basename(file)}.sig (reviewedDate ${JSON.parse(data).reviewedDate})`);
    break;
  }
  case 'verify': {
    if (!file) fail('verify needs the JSON file to check');
    const sigPath = `${file}.sig`;
    if (!fs.existsSync(sigPath)) fail(`${path.basename(sigPath)} is missing — the app would refuse this set`);
    const data = fs.readFileSync(file);
    const signature = Buffer.from(fs.readFileSync(sigPath, 'utf8').trim(), 'base64');
    const ok = signature.length === 64
      && crypto.verify(null, data, publicKeyFromRaw(APP_PUBLIC_KEY_BASE64), signature);
    if (!ok) fail(`${path.basename(sigPath)} does not match ${path.basename(file)} — re-sign after regenerating`);
    console.log(`✔ ${path.basename(file)} is signed by the key the app trusts`);
    break;
  }
  case 'public-key': {
    const privateKey = loadPrivateKey();
    console.log(rawPublicKey(crypto.createPublicKey(privateKey)).toString('base64'));
    break;
  }
  case 'generate-key': {
    if (fs.existsSync(KEY_PATH)) fail(`${KEY_PATH} already exists; refusing to overwrite a signing key`);
    fs.mkdirSync(path.dirname(KEY_PATH), { recursive: true, mode: 0o700 });
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
    fs.writeFileSync(KEY_PATH, privateKey.export({ type: 'pkcs8', format: 'pem' }), { mode: 0o600 });
    console.log(`✔ private key written to ${KEY_PATH}`);
    console.log(`  public key (paste into Logic/ReferenceSignature.swift and this script): ${rawPublicKey(publicKey).toString('base64')}`);
    break;
  }
  default:
    fail('usage: sign <file> | verify <file> | public-key | generate-key');
}
