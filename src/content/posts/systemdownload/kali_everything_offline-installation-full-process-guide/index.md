---
title: Kali_everything_离线安装全流程指南
published: 2026-05-20
description: 物理机安装Kali教程，内容包含制作启动U盘、进入启动菜单、具体安装流程。
image: /assets/images/miao.png
tags:
  - linux
  - kali安装
category: 系统安装
draft: false
---
# 准备工作
1. **制作启动U盘**，这边用的是[ventoy](/posts/systemdownload/)
2. 进入官网**下载kali everything** `.torrent` 后缀的文件
3. 我用的是Debian系统，**下载qbittorrent工具**，导入 `.torrent` 后缀的文件**下载everything的ISO镜像**，并**校验SHA256（校验文件）**
	- [qbittorrent下载.torront文件校验对比安装包教程](/posts/systemdownload/qbittorrent/)
4. **确定ISO镜像文件安全**，则可以**导入ventoy启动u盘**准备安装
# Kali-linux -2025-4-installer-everything-amd64.iso安装
## 进入启动菜单
1. 连续按 `F12` 进入启动菜单，选择制作好的ventoy启动U盘，按 `enter` 即可进入ventoy启动菜单
   > 我的启动U盘叫做：**EFI USB Device (KingstonDataTraveler 3.0)**			
2. 进入 Ventoy 启动菜单
	- 选：`kali-linux-YYYY.X-installer-everything.iso`
3. 选择好kali的ios后，选【graphical install ：图形化安装】、【Normal Mode】安装
## Kali 安装流程
### 1️⃣ 语言 & 地区
- Language：**English**（推荐，工具兼容性最好）**但我选中文（简体）**
- Location：China / 你所在国家 **（中国）**
- Keyboard：us / 根据习惯**我选汉语**

> 第二次安装：为了LAM逻辑卷管理
> 我这次选择英文吧，也方便后续的兼容性。
> 

---
### 2️⃣ 网络配置（Everything 离线重点）
- **如果没插网线 / 没 Wi-Fi** 👉 直接选 **Continue without network**
- 不影响 Everything 安装
> 这里我选择 `wlan0：……（无线网络）` 连接了家中的无线网络

⚠️ 不用纠结，这一步**可以跳**

---
### 3️⃣ 用户 & 密码
- 主机名：mimimi
- 域名：无
- 新用户的全名：mimimi
- Username（用户名）：mimimi
- Password（密码）：mimimi
- Root：Kali 新版本 **默认无 root 登录**

---
### 4️⃣ 磁盘分区（重点！）
#### 🔹 推荐方案（最稳）
> 如果这台机器 **专门装 Kali**

选择：
```
Guided - use entire disk         //分区方法
→ All files in one partition     //使用整个磁盘✅
```
然后选择：
```
/dev/nvme0n1 - 512.1GB SKhynix_HFS512GDE9X084N            //选这个✅
SCSI3 (0,0,0) (sda) - 124.0GB Kingston DataTraveler 3.0   //这是启动U盘
```
分区方案选择：**将所有文件放在同一分区中（推荐新手使用）**
最后
```
看见**完成分区操作并将修改写入磁盘**，点击继续
将改动写入磁盘吗？**是**，点击继续就OK了
```

✔️ 简单  
✔️ 不容易炸  
✔️ Everything 体积大，单分区最好

#### 🔹 磁盘大小建议
- **最低：80GB**
- **推荐：100GB+**
Everything 装完真的很大 ⚠️

#### 🔹 写入确认
看到：
```
Write the changes to disk?
```
👉 **Yes**

---
### 5️⃣ 软件选择（Everything 的关键一步）
你会看到一个软件选择界面 👇
### 一定要这样选：
1. ✔️ **Kali desktop**
	- XFCE（默认，最稳）
	- 或 GNOME（吃性能）
2. ✔️ **Kali Linux Everything**（核心！）
	- ❌ 其他不用额外勾（Everything 已全包）
	- 📌 **Everything 选项出现，说明你 ISO 是对的**
> 这里**桌面环境勾选了XFCE、CNOME、KDE**这三个（也就是所有的），**工具选择了Everything**

然后选择默认显示管理器：
- gdm3✅我选择了这个
- lightdm
- sddm
>[!tap]
>1. **gdm3 (GNOME Display Manager)**
>	- **GNOME** 是一个非常流行的桌面环境，而 `gdm3` 是 GNOME 桌面环境的显示管理器。
>	- 选择 `gdm3` 后，你将会进入 GNOME 环境。
>	- GNOME 是一个注重简洁和易用的桌面环境，界面比较现代，适合不喜欢过多自定义的用户。
>2. **lightdm (Light Display Manager)**
>	- `lightdm` 是一个轻量级的显示管理器，通常用于像 `Xfce` 这样的桌面环境，或者其他一些资源较少的环境。
>	- 相较于 `gdm3`，`lightdm` 更轻便、更少占用系统资源，因此对于低配置的机器或者你希望系统尽可能精简的用户来说，`lightdm` 是一个不错的选择。
>3. **sddm (Simple Desktop Display Manager)**
>	- `sddm` 是一个相对较新的显示管理器，专门为 `KDE Plasma` 桌面环境设计，虽然它也能支持其他桌面环境，但与 `KDE Plasma` 的兼容性最好。
>	- 它提供了漂亮的登录界面和许多定制选项，适合那些喜欢个性化配置并且使用 `KDE Plasma` 的用户。
#### 🔹 更改显示管理器
在 Kali / Debian 系统中，可以通过命令来更改当前的显示管理器。
- **执行以下命令**：
```bash
//使用其中一个
sudo dpkg-reconfigure lightdm
sudo dpkg-reconfigure gdm3
sudo dpkg-reconfigure sddm
```

---
### 6️⃣ 安装过程
- ***有不确定领域，暂时跳过，可以选择继续安装，稍后通过命令行或配置文件手动设置。例如：配置Kerberos 身份验证『Configuring Kerberos Authentication』***
- 时间：**30–60 分钟**
- 风扇狂转、磁盘猛写都正常
- 全程 **可以断网**

完成后：
```
Installation complete
```
👉 拔 U 盘 → Reboot

---
***安装完成！！！***