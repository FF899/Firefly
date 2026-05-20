---
title: qbittorrent下载.torront文件校验对比安装包教程
published: 2026-05-20
description: 下载 Kali Everything 的 .torrent 文件教程
image: /assets/images/miao.png
tags:
  - kali安装
category: 系统安装
draft: false
---

# 步骤总览（先心里有个数）
1. 安装 torrent 客户端（推荐 qBittorrent）
2. 下载 Kali Everything 的 `.torrent` 文件
3. 用 torrent 客户端打开
4. 等下载完成
5. 校验 SHA256（强烈建议）
---
- **以debian系统为例**
- [以安装kali系统为例](/posts/systemdownload/kali_everything_offline-installation-full-process-guide/)
---
## 步骤 1：安装 Torrent 客户端（Debian）
### 推荐：qBittorrent（有界面，省事）
```bash
sudo apt update
sudo apt install qbittorrent -y
```

装完后：
```bash
qbittorrent &   //打开qbittorrent工具
```

---
## 步骤 2：下载 Kali Everything 的 torrent 文件
### 方法 A：官网获取（我使用的方法）
1. 打开浏览器
2. 访问：
```
https://www.kali.org/get-kali/
```

3. 找到 **Installer**
4. 选择 **Everything**
5. 点 **Torrent**
6. 得到一个文件：
```
kali-linux-YYYY.X-installer-everything.iso.torrent
```

保存到任意目录（比如 `~/Downloads`）

---
### 方法 B：命令行直接下 torrent（快）

```bash
cd ~/Downloads
wget https://cdimage.kali.org/current/kali-linux-installer-everything-amd64.iso.torrent
```

> 如果版本号不同，文件名会略有变化，但 **包含 everything 就对**

---
## 步骤 3：用 qBittorrent 打开 torrent
### 图形界面方式

```bash
qbittorrent //打开qbittorrent
```

- 点 **“添加 Torrent 文件”**
- 选刚才的 `.torrent`
- 选择保存目录（⚠️ 确保磁盘 ≥ 80GB）
- 点 **开始**

---
### 命令行一行搞定（也能用）

```bash
qbittorrent ~/Downloads/kali-linux-*-everything*.torrent
```

---
## 步骤 4：等待下载完成

- 时间取决于你的带宽
- Torrent 可以断点续传
- 下完状态会显示 **100% / Seeding**

生成的文件就是：

```
kali-linux-YYYY.X-installer-everything.iso
```

---

## 步骤 5：校验 SHA256（强烈建议）

### 1️⃣ 下载校验文件

```bash
wget https://cdimage.kali.org/current/SHA256SUMS
```

### 2️⃣ 校验

```bash
sha256sum kali-linux-YYYY.X-installer-everything.iso
```

### 3️⃣ 对比

在 `SHA256SUMS` 里找到对应文件名：

```bash
grep everything SHA256SUMS
```

两者 **完全一致** 才算安全 ✅

---

## 下完之后你可以~
- 写入 U 盘安装实体机
- VMware / VirtualBox 直接挂 ISO
- 离线安装 Everything（不联网）

---

## 常见问题提前帮你避坑
❌ **下错成 Live ISO**  
→ 文件名一定要有 `installer-everything`

❌ **磁盘不够** → ISO 10GB + 安装后 50~70GB

❌ **下载很慢** → Torrent 里右键 → 强制开始  
→ 等几分钟会有更多 seed

---
