---
title: Git命令速查表
published: 2026-05-20
description: 一份Git命令速查表
image: /assets/images/Git图标.png
tags:
  - Git
  - Github
category: 文件管理
draft: false
---
# Git命令速查表

本文档用来查看Git所有命令

> Git官方有英文速览表和电子书，在[这里](https://git-scm.com/cheat-sheet.pdf)，英文好的话，可以直接看官方的就行

> [!tip]- 使用 git 前，你应该了解这些
>  **git是什么？github是什么？**
> 
> > git 是一个用来管理文件版本的工具（就一个以版本的形式管理文件的工具），gihub则是一个线上仓库，允许用户通过 git 上传文件到线上仓库中。也可以看看 [菜鸟](https://www.runoob.com/git/git-tutorial.html)中的介绍
>
> **Git工作流程？Git如何安装？**
> 
>> git工作流程：
>> ![git工作流程](https://www.runoob.com/wp-content/uploads/2015/02/git-workflow-runoob-1770781044589.svg) 
>> 
>> 安装 git：
>> 1. linux系统：
>> ```bash
>> # Debian系列 
>> apt-get install git
>> # RedHat系列 
>> yum -y install git-core
>> ```
>> 
>> 2. win系统，在下面网站直接下载 exe 安装文件并运行 
>> https://git-scm.com/install/windows

## 初始化

| 操作 | 命令 |
|------|------|
| 新建仓库 | `git init` |
| 克隆已有仓库 | `git clone <url>` |

## 准备提交

| 操作                      | 命令                       |
| ----------------------- | ------------------------ |
| 添加未跟踪文件或未暂存的修改          | `git add <file>`         |
| 添加所有未跟踪文件和未暂存修改         | `git add .`              |
| 选择文件的部分内容暂存             | `git add -p`             |
| 移动文件                    | `git mv <old> <new>`     |
| 删除文件                    | `git rm <file>`          |
| 让 Git 忽略某个文件但不删除它（取消跟踪） | `git rm --cached <file>` |
| 取消暂存一个文件                | `git reset <file>`       |
| 取消暂存所有文件                | `git reset`              |
| 查看已添加了什么                | `git status`             |

## 提交

| 操作                 | 命令                    |
| ------------------ | --------------------- |
| 提交（会打开文本编辑器写提交信息）  | `git commit`          |
| 提交并直接写信息           | `git commit -m '信息'`  |
| 提交所有已跟踪文件的修改（跳过暂存） | `git commit -am '信息'` |

## 分支切换

| 操作          | 命令                                                |
| ----------- | ------------------------------------------------- |
| 切换分支        | `git switch <name>` 或 `git checkout <name>`       |
| 创建分支        | `git switch -c <name>` 或 `git checkout -b <name>` |
| 列出所有分支      | `git branch`                                      |
| 按最近提交时间排列分支 | `git branch --sort=-committerdate`                |
| 删除分支        | `git branch -d <name>`                            |
| 强制删除分支      | `git branch -D <name>`                            |

## 对比差异（Diff）

### 暂存/未暂存的改动

| 操作 | 命令 |
|------|------|
| 查看所有暂存和未暂存的改动 | `git diff HEAD` |
| 只查看已暂存的改动 | `git diff --staged` |
| 只查看未暂存的改动 | `git diff` |

### 提交之间的差异

| 操作 | 命令 |
|------|------|
| 查看某次提交和它父提交的差异 | `git show <commit>` |
| 对比两次提交 | `git diff <commit> <commit>` |
| 查看某次提交以来某个文件的改动 | `git diff <commit> <file>` |
| 查看差异摘要 | `git diff <commit> --stat` 或 `git show <commit> --stat` |

### 引用提交的方式

当命令中出现 `<commit>` 时，可以用以下任意方式：

| 方式 | 示例 |
|------|------|
| 分支名 | `main` |
| 标签 | `v0.1` |
| 提交 ID | `3e887ab` |
| 远程分支 | `origin/main` |
| 当前提交 | `HEAD` |
| 3 次提交之前 | `HEAD^^^` 或 `HEAD~3` |

## 丢弃修改

| 操作 | 命令 |
|------|------|
| 丢弃一个文件的未暂存修改 | `git restore <file>` 或 `git checkout <file>` |
| 丢弃一个文件的所有修改（暂存+未暂存） | `git restore --staged --worktree <file>` 或 `git checkout HEAD <file>` |
| 丢弃所有修改（暂存+未暂存） | `git reset --hard` |
| 删除未跟踪文件 | `git clean` |
| 暂存（Stash）所有修改 | `git stash` |

## 修改历史

| 操作 | 命令 |
|------|------|
| "撤销"最近一次提交（保留工作目录不变） | `git reset HEAD^` |
| 将最近 5 次提交合并为 1 个 | `git rebase -i HEAD~6`，然后把要合并的提交的 `pick` 改成 `fixup` |
| 撤销失败的 rebase | `git reflog BRANCHNAME`，手动找到正确的提交 ID，然后 `git reset --hard <commit>` |
| 修改最近一次的提交信息（或补充忘记的文件） | `git commit --amend` |

## 代码考古

| 操作 | 命令 |
|------|------|
| 查看分支历史 | `git log main` |
| 图形化查看历史 | `git log --graph main` |
| 单行显示历史 | `git log --oneline` |
| 查看修改过某个文件的所有提交 | `git log <file>` |
| 查看修改过某个文件的所有提交（含重命名前） | `git log --follow <file>` |
| 查找添加或删除了某段文本的所有提交 | `git log -G banana` |
| 查看文件的每一行最后是谁改的 | `git blame <file>` |

## 合并分叉的分支

### Rebase（变基）

```
git switch banana
git rebase main
```

```
之前:  A──B──C──D──E   main
             \
              D'──E'    banana

之后:  A──B──C──D──E   main
                 \
                  D'──E'    banana（"丢失"）
```

### Merge（合并）

```
git switch main
git merge banana
```

```
之前:  A──B──C──D──E   main
             \
              D'──E'    banana

之后:  A──B──C──D──E──◇  main
             \       /
              D'──E'    banana
```

### Squash Merge（压缩合并）

```
git switch main
git merge --squash banana
git commit
```

```
之前:  A──B──C──D──E   main
             \
              D'──E'    banana

之后:  A──B──C──D──E──D'+E'  main
             \
              D'──E'    banana
```

### Fast-Forward Merge（快进合并，把分支同步到最新）

```
git switch main
git merge banana
```

```
之前:  A──B──C──D──E   main
                     \
                      F   banana

之后:  A──B──C──D──E──F   main, banana
```

### Cherry-pick（摘取一个提交到当前分支）

```
git cherry-pick <commit>
```

```
之前:  A──B──C──D──E   main
             \
              D'──E'    banana

之后:  A──B──C──D──E──D'  main
             \
              D'──E'    banana
```

## 恢复旧文件

| 操作 | 命令 |
|------|------|
| 从某次提交中恢复某个文件 | `git checkout <commit> <file>` 或 `git restore <file> --source <commit>` |

## 远程仓库

| 操作 | 命令 |
|------|------|
| 添加远程仓库 | `git remote add <name> <url>` |

## 推送（Push）

| 操作 | 命令 |
|------|------|
| 推送 main 分支到远程 origin | `git push origin main` |
| 推送当前分支到它的远程跟踪分支 | `git push` |
| 推送一个从未推送过的分支 | `git push -u origin <name>` |
| 安全强制推送 | `git push --force-with-lease` |
| 推送标签 | `git push --tags` |

## 拉取（Pull/Fetch）

| 操作 | 命令 |
|------|------|
| 获取远程更新（不修改本地分支） | `git fetch origin main` |
| 获取远程更新并变基当前分支 | `git pull --rebase` |
| 获取远程更新并合并到当前分支 | `git pull origin main` 或 `git pull` |

## 配置 Git

| 操作      | 命令                                 |
| ------- | ---------------------------------- |
| 设置配置项   | `git config user.name 'Your Name'` |
| 全局设置    | `git config --global ...`          |
| 添加别名    | `git config alias.st status`       |
| 查看所有配置项 | `man git-config`                   |

## 重要文件

| 文件 | 路径 |
|------|------|
| 本地仓库配置 | `.git/config` |
| 全局 Git 配置 | `~/.gitconfig` |
| 忽略文件列表 | `.gitignore` |
## 相关链接
1. 菜鸟 Git 教程： https://www.runoob.com/git/git-tutorial.html
2. Git官方速查表： https://git-scm.com/cheat-sheet 