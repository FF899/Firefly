---
title: ventoy启动U盘制作笔记
published: 2026-05-20
description: 比較簡單
image: /assets/images/miao.png
tags:
  - kali安装
category: 系统安装
draft: false
---

- ventoy下载链接：[ventoy南京大学镜像源](https://mirrors.nju.edu.cn/github-release/ventoy/)
- [kali安装指南](/posts/systemdownload/kali_everything_offline-installation-full-process-guide/)
---
# Linux系统：
1. 下载 `.gz` 后缀的文件，并解压。
2. 打开*ventoy-版本号*，找到*VentoyGUI.x86_64*文件并打开（需要root权限）
3. 可以先设置一下配置选项，把分区类型从MBR改成GPT
4. 注意U盘的选择是否正确（我的启动U盘：sda \[128 GB\] Kinston DataTraveler 3.0 (USB)）
5. 安装会格式化U盘，升级则不会影响
6. 安装好后直接把linux的 `.ios` 镜像文件传入ventoy（小写的那个，如果只出现一个文件夹，那就是直接拖里面就行）的文件夹即可
7. 电脑开机连续快速点击F12，即可选择启动U盘，重装系统  