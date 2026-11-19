// Store node income estimate. Prices and splits mirror the Central API defaults
// (GET /api/wallet/economics): storage 800 D/GB-month at 80% to nodes, bandwidth 300 D/GB at 85%,
// Store bond 100,000 D + 50,000 D per started 100 GB.
(() => {
  const P = {
    storagePerGbMonth: 800,
    storageNodeShare: 0.8,
    bandwidthPerGb: 300,
    bandwidthNodeShare: 0.85,
    bondBase: 100000,
    bondPer100Gb: 50000,
  };

  const $ = (id) => document.getElementById(id);
  const num = (el) => {
    const v = parseFloat(el && el.value);
    return Number.isFinite(v) && v > 0 ? v : 0;
  };
  const fmt = (d) => {
    const lang = document.documentElement.lang === "vi" ? "vi-VN" : "en-US";
    return Math.round(d).toLocaleString(lang) + " D";
  };

  const render = () => {
    const stored = $("calc-stored");
    if (!stored) return;
    const gb = num(stored);
    const served = num($("calc-served"));
    const storage = gb * P.storagePerGbMonth * P.storageNodeShare;
    const bw = served * P.bandwidthPerGb * P.bandwidthNodeShare;
    const bond = P.bondBase + Math.ceil(gb / 100) * P.bondPer100Gb;
    $("calc-out-storage").textContent = fmt(storage);
    $("calc-out-bw").textContent = fmt(bw);
    $("calc-out-total").textContent = fmt(storage + bw);
    $("calc-out-bond").textContent = fmt(bond);
  };

  document.addEventListener("DOMContentLoaded", () => {
    ["calc-stored", "calc-served"].forEach((id) => {
      const el = $(id);
      if (el) el.addEventListener("input", render);
    });
    render();
  });
  document.addEventListener("deltanium:lang", render);

  // Live node counts on mainnet (Central API, CORS allows deltanium.com). Hidden if unreachable.
  const loadLive = async () => {
    const box = $("econ-live");
    if (!box) return;
    try {
      const res = await fetch("https://api.deltanium.com/api/explorer/nodes", { cache: "no-store" });
      if (!res.ok) return;
      const d = await res.json();
      const on = (list) => (list || []).filter((n) => n.online).length;
      $("live-stores").textContent = on(d.stores);
      $("live-blockers").textContent = on(d.blockers);
      box.hidden = false;
    } catch (_) {}
  };
  document.addEventListener("DOMContentLoaded", loadLive);
})();
