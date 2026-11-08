# Deltanium Landing Page

> Do not `git commit` / `git push` before the user reviews.

Landing copy tracks the current system architecture in App `ARCHITECT.MD` / `CHAT.md` and the Central API security model.

## Architecture reflected on the page

| Claim on landing | Source of truth |
|------------------|-----------------|
| App encrypts locally (ECIES / Umbral PRE) | ARCHITECT §4.3–4.4 |
| Central API indexes only (MySQL registry) | ARCHITECT §2.2 |
| N-of-M full replicas, App orchestrates | ARCHITECT §3.2.1 (`REPLICATION_FACTOR`) |
| Signed `register-replicas` | ARCHITECT §3.2, SignatureAuth |
| Chat online P2P + offline Store files | CHAT.md §2 |
| Store / Block Creator voucher join | ARCHITECT §4.1.2 |
| InternalApi for Store/Blocker | ARCHITECT §4.1.1 |

## Intentionally removed / corrected

- “Zero-Knowledge” → replaced with accurate ECIES / PRE wording
- “Social graph on the blockchain” → graph lives in Central registry
- Fake node-reward dashboard / D-coin tipping mock → operator facts (voucher, roles, ports)
- Inter + emoji glass cards → Syne/Manrope, architecture-first layout

## Page structure

1. Hero — brand + one line on encrypt / index / replicate
2. Architecture flow — encrypt → N-of-M → register-replicas → PRE rekeys
3. Privacy — SignatureAuth, PRE, InternalApi, vouchers
4. Chat — online WebRTC / offline Store + IDOR
5. Ecosystem — App, Central, Store, Block Creator, Core, User
6. Nodes — operator join path + local port map

## Status

- [x] Align landing with P0–P2 + chat hardening architecture
- [ ] Optional: live stats from Central API
- [ ] Optional: deeper PRE interactive diagram
