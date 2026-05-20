---
title: Kali系统安装NVIDIA显卡驱动指南
published: 2026-05-20
description: 官方文档有解决办法，sudo apt install nvidia-driver就行
image: /assets/images/miao.png
tags:
  - linux
  - kali安装
category: 系统安装
draft: false
---

> kali安装nvidia驱动特别简单，执行 `sudo apt install nvidia-driver` 即可，但本文对其他发行版应该还有些参考价值

- [Kali官方文档Kali安装NVIDIA GPU驱动程序教程](https://www.kali.org/docs/general-use/install-nvidia-drivers-on-kali-linux/)

---

# 流程总览
 1. 查看显卡硬件及系统版本信息
2. 关于NVIDIA驱动下**GNOME桌面环境**+**wayland**无法正常使用触摸板快捷手势
3. 官网下载对应版本驱动的 `.run` 后缀的驱动安装包
4. 禁用nouveau驱动，并重启
5. 下载nvidia驱动
---

# 1. 查看显卡硬件及系统版本信息与内核版本
## 查看显卡硬件型号
### 方法 1：使用 `lspci` 命令
`lspci` 是一个常用的命令行工具，用于列出所有 PCI 总线设备，包括显卡。

1. 打开终端并输入以下命令：
```bash
    lspci | grep -i vga
```
这样会显示所有显卡，无论是集成显卡还是独立显卡。

### 方法 2：使用 `lshw` 命令
`lshw` 命令可以提供系统硬件的详细信息，包括显卡。
1. 运行以下命令：
```bash
sudo lshw -C display
```
你会看到类似下面的输出，列出显卡的详细信息：
```text
*-display                 
	 description: VGA compatible controller
	 product: GP107 [GeForce GTX 1050 Ti]
	 vendor: NVIDIA Corporation
	 physical id: 0
	 bus info: pci@0000:01:00.0
	 version: a1
	 width: 64 bits
	 clock: 33MHz
	 capabilities: pciexpress msi pm vga_controller bus_master cap_list rom
	 configuration: driver=nvidia latency=0
	 resources: irq:16 memory:f6000000-f6ffffff memory:e0000000-efffffff memory:f0000000-f1ffffff ioport:e000(size=128) memory:f7000000-f707ffff
```
这里显示了显卡的型号、制造商、驱动、总线信息等详细内容。

---
## 查看系统版本信息与内核版本
### 方法 1：使用 `lsb_release` 命令与 `uname -r`命令
`lsb_release` 是用来显示 Linux 系统版本信息的常用工具。
`uname -r` 用来查看内核版本。（此项为后面补充的笔记，很简单，下面就不写了）
1. 打开终端，输入以下命令：
```bash
lsb_release -a
```

输出类似如下：
```text
No LSB modules are available.
Distributor ID: Kali
Description:    Kali GNU/Linux Rolling
Release:        2021.2
Codename:       kali-rolling
```

其中：
- **Distributor ID** 是你的发行版（如 `Kali`）。
- **Description** 是系统的详细名称和版本（如 `Kali GNU/Linux Rolling`）。
- **Release** 是版本号（如 `2021.2`）。
- **Codename** 是系统的代号（如 `kali-rolling`）。

### 方法 2：查看 `/etc/os-release` 文件
这个文件包含了系统的版本信息。

1. 使用以下命令查看内容：
```bash
cat /etc/os-release
```

输出类似如下：
```text
PRETTY_NAME="Kali GNU/Linux Rolling"
NAME="Kali GNU/Linux"
VERSION="2021.2"
VERSION_ID="2021.2"
VERSION_CODENAME="kali-rolling"
ID=kali
ID_LIKE=debian
```

- **PRETTY_NAME** 是系统的完整名称和版本。
- **VERSION** 和 **VERSION_ID** 是版本号。
- **ID** 和 **ID_LIKE** 表示发行版类型，`Kali` 基于 `Debian`。

### 方法 3：使用 `hostnamectl` 命令
`hostnamectl` 是一个系统管理工具，它也可以显示操作系统信息。

1. 运行以下命令：
```bash
hostnamectl
```

输出示例如下：
```text
Static hostname: kali
Icon name: computer-laptop
Chassis: laptop
Machine ID: e35f12b3c0a74a4b9a7a8d30749d2d4f
Boot ID: b9f2832d68214cf5b5f4de43e6e2e8f7
Operating System: Kali GNU/Linux Rolling
Kernel: Linux 5.10.0-kali9-amd64
Architecture: x86-64
```

- **Operating System**：系统的名称和版本（如 `Kali GNU/Linux Rolling`）。
- **Kernel**：当前运行的 Linux 内核版本（如 `5.10.0-kali9-amd64`）。
- **Architecture**：系统架构（如 `x86-64` 表示 64 位系统）。

---
## 我的电脑基本信息
```txt
显卡：
01:00.0 VGA compatible controller: NVIDIA Corporation GA107BM [GeForce RTX 3050 Mobile] (rev a1)
05:00.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Cezanne [Radeon Vega Series / Radeon Vega Mobile Series] (rev c6)
内核版本：
6.18.5+kali-amd64
系统：
No LSB modules are available.
Distributor ID: Kali
Description:    Kali GNU/Linux Rolling
Release:        2025.4
Codenname:      Kali-rolling
```
# 2. 关于NVIDIA驱动下GNOME桌面环境+wayland无法正常使用触摸板快捷手势
## 原因
当 NVIDIA 专有驱动加载后：
- GNOME 会改变渲染路径
- Mutter 会关闭某些 gesture pipeline
- libinput 事件处理优先级会变化
结果就是：
👉 三指切换窗口没了  
👉 四指切换工作区失灵  
👉 手势动画卡顿
不是硬件问题。
### 关键问题
你现在是：
AMD 核显输出  
NVIDIA offload
理论上触摸板不该受影响。
但当：
`nvidia-drm.modeset=1` 启用
- Wayland 走 NVIDIA EGL path    
GNOME 手势偶发会异常。

---
## 解决办法
### 查看GNOME默认使用
打开终端，输入：
```bash
echo $XDG_SESSION_TYPE
Wayland
```
输出含义：
显示 wayland 👉 你在用 Wayland
显示 x11 👉 你在用 X11
### 修复wayland触摸屏快捷手势问题
- 保持 Wayland 、不强制 X11 、不删驱动

终端输入命令，安装并启用：
```bash
sudo apt install gnome-shell-extension-manager
```
安装**Gesture Improvements 扩展**
它会：
- 替代 GNOME 默认 gesture handler
- 重新接管手势
- 修复大部分 NVIDIA 下的失效问题
成功率很高。//没毛，成功了







---

## 其他方案（看看就行，第一个完美解决了）
### 方案二：确认 NVIDIA 不抢主显示
检查：
```
glxinfo | grep "OpenGL renderer"
```
如果显示 NVIDIA，而不是 AMD：
那说明：NVIDIA 接管了主渲  

我们要让系统回到：
AMD 负责桌面  
NVIDIA 仅 offload  

执行：
```
echo "__GLX_VENDOR_LIBRARY_NAME=mesa" | sudo tee -a /etc/environment
```
然后重启。
这会强制桌面走 Mesa（AMD），恢复 gesture

---
### 方案三：关闭 NVIDIA DRM modeset
编辑：
```
sudo nano /etc/default/grub
```

找到：
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

改成：
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nvidia-drm.modeset=0"
```

保存后：
```
sudo update-grub
sudo reboot
```

这会让 Wayland 走更兼容路径。

### 不推荐方案
- 强制切 X11（你已经试过，容易炸）
- 卸载 NVIDIA（没必要）
- 安装 Ubuntu 的 prime 工具（没用）

---
## 基于机器是RTX 3050 Mobile + AMD Cezanne
👉 最稳方案是：
Wayland  
AMD 负责桌面  
prime-run 调 NVIDIA

手势正常  
游戏正常  
系统稳定

---
# 3. 下载nvidia驱动
- 先确定显卡型号、进行系统更新、确认内核版本、确认Secure Boot是否开启、确认当前驱动后再进行下载（wayland的问题后下载后再尝试解决）
- 以下是需要用到的命令：
```bash
lspci | grep -i nvidia  //查看NVIDIA显卡型号
lspci -nn | grep -i vga  //查看电脑上所有的显卡型号

sudo apt update  //更新仓库
sudo apt full-upgrade -y  //更新系统（所有软件）
sudo reboot  //重启

uname -r  //查看内核版本
6.18.5+kali-amd64  //返回值，可能是这个
sudo apt install linux-headers-$(uname -r)  //安装对应的headers

sudo apt install mokutil //kali中没有这个，需要下载一下
mokutil --sb-state  //检查是否Secure Boot开启
SecureBoot enabled  //返回值，如果是此项，就需要去BIOS关闭Secure Boot，我返回的是 disabled，没问题

lsmod | grep nouveau  //查看当前使用的显卡，返回的内容中有红色的nouveau就是正在使用。我的是这样的，没毛
```
## 用官方 apt 安装 nvidia-driver —— 不需要手动禁用 nouveau
> ✅ 在 Kali 2025.4 里**用官方 apt 安装 nvidia-driver —— 不需要手动禁用 nouveau。**

- 当你执行：
```bash
sudo apt install nvidia-driver
```

- 系统会自动做三件事：
	1. 安装 nvidia 内核模块    
	2. 自动 blacklist nouveau
	3. 更新 initramfs

- 也就是说：
	- 👉 **它会自己禁用 nouveau**  
	- 👉 你手动改反而容易出问题

>[!tip]
你是：
RTX 3050 Mobile  
AMD 核显  
内核 6.18  
Secure Boot 关
>
这是**标准 Optimus 双显卡笔记本结构**
在这种结构里：
>- AMD 负责显示输出
>- NVIDIA 只在需要时加载
nouveau 不会长期占用显卡  
>  
真正冲突只会在你强行手动配置错时发生

只有两种情况才需要手动禁：
1. 你用官网 .run 安装包（不推荐）
2. apt 安装失败报 nouveau 正在使用
否则都不用动。

## 安装NVIDIA驱动
直接：
```bash
sudo apt install nvidia-driver
sudo reboot
```

---
## 就算炸了（黑屏）
还能：
```bash
sudo apt purge nvidia*
sudo reboot
```

立刻回到 nouveau。
不会把系统毁掉。

---