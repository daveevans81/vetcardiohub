#!/bin/bash
#
# Regenerate echo-reference.json.command
#
# Double-click this file to rebuild med-data.json from med-data.js.
#
# SETUP (once): keep these three files together in ONE folder —
#   • Regenerate echo-reference.json.command   (this file)
#   • generate-echo-reference-json.js          (the generator)
#   • echo-breeds.js                        (your source of truth)
# Double-click whenever you've edited med-data.js. It writes med-data.json next to them;
# then push both echo-breeds.js and echo-reference.json to the web.
#
# (If macOS blocks it the first time: right-click → Open, or run
#  `chmod +x "Regenerate echo-reference.json.command"` in Terminal once.)

# Folder this launcher lives in (quoted throughout so spaces in the path are fine).
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR" || exit 1

pause_and_exit() {
  echo
  read -n 1 -s -r -p "Press any key to close this window…"
  echo
  exit "$1"
}

# Locate Node: PATH first, then the usual install locations (double-clicked launchers can
# start with a slim PATH).
NODE="$(command -v node 2>/dev/null)"
if [ -z "$NODE" ]; then
  for p in /usr/local/bin/node /opt/homebrew/bin/node /opt/local/bin/node; do
    if [ -x "$p" ]; then NODE="$p"; break; fi
  done
fi
if [ -z "$NODE" ]; then
  echo "✖ Could not find Node.js."
  echo "  Install it from https://nodejs.org and try again."
  pause_and_exit 1
fi

SCRIPT="$DIR/generate-echo-reference-json.js"
INPUT="$DIR/echo-breeds.js"
OUTPUT="$DIR/echo-reference.json"

if [ ! -f "$SCRIPT" ]; then
  echo "✖ Can't find generate-echo-reference-json.js in this folder:"
  echo "  $DIR"
  echo "  Put the launcher in the same folder as the generator script."
  pause_and_exit 1
fi
if [ ! -f "$INPUT" ]; then
  echo "✖ Can't find echo-breeds.js in this folder:"
  echo "  $DIR"
  echo "  Put your echo-breeds.js in the same folder as this launcher."
  pause_and_exit 1
fi

echo "Node:   $("$NODE" --version)"
echo "Folder: $DIR"
echo "--------------------------------------------------------------"
"$NODE" "$SCRIPT" "$INPUT" "$OUTPUT"
STATUS=$?
echo "--------------------------------------------------------------"

if [ "$STATUS" -eq 0 ]; then
  echo "✅ Done. echo-reference.json is up to date."
  echo "   Push BOTH echo-breeds.js and echo-reference.json to the web."
else
  echo "✖ Generation failed (see messages above). echo-reference.json was NOT changed."
fi
pause_and_exit "$STATUS"
