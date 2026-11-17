// Which Deltanium network the explorer pages read: mainnet (default) or testnet.
// Picked with ?net=testnet (shareable); the switch and explorer links carry it. Not remembered, so a plain
// link always shows mainnet.
(() => {
  const NETS = {
    mainnet: { api: "https://api.deltanium.com/api", app: "https://app.deltanium.com" },
    testnet: { api: "https://testnet-api.deltanium.com/api", app: "https://testnet-app.deltanium.com" },
  };
  const local = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  const name = new URLSearchParams(location.search).get("net") === "testnet" ? "testnet" : "mainnet";

  const go = (net) => {
    if (net === name) return;
    const u = new URL(location.href);
    if (net === "mainnet") u.searchParams.delete("net"); else u.searchParams.set("net", net);
    location.href = u.toString();
  };

  window.DeltaniumNet = {
    name,
    isTestnet: name === "testnet",
    api: local && name === "mainnet" ? "http://localhost:5002/api" : NETS[name].api,
    app: NETS[name].app,
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-net]").forEach((btn) => {
      const active = btn.getAttribute("data-net") === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.addEventListener("click", () => go(btn.getAttribute("data-net")));
    });
    if (name === "testnet") {
      document.body.classList.add("is-testnet");
      // keep the network when moving between explorer pages
      document.querySelectorAll('a[href^="transactions.html"], a[href^="nodes.html"]').forEach((a) => {
        const [path, hash] = a.getAttribute("href").split("#");
        a.setAttribute("href", path.split("?")[0] + "?net=testnet" + (hash ? "#" + hash : ""));
      });
      document.querySelectorAll("[data-app-link]").forEach((a) => a.setAttribute("href", NETS.testnet.app));
    }
  });
})();
