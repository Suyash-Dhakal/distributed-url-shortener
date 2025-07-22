# 🔗 Distributed URL Shortener using Redis Sharding + Replication

> Like any standard URL shortener, this service takes a long URL and converts it into a short, shareable link — but with one key difference: **it's built for performance, scalability, and fault-tolerance**.  
> Powered by a **distributed Redis architecture with sharding and master-replica replication**, it ensures balanced load distribution and high availability across multiple nodes — all deployed across Azure VMs with production-grade setup.

---

## 🖼️ Landing Page Preview

<img width="2940" height="1666" alt="Image" src="https://github.com/user-attachments/assets/ad2fa9a5-a492-48d7-ace8-2fc5d3aba7ec" />

---

## ⚙️ Features

- ✂️ Shorten long URLs into compact, easy-to-share links.
- ♻️ TTL (Time-To-Live) support for automatic expiration.
- 🧠 Consistent hashing with CRC32 for even Redis key distribution.
- 🔁 Master-slave replication for fault tolerance.
- 🔒 Error-handled redirects with fallback for missing keys.
- 🌐 Public-facing via Nginx reverse proxy on Azure VM.
- 🖥️ Private Redis cluster VM with 3 master–replica pairs.

---

## 🧠 Architecture Highlights

### 🧮 CRC32-based Hashing for Shard Selection
- URLs are saved by calculating CRC32 of the short ID.
- Based on the hash, a **specific Redis master** is selected.
- Retrievals use the same hash mechanism on **Redis slave**.
- Enhances load distribution and scalability.

### 🌐 Azure Deployment Overview

| Layer             | Details                                               |
|------------------|-------------------------------------------------------|
| VM1 (Public)      | Node.js app behind Nginx reverse proxy               |
| VM2 (Private)     | Redis cluster with 3 master-slave pairs              |
| Redis Ports       | Masters: 6379–6381, Slaves: 7379–7381                |
| Internal Access   | VM1 ↔ VM2 via internal IP only (enhanced security)   |

---

## 🧩 Tech Stack

| Layer     | Tools Used                                     |
|-----------|------------------------------------------------|
| Backend   | Node.js, Express.js, EJS                       |
| Database  | Redis (6 nodes total, with replication)        |
| DevOps    | Docker, Docker Compose, Azure VMs, Nginx       |

---

## 🗂️ Repository Structure

```bash
distributed-url-shortener/
├── src/
│   ├── config/            # Redis client setup
│   ├── controllers/       # Shorten + redirect logic
│   ├── routes/            # Express routes
│   ├── services/          # Redis interaction
│   └── utils/             # CRC32-based hashing logic
├── views/                 # EJS UI (index.ejs, about.ejs)
├── .gitignore                
├── docker-compose.yml     # Redis cluster definition
└── index.js               # Entry point (Express server)

