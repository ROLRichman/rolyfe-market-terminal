import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const translator=readFileSync(new URL('../rol-translator.js',import.meta.url),'utf8');
test('Market Terminal retains its original scanner and shows the Scanner Desk directory',()=>{
 assert.match(page,/id="rolTerminalScannerDirectory"/);
 assert.match(page,/id="scan-button"/);
 assert.match(page,/id="scan-status"/);
 assert.match(page,/id="sniper-panel"/);
 assert.match(page,/RO-Lyfe-Tactical-Intelligence-Center-\/rtic-scanner\.js/);
 assert.match(page,/RO-Lyfe-Trading-Intelligence-Classroom\/live-chart-desk/);
 assert.match(page,/RO-Lyfe-Live-Sports-Center\/\?embed=market-lab/);
 assert.match(page,/ROlyfe-Trading-Calculator-Pro/);
});

test('Market Terminal exposes the global page-language selector',()=>{
 assert.match(page,/src="rol-translator\\.js"/);
 for(const language of ['English','Spanish','French','Haitian Creole','Portuguese'])assert.ok(translator.includes(language));
 assert.match(translator,/rolPageLanguageSelect/);
 assert.match(translator,/rol-page-translate/);
 assert.match(translator,/MutationObserver/);
 assert.match(translator,/data-market-data/);
 assert.doesNotMatch(translator,/rolTranslateNetworkInput|Use selected text|Paste text to translate/);
});
