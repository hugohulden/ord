// Kontrollerar ren logik i appen mot referensvärden (py-fsrs 6.3.3) innan publicering.
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const html = readFileSync(new URL("../src/app.html", import.meta.url), "utf8");
const core = html.match(/<script id="core">([\s\S]*?)<\/script>/)[1];
const api = new Function(core + "; return { newCard, review, diff, distance, suggestRating, detectPatterns, dailyPlan, streak, dayKey, DAY };")();
const { newCard, review, distance, suggestRating, detectPatterns, streak, dayKey, DAY } = api;

const t0 = Date.UTC(2026, 0, 1, 12);
function run(seq) { let c = newCard(t0), now = t0; const out = []; for (const r of seq) { c = review(c, r, now); out.push([c.state, +c.s.toFixed(4), (c.due - now) / 60000]); now = c.due; } return out; }
assert.deepEqual(run([3, 3, 3, 3]), [[1, 2.3065, 10], [2, 2.3065, 2880], [2, 10.971, 15840], [2, 46.3169, 66240]]);
assert.deepEqual(run([4, 3, 1, 3]).map(x => x[2]), [11520, 56160, 10, 4320]);
assert.equal(distance("receipt", "reciept"), 1);
assert.equal(suggestRating("necessary", "neccesary", 3), 1);
assert.equal(suggestRating("rhythm", "rythm", 3), 2);
assert.deepEqual([...detectPatterns("necessary", "necesary")], ["dubbel:s"]);
assert.deepEqual([...detectPatterns("receipt", "reciept")], ["grupp:ei"]);
const now = Date.now();
assert.equal(streak([dayKey(now - DAY), dayKey(now - 2 * DAY)], now), 2);
console.log("Alla tester gick igenom");
