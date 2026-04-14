/* Newsletter Specific Styling */
.newsletter-card {
    background: linear-gradient(145deg, #ffffff, #f0f7ff);
    border: 1px solid #bfdbfe;
    margin-top: 24px;
}

.newsletter-sub {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 20px;
    line-height: 1.4;
}

.newsletter-card input[type="email"] {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    margin-bottom: 12px;
    font-size: 14px;
}

/* Segment (Vet/Owner) Buttons */
.segment-selector {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
}

.segment-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    font-weight: 700;
}

.segment-option input { margin: 0; }

/* GDPR Box */
.gdpr-box {
    margin-bottom: 15px;
}

.gdpr-label {
    display: flex;
    gap: 8px;
    cursor: pointer;
}

.gdpr-label input { margin-top: 3px; }

.gdpr-label span {
    font-size: 10px;
    color: #64748b;
    line-height: 1.3;
}

.gdpr-label a { color: #2563eb; text-decoration: none; }

/* Subscribe Button */
.btn-newsletter {
    width: 100%;
    background: #2563eb;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
}

.btn-newsletter:hover { background: #1d4ed8; }