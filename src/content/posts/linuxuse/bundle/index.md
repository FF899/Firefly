---
title: bundle安装包下载，以Vmware为例
published: 2026-05-21
description: bundle安装包安装教程
image: /assets/images/miao.png
tags:
  - 小知识
category: Linux教程
draft: false
---
# 赋予执行权限
下载的 `.bundle` 文件默认无执行权限，需手动添加：

```
chmod +x VMware-Workstation-Full-*.bundle
```

> [!tip] 记得 `cd` 到父目录下，在进行操作，不然找不到文件

# 启动 GUI 安装向导
以 **root** 权限运行安装程序（普通用户可能因权限不足失败）：

```
sudo ./VMware-Workstation-Full-*.bundle
```