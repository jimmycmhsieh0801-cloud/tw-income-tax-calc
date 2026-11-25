const TAX_PARAMS = {
  115: { exemption: 101000, stdSingle: 136000, stdMarried: 272000, salaryDed: 227000, brackets: [[610000,0.05,0],[1380000,0.12,30500],[2770000,0.20,122900],[5190000,0.30,400900],[Infinity,0.40,1126900]] },
  114: { exemption: 97000, stdSingle: 131000, stdMarried: 262000, salaryDed: 218000, brackets: [[590000,0.05,0],[1330000,0.12,29500],[2660000,0.20,118300],[4980000,0.30,384300],[Infinity,0.40,1080300]] }
};
function calcIncomeTax(grossSalary, marital = "single", dependents = 0, year = "115") {
  const g = Math.max(0, Number(grossSalary) || 0);
  const dep = Math.max(0, Math.floor(Number(dependents) || 0));
  const p = TAX_PARAMS[year] || TAX_PARAMS[115];
  const filers = marital === "married" ? 2 : 1;
  const totalExempt = (filers + dep) * p.exemption;
  const stdDed = marital === "married" ? p.stdMarried : p.stdSingle;
  const salDed = Math.min(g, p.salaryDed);
  const totalDeduction = totalExempt + stdDed + salDed;
  const netIncome = Math.max(0, g - totalDeduction);
  let rate = 0.05, diff = 0;
  for (const [limit, r, d] of p.brackets) {
    if (netIncome <= limit) { rate = r; diff = d; break; }
  }
  const tax = netIncome > 0 ? Math.max(0, Math.round(netIncome * rate - diff)) : 0;
  return { totalDeduction, netIncome, ratePct: Math.round(rate * 100), tax };
}
if (typeof document !== "undefined") {
  const ids = ["grossSalary", "maritalStatus", "dependentsInput", "taxYearSelect"];
  function render() {
    const [g, m, d, y] = ids.map(id => document.getElementById(id).value);
    const res = calcIncomeTax(g, m, d, y);
    document.getElementById("deductEl").textContent = `NT$ ${res.totalDeduction.toLocaleString()}`;
    document.getElementById("netIncEl").textContent = `NT$ ${res.netIncome.toLocaleString()}`;
    document.getElementById("taxRateEl").textContent = res.netIncome > 0 ? `${res.ratePct}%` : "0% (免稅)";
    document.getElementById("taxPayEl").textContent = `NT$ ${res.tax.toLocaleString()}`;
  }
  ids.forEach(id => document.getElementById(id).addEventListener("input", render));
  render();
}
if (typeof module !== "undefined" && module.exports) module.exports = { calcIncomeTax };
