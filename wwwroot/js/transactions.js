(() => {
  const API = window.DeltaniumNet.api;

  const limit = 30;
  let offset = 0;
  let total = 0;

  const $ = (id) => document.getElementById(id);
  const tr = (key, args = {}) => {
    let v = (window.DeltaniumI18n && window.DeltaniumI18n.t(key)) || key;
    for (const [k, x] of Object.entries(args)) v = v.replace(`{${k}}`, x);
    return v;
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** StorageTerm data.terms is a JSON string of { fileId, status, paidUntil, deleteAfter, blocks? }. */
  function parseTerms(data) {
    const raw = data && (data.terms ?? data.Terms);
    if (typeof raw !== "string") return null;
    try {
      const list = JSON.parse(raw);
      return Array.isArray(list) ? list : null;
    } catch {
      return null;
    }
  }

  function fmtDate(ts) {
    if (!ts) return "—";
    try {
      return new Date(ts * 1000).toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });
    } catch {
      return String(ts);
    }
  }

  function statusLabel(status) {
    const key = "tx.terms.st." + status;
    const label = tr(key);
    return label === key ? status : label;
  }

  function renderTerms(terms, q) {
    const view = $("termView");
    const needle = (q || "").toLowerCase();
    const hit = (t) => needle.length > 0 && String(t.fileId || "").toLowerCase().includes(needle);
    const rows = [...terms].sort((a, b) => (hit(b) ? 1 : 0) - (hit(a) ? 1 : 0));
    view.innerHTML = `
      <h3>${esc(tr("tx.terms.title"))} · ${esc(tr("tx.terms.items", { n: String(terms.length) }))}</h3>
      <p class="tx-terms-help">${esc(tr("tx.terms.help"))}</p>
      <div class="tx-table-wrap"><table class="tx-table">
        <thead><tr>
          <th>${esc(tr("tx.terms.file"))}</th><th>${esc(tr("tx.terms.status"))}</th>
          <th>${esc(tr("tx.terms.paid"))}</th><th>${esc(tr("tx.terms.delete"))}</th><th>${esc(tr("tx.terms.blocks"))}</th>
        </tr></thead>
        <tbody>${rows
          .map((t) => `<tr${hit(t) ? ` class="is-match" title="${esc(tr("tx.terms.match"))}"` : ""}>
            <td><code title="${esc(t.fileId)}">${esc(short(t.fileId, 12))}</code></td>
            <td>${esc(statusLabel(t.status))}</td>
            <td>${esc(fmtDate(t.paidUntil))}</td>
            <td>${esc(fmtDate(t.deleteAfter))}</td>
            <td>${Array.isArray(t.blocks) ? t.blocks.length : "—"}</td>
          </tr>`)
          .join("")}</tbody>
      </table></div>`;
    view.hidden = false;
  }

  function short(s, n = 10) {
    if (!s) return "—";
    if (s.length <= n * 2) return s;
    return s.slice(0, n) + "…" + s.slice(-6);
  }

  function fmtTime(ts) {
    if (!ts) return "—";
    try {
      return new Date(ts * 1000).toLocaleString();
    } catch {
      return String(ts);
    }
  }

  async function loadStatus() {
    try {
      const res = await fetch(`${API}/explorer/status`);
      const data = await res.json();
      $("statusLine").textContent =
        `Tip height: ${data.tipHeight ?? data.TipHeight ?? "—"} · blockers ${data.reachableBlockers ?? data.ReachableBlockers ?? 0}/${data.activeBlockers ?? data.ActiveBlockers ?? 0}`;
    } catch (e) {
      $("statusLine").textContent = "Could not reach explorer API.";
    }
  }

  async function search() {
    const q = $("q").value.trim();
    const type = $("type").value;
    const includePending = $("pending").checked;
    $("metaLine").textContent = "Loading…";
    $("detail").hidden = true;
    $("termView").hidden = true;

    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      includePending: includePending ? "true" : "false",
    });
    if (q) params.set("q", q);
    if (type && type !== "all") params.set("type", type);

    try {
      const res = await fetch(`${API}/explorer/txs?${params}`);
      const data = await res.json();
      const items = data.items || data.Items || [];
      total = data.total ?? data.Total ?? items.length;
      offset = data.offset ?? data.Offset ?? offset;
      $("metaLine").textContent = `Showing ${items.length} of ${total} (offset ${offset})`;
      renderRows(items);
      $("btnPrev").disabled = offset <= 0;
      $("btnNext").disabled = offset + limit >= total;
    } catch (e) {
      $("metaLine").textContent = String(e.message || e);
      $("txBody").innerHTML = "";
    }
  }

  function renderRows(items) {
    const body = $("txBody");
    if (!items.length) {
      body.innerHTML = `<tr><td colspan="7">No transactions.</td></tr>`;
      return;
    }
    body.innerHTML = items
      .map((t) => {
        const id = t.id || t.Id || "";
        const type = t.type || t.Type || "";
        const from = t.from || t.From || "";
        const terms = type === "StorageTerm" ? parseTerms(t.data || t.Data) : null;
        const count = (t.data || t.Data || {}).count ?? (terms ? terms.length : null);
        const to = type === "StorageTerm" && count != null ? tr("tx.terms.items", { n: String(count) }) : t.to || t.To || "";
        const ts = t.timestamp || t.Timestamp || 0;
        const height = t.blockHeight ?? t.BlockHeight;
        const status = t.status || t.Status || "";
        return `<tr data-id="${id}">
          <td>${fmtTime(ts)}</td>
          <td>${type}</td>
          <td><code title="${id}">${short(id)}</code></td>
          <td><code title="${from}">${short(from)}</code></td>
          <td><code title="${to}">${short(to)}</code></td>
          <td>${height == null ? "—" : height}</td>
          <td>${status}</td>
        </tr>`;
      })
      .join("");

    body.querySelectorAll("tr[data-id]").forEach((tr) => {
      tr.addEventListener("click", () => showDetail(tr.getAttribute("data-id")));
    });
  }

  async function showDetail(txId) {
    if (!txId) return;
    $("detail").hidden = false;
    $("detail").textContent = "Loading " + txId + "…";
    try {
      const res = await fetch(`${API}/explorer/txs/${encodeURIComponent(txId)}`);
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
      $("detail").textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      const type = data && (data.type || data.Type);
      const terms = type === "StorageTerm" ? parseTerms(data.data || data.Data) : null;
      if (terms) renderTerms(terms, $("q").value.trim());
      else $("termView").hidden = true;
    } catch (e) {
      $("detail").textContent = String(e.message || e);
    }
  }

  $("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    offset = 0;
    search();
  });
  $("btnPrev").addEventListener("click", () => {
    offset = Math.max(0, offset - limit);
    search();
  });
  $("btnNext").addEventListener("click", () => {
    offset = offset + limit;
    search();
  });

  loadStatus();
  search();
})();
