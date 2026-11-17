(() => {
  const API = window.DeltaniumNet.api;
  const REFRESH_MS = 30000;
  const $ = (id) => document.getElementById(id);
  const t = (k, fallback) => (window.DeltaniumI18n ? window.DeltaniumI18n.t(k) : null) || fallback;

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function short(s, n = 10) {
    if (!s) return "—";
    return s.length <= n * 2 ? s : s.slice(0, n) + "…" + s.slice(-6);
  }

  function ago(iso) {
    if (!iso) return "—";
    const sec = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
    if (sec < 90) return sec + "s";
    if (sec < 5400) return Math.round(sec / 60) + "m";
    if (sec < 129600) return Math.round(sec / 3600) + "h";
    return Math.round(sec / 86400) + "d";
  }

  function host(url) {
    try { return new URL(url).host; } catch { return url || "—"; }
  }

  let last = null;

  function pill(n, expectedNet) {
    if (!n.online) return `<span class="pill pill-down">${esc(t("nodes.down", "Offline"))}${n.error ? " · " + esc(n.error) : ""}</span>`;
    if (expectedNet && n.network && n.network !== expectedNet)
      return `<span class="pill pill-warn">${esc(t("nodes.wrongnet", "Other network"))}: ${esc(n.network)}</span>`;
    return `<span class="pill pill-up">${esc(t("nodes.up", "Online"))}</span>`;
  }

  function rows(list, chain, expectedNet, tip) {
    if (!list.length) return `<tr><td colspan="${chain ? 7 : 6}">${esc(t("nodes.none", "No active nodes."))}</td></tr>`;
    return list
      .map((n) => {
        const behind = chain && n.height != null && tip >= 0 && n.height < tip ? ` <small>(−${tip - n.height})</small>` : "";
        return `<tr>
          <td><a href="${esc(n.endpoint)}/api/version" target="_blank" rel="noopener">${esc(host(n.endpoint))}</a></td>
          <td>${pill(n, expectedNet)}</td>
          ${chain ? `<td>${n.height == null ? "—" : esc(n.height) + behind}${n.mempool ? ` <small>· mempool ${esc(n.mempool)}</small>` : ""}</td>` : ""}
          <td>${n.version ? esc(n.version) : "—"}${n.commit ? ` <code>${esc(n.commit)}</code>` : ""}</td>
          <td>${n.latencyMs == null ? "—" : esc(n.latencyMs) + " ms"}</td>
          <td>${esc(ago(n.lastSeen))}</td>
          <td><code title="${esc(n.publicKey)}">${esc(short(n.publicKey))}</code></td>
        </tr>`;
      })
      .join("");
  }

  function render(d) {
    const blockers = d.blockers || [];
    const stores = d.stores || [];
    const all = blockers.concat(stores);
    const up = all.filter((n) => n.online).length;
    const tip = blockers.reduce((m, b) => (b.height != null && b.height > m ? b.height : m), -1);

    $("sumNetwork").textContent = d.network || "—";
    $("sumOnline").textContent = `${up}/${all.length}`;
    $("sumBlockers").textContent = `${blockers.filter((n) => n.online).length}/${blockers.length}`;
    $("sumStores").textContent = `${stores.filter((n) => n.online).length}/${stores.length}`;
    $("sumTip").textContent = tip >= 0 ? String(tip) : "—";
    $("summary").classList.toggle("is-degraded", up < all.length);

    $("blockerBody").innerHTML = rows(blockers, true, d.network, tip);
    $("storeBody").innerHTML = rows(stores, false, d.network, tip);
    $("checkedLine").textContent =
      `${t("nodes.checked", "Checked")} ${new Date(d.checkedAt).toLocaleTimeString()} · ${t("nodes.auto", "refreshes every 30 s")}`;
  }

  async function load() {
    $("refresh").disabled = true;
    try {
      const res = await fetch(`${API}/explorer/nodes`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      last = await res.json();
      render(last);
      $("errorLine").hidden = true;
    } catch (e) {
      $("errorLine").hidden = false;
      $("errorLine").textContent = `${t("nodes.error", "Could not reach the Central API")} (${API}): ${e.message || e}`;
    } finally {
      $("refresh").disabled = false;
    }
  }

  $("refresh").addEventListener("click", load);
  document.addEventListener("deltanium:lang", () => last && render(last));
  load();
  setInterval(() => { if (!document.hidden) load(); }, REFRESH_MS);
})();
