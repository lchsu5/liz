const REQUEST_TAB = 'Resume Requests';

// Run once from the Apps Script editor opened through the Google Sheet.
function setupResumeRequests() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(REQUEST_TAB) || spreadsheet.insertSheet(REQUEST_TAB);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted at', 'Name', 'Email', 'Reason']);
    sheet.setFrozenRows(1);
  }
  PropertiesService.getScriptProperties().setProperty('RESUME_SPREADSHEET_ID', spreadsheet.getId());
}

function doPost(event) {
  const fields = event.parameter;
  const requestId = fields.requestId || '';
  const name = (fields.name || '').trim();
  const email = (fields.email || '').trim();
  const reason = (fields.reason || '').trim();
  const valid = /^[a-f\d-]{36}$/i.test(requestId) && name.length > 0 && name.length <= 120
    && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && reason.length > 0 && reason.length <= 2000;

  let saved = false;
  if (valid) {
    const lock = LockService.getScriptLock();
    try {
      lock.waitLock(5000);
      const spreadsheetId = PropertiesService.getScriptProperties().getProperty('RESUME_SPREADSHEET_ID');
      const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(REQUEST_TAB);
      // Store visitor input as text, including values that resemble spreadsheet formulas.
      sheet.appendRow([new Date(), ...[name, email, reason].map(value => "'" + value)]);
      SpreadsheetApp.flush();
      saved = true;
    } catch {
      console.error('Could not save a resume request.');
    } finally {
      if (lock.hasLock()) lock.releaseLock();
    }
  }

  const result = JSON.stringify({ type: 'resume-request', requestId: valid ? requestId : '', saved });
  return HtmlService.createHtmlOutput(`<script>window.top.postMessage(${result}, 'https://lchsu5.github.io');</script>`)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
