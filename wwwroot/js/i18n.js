(() => {
  const dict = {
    en: {
      "meta.title": "Deltanium | Encrypt locally. Index centrally.",
      "meta.desc":
        "Decentralized social network with client-side ECIES/Umbral PRE, N-of-M encrypted store replicas, and a Central API that only indexes — never holds your plaintext.",
      "nav.architecture": "Architecture",
      "nav.privacy": "Privacy",
      "nav.chat": "Chat",
      "nav.ecosystem": "Ecosystem",
      "nav.nodes": "Nodes",
      "nav.run": "Run a node",
      "hero.line": "Encrypt locally. Index centrally. Replicate across stores.",
      "hero.sub":
        "A decentralized social network where the app holds the keys, Store nodes hold ciphertext, and Central API never sees your plaintext.",
      "hero.cta1": "See how it works",
      "hero.cta2": "Ecosystem",
      "diagram.centralSub": "index · registry · signaling",
      "diagram.cipher": "ciphertext",
      "diagram.replica": "N-of-M replica",
      "diagram.register": "register-replicas",
      "diagram.decision": "signed decision",
      "arch.kicker": "Post & file path",
      "arch.title": "App orchestrates. Central only indexes.",
      "arch.copy":
        "Content is encrypted on-device, placed as full replicas on N Store nodes, then registered with a signed placement index. Central API coordinates identity, policy, and discovery — not media blobs.",
      "arch.s1.t": "Client-side encryption",
      "arch.s1.p":
        "Posts and files are sealed in the Flutter app with ECIES (private/me) or Umbral PRE (followers). Public posts stay readable; private ones never leave the device as plaintext.",
      "arch.s2.t": "N-of-M store placement",
      "arch.s2.p":
        "The app discovers Store nodes via storenode/list, then uploads the same ciphertext to N nodes (default REPLICATION_FACTOR=2). Full replicas — no DHT sharding in the MVP.",
      "arch.s3.t": "Signed register-replicas",
      "arch.s3.p":
        "Placement is indexed with POST /api/storedfile/register-replicas under SignatureAuth. Same fileId, multiple storeNodeId rows — Central stores the map, not the bytes.",
      "arch.s4.t": "Follower rekeys (PRE)",
      "arch.s4.p":
        "When sharing with followers, the author generates rekeys client-side and uploads them in a signed batch. Followers fetch transform material; Store validates PRE tokens through Central with an internal service token.",
      "priv.kicker": "Security model",
      "priv.title": "Keys on the client. Trust minimized on the wire.",
      "priv.copy":
        "Requests that mutate state are signed with the user key. Replay windows are short. Sensitive service calls between Store/Blocker and Central use an internal token — not user credentials.",
      "priv.sig": "Method + path + timestamp + body hash. Headers: X-User-PubKey, X-Timestamp, X-Signature.",
      "priv.pre": "Followers-only content is re-encrypted for recipients without giving Store the content key.",
      "priv.internal": "Store token validation and Blocker tx pull require X-Internal-Token.",
      "priv.voucher": "Store and Block Creator join with one-shot vouchers consumed once in MySQL.",
      "priv.share": "Share modes",
      "priv.public": "Public — plaintext payload on Store",
      "priv.me": "Me / private — ECIES to owner key",
      "priv.followers": "Followers — PRE encapsulate + rekey",
      "priv.footnote": "Central holds rekey index · Store holds ciphertext",
      "chat.kicker": "Messaging",
      "chat.title": "E2E chat in two modes.",
      "chat.copy":
        "Central never relays message bodies. Online peers talk over WebRTC; offline messages reuse the encrypted file path on Store with N-of-M placement and participant-only access.",
      "chat.online.t": "Online — P2P",
      "chat.online.p":
        "Both users publish presence. Central exchanges WebRTC signaling only. Encrypted packets move peer-to-peer; the API stays out of the content path.",
      "chat.offline.t": "Offline — Store files",
      "chat.offline.p":
        "Each message is one encrypted file on Store. Central indexes conversation metadata. Read/write is limited to conversation participants (signed + IDOR checks).",
      "eco.kicker": "Ecosystem",
      "eco.title": "Specialized parts, clear boundaries.",
      "eco.copy":
        "Every component has one job. The coordination plane is Central; the data plane is Store; consensus work lands on Block Creators; crypto lives in Core and the app.",
      "eco.app.p":
        "Flutter client: identity, encryption, N-of-M upload orchestration, feed, chat, and signed calls to Central.",
      "eco.api.p":
        "MySQL-backed registry for users, follows, stored-file index, PRE rekeys, Store discovery, tx queue, and chat presence/signaling.",
      "eco.store.p":
        "Hold encrypted metadata and blocks. Serve timelines and file downloads. Never receive content keys for private/PRE posts.",
      "eco.blocker.p":
        "Accepts storage operations after verifying Central’s signed selection decision; pulls work with InternalApi auth.",
      "eco.core.p":
        "Umbral PRE native stack (Rust FFI) shared by app and services for encapsulate / rekey / decapsulate.",
      "eco.user.p":
        ".NET client helpers for signing, file workflows, and PRE-backed sharing outside the mobile app.",
      "nodes.kicker": "Operators",
      "nodes.title": "Grow the network by running a node.",
      "nodes.copy":
        "Join with a one-shot voucher. Store nodes expand encrypted capacity and N-of-M durability. Block Creators process verified storage operations under Central’s signed decision.",
      "nodes.store": "Register with STORE_VOUCHER, expose upload/download APIs, validate PRE tokens via Central.",
      "nodes.blocker":
        "Register with VOUCHER, verify decision signatures, accept selected transactions into the mempool.",
      "nodes.open": "Open source",
      "nodes.back": "Back to architecture",
      "nodes.map": "Default local map",
      "nodes.rep": "Replication factor default: 2",
      "cta.title": "Build social software that cannot read you.",
      "cta.copy":
        "Start from the architecture: client keys, N-of-M ciphertext, Central as index. The product surface stays familiar — the trust model does not.",
      "cta.review": "Review the path",
      "cta.operate": "Operate a node",
      "footer.eco": "Ecosystem",
      "lang.switch": "Language",
    },
    vi: {
      "meta.title": "Deltanium | Mã hóa cục bộ. Index tập trung.",
      "meta.desc":
        "Mạng xã hội phi tập trung với ECIES/Umbral PRE phía client, bản sao Store N-of-M, và Central API chỉ index — không giữ plaintext.",
      "nav.architecture": "Kiến trúc",
      "nav.privacy": "Bảo mật",
      "nav.chat": "Chat",
      "nav.ecosystem": "Hệ sinh thái",
      "nav.nodes": "Node",
      "nav.run": "Chạy một node",
      "hero.line": "Mã hóa cục bộ. Index tập trung. Nhân bản trên Store.",
      "hero.sub":
        "Mạng xã hội phi tập trung: app giữ khóa, Store giữ ciphertext, Central API không bao giờ thấy plaintext của bạn.",
      "hero.cta1": "Xem cách hoạt động",
      "hero.cta2": "Hệ sinh thái",
      "diagram.centralSub": "index · registry · signaling",
      "diagram.cipher": "ciphertext",
      "diagram.replica": "bản sao N-of-M",
      "diagram.register": "register-replicas",
      "diagram.decision": "quyết định đã ký",
      "arch.kicker": "Luồng bài & file",
      "arch.title": "App điều phối. Central chỉ index.",
      "arch.copy":
        "Nội dung được mã hóa trên thiết bị, đặt full replica trên N Store, rồi đăng ký bằng placement index đã ký. Central API lo danh tính, policy và discovery — không lưu media.",
      "arch.s1.t": "Mã hóa phía client",
      "arch.s1.p":
        "Bài và file được niêm phong trong app Flutter bằng ECIES (riêng tư) hoặc Umbral PRE (followers). Bài public vẫn đọc được; nội dung riêng không rời máy dưới dạng plaintext.",
      "arch.s2.t": "Đặt Store N-of-M",
      "arch.s2.p":
        "App lấy danh sách Store qua storenode/list, upload cùng ciphertext lên N node (mặc định REPLICATION_FACTOR=2). Full replica — MVP không dùng DHT sharding.",
      "arch.s3.t": "register-replicas đã ký",
      "arch.s3.p":
        "Placement được index bằng POST /api/storedfile/register-replicas với SignatureAuth. Cùng fileId, nhiều storeNodeId — Central lưu bản đồ, không lưu bytes.",
      "arch.s4.t": "Rekey followers (PRE)",
      "arch.s4.p":
        "Khi chia sẻ cho followers, author tạo rekey phía client và upload batch đã ký. Follower lấy vật liệu transform; Store xác thực PRE token qua Central bằng internal service token.",
      "priv.kicker": "Mô hình bảo mật",
      "priv.title": "Khóa ở client. Giảm tin cậy trên đường truyền.",
      "priv.copy":
        "Request thay đổi trạng thái được ký bằng khóa user. Cửa sổ replay ngắn. Gọi dịch vụ nhạy cảm giữa Store/Blocker và Central dùng internal token — không dùng credential user.",
      "priv.sig": "Method + path + timestamp + hash body. Header: X-User-PubKey, X-Timestamp, X-Signature.",
      "priv.pre": "Nội dung chỉ followers được re-encrypt cho người nhận mà Store không có content key.",
      "priv.internal": "Validate token Store và tx pull của Blocker cần X-Internal-Token.",
      "priv.voucher": "Store và Block Creator tham gia bằng voucher one-shot, consume một lần trên MySQL.",
      "priv.share": "Chế độ chia sẻ",
      "priv.public": "Public — payload plaintext trên Store",
      "priv.me": "Me / riêng tư — ECIES tới khóa chủ",
      "priv.followers": "Followers — PRE encapsulate + rekey",
      "priv.footnote": "Central giữ index rekey · Store giữ ciphertext",
      "chat.kicker": "Nhắn tin",
      "chat.title": "Chat E2E với hai chế độ.",
      "chat.copy":
        "Central không relay nội dung tin. Online dùng WebRTC; offline tái sử dụng đường file mã hóa trên Store với N-of-M và chỉ participant được truy cập.",
      "chat.online.t": "Online — P2P",
      "chat.online.p":
        "Hai user publish presence. Central chỉ trao đổi signaling WebRTC. Gói mã hóa đi peer-to-peer; API không nằm trên đường nội dung.",
      "chat.offline.t": "Offline — file trên Store",
      "chat.offline.p":
        "Mỗi tin là một file mã hóa trên Store. Central index metadata hội thoại. Đọc/ghi giới hạn participant (ký + kiểm tra IDOR).",
      "eco.kicker": "Hệ sinh thái",
      "eco.title": "Mỗi phần một việc, ranh giới rõ.",
      "eco.copy":
        "Mặt điều phối là Central; mặt dữ liệu là Store; đồng thuận thuộc Block Creator; crypto nằm ở Core và app.",
      "eco.app.p":
        "Client Flutter: danh tính, mã hóa, điều phối upload N-of-M, feed, chat, và gọi Central có chữ ký.",
      "eco.api.p":
        "Registry MySQL: user, follow, index file, PRE rekey, discovery Store, hàng đợi tx, presence/signaling chat.",
      "eco.store.p":
        "Giữ metadata và block đã mã hóa. Phục vụ timeline và tải file. Không nhận content key của bài riêng/PRE.",
      "eco.blocker.p":
        "Nhận storage operation sau khi xác minh quyết định đã ký của Central; kéo việc bằng InternalApi.",
      "eco.core.p":
        "Stack Umbral PRE native (Rust FFI) dùng chung cho app và dịch vụ: encapsulate / rekey / decapsulate.",
      "eco.user.p":
        "Thư viện .NET hỗ trợ ký, luồng file, và chia sẻ PRE ngoài mobile app.",
      "nodes.kicker": "Vận hành",
      "nodes.title": "Mở rộng mạng bằng cách chạy node.",
      "nodes.copy":
        "Tham gia bằng voucher one-shot. Store tăng dung lượng mã hóa và độ bền N-of-M. Block Creator xử lý storage operation đã được Central ký chọn.",
      "nodes.store": "Đăng ký bằng STORE_VOUCHER, mở API upload/download, validate PRE token qua Central.",
      "nodes.blocker":
        "Đăng ký bằng VOUCHER, xác minh chữ ký quyết định, nhận tx được chọn vào mempool.",
      "nodes.open": "Mã nguồn mở",
      "nodes.back": "Về kiến trúc",
      "nodes.map": "Sơ đồ local mặc định",
      "nodes.rep": "Hệ số nhân bản mặc định: 2",
      "cta.title": "Xây mạng xã hội không đọc được bạn.",
      "cta.copy":
        "Bắt đầu từ kiến trúc: khóa ở client, ciphertext N-of-M, Central là index. Giao diện quen — mô hình tin cậy thì không.",
      "cta.review": "Xem lại luồng",
      "cta.operate": "Vận hành node",
      "footer.eco": "Hệ sinh thái",
      "lang.switch": "Ngôn ngữ",
    },
  };

  const apply = (lang) => {
    const pack = dict[lang] || dict.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (pack[key] != null) el.textContent = pack[key];
    });
    const title = pack["meta.title"];
    const desc = pack["meta.desc"];
    if (title) document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && desc) meta.setAttribute("content", desc);

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    try {
      localStorage.setItem("deltanium.lang", lang);
    } catch (_) {}
  };

  const detect = () => {
    try {
      const saved = localStorage.getItem("deltanium.lang");
      if (saved === "en" || saved === "vi") return saved;
    } catch (_) {}
    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("vi") ? "vi" : "en";
  };

  document.addEventListener("DOMContentLoaded", () => {
    apply(detect());
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => apply(btn.getAttribute("data-lang")));
    });
  });
})();
