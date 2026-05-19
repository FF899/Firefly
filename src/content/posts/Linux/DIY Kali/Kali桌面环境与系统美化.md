---
title: linux系统美化
published: 2026-05-20
description: 桌面环境的卸载以及美化，还有登陆页僵尸按钮解决办法、GRUB界面的美化
image: /assets/images/miao.png
tags:
  - linux
category: DIY-Kali
draft: false
---

# 一、桌面环境安装、更换、卸载、美化一条龙
## 装、换、卸
- 我安装kali时就已经选择了Xface、KDE、GNOME了

- `tasksel` 命令可以重新选择预安装桌面环境和工具，也可以删除，但好像删不干净
- Kali官方文档讲解了如何安装卸载以及更改桌面环境([Switching Desktop Environments](https://www.kali.org/docs/general-use/switching-desktop-environments/))
1. **查看已安装桌面环境**
```bash
sudo dpkg -l | grep kali-desktop.     # 使用此命令
# 返回值中的kali-desktop-base、kali-desktop-core不要乱删，有用的
# 其他的则是下载的桌面环境，例如：kali-desktop-kde、kali-desktop-xfce、kali-desktop-gnome 
```

2. **安装桌面环境**
```bash
kali@kali:~$ sudo apt update 
kali@kali:~$ 
kali@kali:~$ sudo apt install -y kali-desktop-kde 
kali@kali:~$ kali@kali:~$ sudo update-alternatives --config x-session-manager 
kali@kali:~$
```

3. **卸载桌面环境**
```bash
kali@kali:~$ sudo apt purge --autoremove --allow-remove-essential kali-desktop-xfce kali@kali:~$
```

4. **删除GDM登陆界面小齿轮图标中的僵尸选项**（其他桌面环境登陆界面同理）
- 其实主要就是看Xorg和Wayland的 `xsessions` 和 `wayland-sessions` 文件夹下的文件。

>[!info]- 删除桌面环境的软件包，并不会自动删除它留下的会话文件
>这些文件是 GDM 显示菜单的直接依据，文件在，选项就在。
>原理很简单：
>- GDM 启动时，去扫描 `/usr/share/xsessions/`（有时也扫描 `/usr/share/wayland-sessions/`）目录下的 `.desktop` 文件。
>- 每一个 `.desktop` 文件对应一个桌面会话选项。
>- 你删了 xfce 和 KDE 的核心程序，但这些 `.desktop` 文件还静静地躺在那，所以菜单里它们依然出现。如果现在选它们，多半会启动失败或报错。

```bash
# 找到会话文件
ls /usr/share/xsessions/
ls /usr/share/wayland-sessions/   # 如果有这个目录也查一下
```

```bash
# 安全删除，注意别删错了
sudo rm /usr/share/xsessions/xfce.desktop
sudo rm /usr/share/xsessions/plasma*.desktop
# 如果有 Wayland 会话目录也清理
sudo rm /usr/share/wayland-sessions/plasma*.desktop
sudo rm /usr/share/wayland-sessions/xfce*.desktop
```

```bash
sudo systemctl restart gdm3 重启GNOME桌面环境
```

>[!tip] 更换桌面环境只需要在登陆界面，选择对应桌面即可。但不建议一次安装许多桌面环境

>[!tip]+ 卸载桌面环境后，一般还会有许多残留软件包以及一些配置文件，可以把不重要的删掉
> 查找包名命令 `dpkg -l | grep gnome` 

## 桌面环境美化
### gdm3美化
- **GNOME官网**： https://www.gnome.org/zh-CN/
- **GNOME主题市场**： https://www.gnome-look.org/browse/
- GNOME美化有些没苦硬吃的感觉，所以我选择转KDE

### KDE美化
- 设置里就有主题商店，很方便，但可能要挂梯子，还要考虑兼容性，整体不错

## 登录界面美化（KDE）
- KDE在设置中有登陆界面样式商店
- KDE登录界面的主题背景图都在 `/usr/share/sddm/themes/` 路经下，可用 `sudo` 将登陆界面主题默认背景替换（应该也可以在打开图片后，点击 “设为壁纸” 设置）

> **SDDM** 和 **GDM3** 都是**显示管理器**，负责管理登录界面。它们与桌面环境的关系非常密切：
> **SDDM**：KDE 桌面环境的默认配套显示管理器。它的视觉效果丰富、支持主题定制，常用于 KDE Plasma（包括你当前使用的 Kali + KDE 环境）。
> **GDM3**：GNOME 桌面环境的默认配套显示管理器。它稳定、安全，并与 GNOME 的 Wayland 会话集成得更好。

# 二、GRUB图形化界面隐藏or美化
## 隐藏
### 一般情况
1. 修改主配置文件 `/etc/default/grub` 
```bash
GRUB_TIMEOUT=0 #把5改成0
GRUB_TIMEOUT_STYLE=hidden #把menu改成hidden，没有这一行就添加
```

2. 使用 `update-grub` 命令使配置生效

### kali特殊情况
- 但是因为 Kali Linux 的 GRUB 主题是**独立强制加载**的，不会受这些时间设定影响。
- 所以虽然设置了 `GRUB_TIMEOUT=0` 和 `GRUB_HIDDEN_TIMEOUT`，GRUB 依然会显示背景图。

3. 所以不介意 GRUB 阶段完全没有图形化（秒闪过，完全无感），有一个更简单、也完全不动原文件的方法——在 `/etc/default/grub` 末尾直接加一行，强制使用文本控制台：
```bash
GRUB_TERMINAL_OUTPUT=console
```

4. 保存后执行 `sudo update-grub`。

5. 这样 GRUB 会跳过所有图形主题，直接黑屏闪过，连背景加载的步骤都省了。

6. 最后 `reboot` 看看~

## 美化
GRUB 界面背景图，主要藏在这两个地方：

1. **主题文件夹里**  
路径是 `/boot/grub/themes/kali/`。  
这个文件夹里通常会有 `theme.txt` 主题配置文件，以及 `grub-4x3.png` 和 `grub-16x9.png` 这类背景图片。

2. **系统镜像目录下** 
路径是 `/usr/share/images/desktop-base/`。  
实际上，真正的图片文件可能就是这里的 `kali-grub.png`。你可能会发现 `/usr/share/images/desktop-base/desktop-grub.png` 只是一个软链接，指向 `/etc/alternatives/desktop-grub` ，但他也是软连接，最终指向 `/usr/share/grub/themes/kali/grub-16x9.png` 。

除非你安装了第三方主题，否则 Kali 默认的 GRUB 背景图一般都在这两个位置。

>[!info] 可以找张好看的背景图，在ps中做个kali原背景图类似的毛玻璃效果，然后然后替换原来的图（建议提前备份）

# 三、启动动画
- 需要下载工具，蛮折腾的，kali的启动动画够帅了，不改