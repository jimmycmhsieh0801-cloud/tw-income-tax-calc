const assert = require("assert");
const { calcIncomeTax } = require("./app.js");
// 115年度單身年薪 464,000 -> 免稅額101k + 標扣136k + 薪扣227k = 464k -> 淨額 0, 稅 0
const r1 = calcIncomeTax(464000, "single", 0, "115");
assert.strictEqual(r1.netIncome, 0);
assert.strictEqual(r1.tax, 0);
// 年薪 1,000,000 -> 淨額 536,000 -> 5% = 26,800
const r2 = calcIncomeTax(1000000, "single", 0, "115");
assert.strictEqual(r2.netIncome, 536000);
assert.strictEqual(r2.tax, 26800);
console.log("INCOME_TAX_TESTS_PASSED");
