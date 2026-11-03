import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('Market Terminal retains its scanner and shows the cross-project directory', () => {
  assert.match(page, /id="rolTerminalScannerDirectory"/);
  assert.match(page, /id="scan-button"/);
  assert.match(page, /id="scan-status"/);
  assert.match(page, /id="sniper-panel"/);
  assert.match(page, /RO-Lyfe-Tactical-Intelligence-Center-\/rtic-scanner\.js/);
  assert.match(page, /RO-Lyfe-Trading-Intelligence-Classroom\/live-chart-desk/);
  assert.match(page, /RO-Lyfe-Live-Sports-Center\/\?embed=market-lab/);
  assert.match(page, /ROlyfe-Trading-Calculator-Pro/);
});

test('Terminal Scanner Desk dropdown is structurally present within the existing topbar', () => {
  const top = page.indexOf('<div class="topbar">');
  const menu = page.indexOf('id="rolTerminalScannerDirectory"');
  const close = page.indexOf('</div>', top);
  assert.ok(top >= 0 && menu > top && menu < page.indexOf('<div class="section data-status-row">'));
  assert.match(page.slice(menu, menu + 1900), /Market Terminal scanner/);
});
