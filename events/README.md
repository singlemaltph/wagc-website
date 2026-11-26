# 2027 standalone qualifier page — development branch

## Preview (no writes)

The reusable page is `/events/?id=<stable-event-id>`. To test the presentation without an API or personal data, run a static server from the repository root (for example `python3 -m http.server 8000`) and visit `http://localhost:8000/events/?demo=1`. The demo is deliberately fictional, labeled and noindex. The form only exercises browser validation and the same-page acknowledgment; no input is sent, persisted, or logged.

This is a public repository: do not put actual Draft event details, private sheet IDs, player records, financial data, service account keys or payment instructions into source files. The real test row in the master Events sheet stays Draft and is rejected by the public API. Review exact sheet data in an authenticated local/staging workflow only.

## Read-only event adapter (Cloudflare Pages, if confirmed hosting)

`functions/api/events/[id].js` is an opt-in Cloudflare Pages Function. It reads only the 02 Events tab A1:Z201 using a read-only Sheets OAuth token and returns a whitelist of public event fields. It rejects draft, test, non-standalone, unknown, and duplicate IDs, and returns generic errors. No private source data is returned to the browser. Do not use public sheet sharing or a public CSV export.

Before connecting:
- Confirm the production hosting stack supports Pages Functions; test in a protected preview environment first.
- Enable Google Sheets API for a dedicated least-privilege service account; share the private workbook with it as Viewer only. Store the JSON key as encrypted runtime secret `WAGC_SHEETS_SERVICE_ACCOUNT_JSON`; set `WAGC_EVENTS_SHEET_ID` as a runtime variable, not in source. Do not create domain-wide delegation.
- Set `WAGC_EVENTS_READ_ENABLED=true` only after preview validation. Do not change source workbook sharing to public. Restrict/rate-limit the API in hosting configuration as appropriate.
- Check current spreadsheet header names, sheet timezone, formatted values and approved public copy before rollout.
- A public GET must return no data for TEST IDs and Draft status. A new public event can use the stable URL above once approved. The demo route must be removed or restricted before production release.

## Deferred, intentionally

Real form submission is disabled on every non-demo event. No registration POST endpoint, emails, payments, live IDs, or CRM writes are implemented or authorized by this branch. Before enabling registration: approve the 2027 tournament rules and privacy wording, confirm the existing privacy page is suitable, and build a validated backend that looks up the current event and price, checks capacity/status, handles one submission per golfer, preserves shared email/mobile, safely matches internal IDs (no merge solely by contact), stores an immutable registration ID and fee snapshot, records separate consent, and provides idempotency, spam protection, audit trail and transactional email only after a successful save. Confirmation of registration is not payment confirmation. Payment verification remains manual.

No homepage schedule changes, production deployment, actual draft data publication or existing website edits are included. The site remains noindex in development; revisit after approval. Review desktop/mobile layouts, keyboard navigation, form validation, demo-only acknowledgment, API status/privacy behavior, and runtime secrets before launch.

References: https://developers.cloudflare.com/pages/functions/routing/ and https://developers.google.com/identity/protocols/oauth2/service-account
