# Deltanium Landing Page: Comprehensive Plan

> [!IMPORTANT]
> **Collaboration Rule**: Do not perform `git commit` or `git push` before the user has reviewed and approved the changes.

This document outlines the system architecture of Deltanium and the strategy for enhancing the landing page to reflect the full scope of the ecosystem.

## 1. System Overview

Deltanium is a decentralized social network ecosystem built on blockchain technology, focusing on user ownership, privacy, and security via Proxy Re-Encryption (PRE).

### Ecosystem Components

- **Deltanium Core** (`../deltanium-core`): The foundation of the network, providing the blockchain logic, consensus mechanisms, and specialized node types (Block Creator, User, Content Store, Inspector, and Router).
- **Deltanium API** (`../deltanium-api`): The central coordination node for user/node registration and management of PRE rekeys.
- **Deltanium App** (`../deltanium-app`): A responsive Flutter mobile application providing a Twitter-like user experience with integrated blockchain features.
- **Deltanium Store** (`../deltanium-store`): Decentralized storage nodes for encrypted content, supporting both ECIES and PRE-based sharing.
- **Deltanium Blocker** (`../deltanium-blocker`): Nodes responsible for processing transactions and creating blocks.
- **Deltanium User** (`../deltanium-user`): A client library simplifying secure interactions with the network.

## 2. Landing Page Current State

The current landing page (`index.html`) is a modern, dark-themed .NET Core static site using "Inter" typography and glassmorphism. It highlights:
- Privacy-centric design.
- Zero-Knowledge principles.
- Blockchain identity.
- Distributed storage.

## 3. Proposed Enhancements

To better showcase the Deltanium ecosystem, the following additions are proposed for the landing page:

### A. Narrative & Storytelling
- **Why Deltanium?**: Explicitly explain the problem of centralized social media (censorship, data mining) and how Deltanium's PRE architecture solves it.
- **PRE Visualization**: Add a section or interactive graphic explaining "Follower-only" sharing via Proxy Re-Encryption without store nodes ever seeing the raw data.

### B. Technical Showcase
- **Node Ecosystem Map**: An interactive diagram showing how User Nodes, Block Creators, and Store Nodes interact.
- **Live Network Stats**: (Future) Integration with the Central API to show total nodes, transactions, and registered users.

### C. Developer & Community
- **Quick Integration**: Code snippets from `deltanium-user` library showing how easy it is to build on Deltanium.
- **Roadmap Section**: Detailed phases from `deltanium-core` (Phase 1-5) to show project maturity.

### D. Advanced Visuals
- Replace current emoji placeholders with custom-generated, high-fidelity technical illustrations.
- Implement subtle micro-animations for the ecosystem grid.

## 4. Strategic Focus Areas

### A. Node Contribution (Network Expansion)
**Goal**: Encourage users to run specialized nodes to strengthen and decentralize the network.

- **Incentive Model**:
    - **Store Nodes**: Earn fees for hosting encrypted content blocks.
    - **Blocker Nodes**: Receive transaction fees for processing and securing the blockchain.
    - **Performance Bonuses**: Higher availability and faster delivery nodes receive priority traffic.
- **Node Management UI**:
    - Simple dashboard mockups for node operators.
    - "Join as Node" CTA with setup guides for common OS/containers.

### B. User Content & Engagement
**Goal**: Drive adoption by highlighting the creator economy and privacy.

- **Creator Economy**:
    - **Direct Donatations**: Integrated D-coin tipping for high-quality content.
    - **Ad-Free Experience**: No data-mining means no targeted ads—pure content.
- **Privacy & Security Showcase**:
    - **Proxy Re-Encryption (PRE)**: Explain how "Follower-only" content is managed without the server ever seeing the key.
    - **Censorship Resistance**: Your identity is your key; no central authority can delete your social graph.
- **Interactive UI Elements**:
    - "Create Post" demo area showing the encryption process in real-time.
    - "Donate" button micro-interaction showcase.

## 5. Development Roadmap

- [x] Research ecosystem documentation.
- [x] Create initial `PLAN.md`.
- [x] Initialize local git and push to remote.
- [x] Refine `PLAN.md` with contribution and engagement strategies.
- [x] Implement Node Contribution section on landing page.
- [x] Implement User Content & Security section on landing page.
- [ ] Add interactive ECIES/PRE visualization.
