<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [GIT 使用介绍](#git-%E4%BD%BF%E7%94%A8%E4%BB%8B%E7%BB%8D)
  - [下载安装](#%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85)
  - [git config](#git-config)
  - [git clone](#git-clone)
  - [git add](#git-add)
  - [git commit](#git-commit)
  - [git status](#git-status)
  - [git pull](#git-pull)
  - [git push](#git-push)
  - [git branch](#git-branch)
  - [git stash](#git-stash)
  - [git rebase](#git-rebase)
  - [git reset](#git-reset)
  - [git revert](#git-revert)
  - [git rm](#git-rm)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# GIT 使用介绍

![git](.//images/git.jpg)

## 下载安装

从 git 官网下载安装包，安装完毕后就可以使用命令行的 git 工具，在开始菜单里找到"Git"->"Git Bash"，会弹出 Git 命令窗口，你可以在该窗口进行 Git 相关命令行的操作。

## git config

全局配置

配置个人用户名和电子邮箱

```git
git config –globle user.name “runoob”
git config –globle user.email text@runoob.com
```

配置完毕后，可以通过`git config –list` 命令查看所有的配置信息。
也可直接查询某个环境变量的信息。

```git
git config user.name
git config user.email
```

## git clone

克隆项目

```git
git clone <git地址> -b <分支名>
```

## git add

把修改的文件添加到暂存区，可以单独添加某个文件，也可以添加所有文件

```git
//添加某个文件
git add <file>
//添加所有文件
git add .
```

## git commit

把暂存区的所有内容提交到当前分支(本地仓库)，提交的说明一定要写（字符串加双引号）

```git
git commit -m <message>
```

如果 commit 的注释写错了，想要修改注释（仅支持最后一次的修改）

```git
git commit --amend
```

## git status

查看工作区状态

```git
git status
```

- 状态一：修改了没有添加到缓存区（红色），此时可以通过 git diff 查看修改了的内容，“-”号是修改前，“+”号是修改后，第一个加号后修改的前一行。第二个加号是修改的内容。
- 状态二：修改了添加到缓存区（绿色）
- 状态三：On branch master nothing to commit, work tree clean 表明无修改内容

## git pull

更新远程分支到本地, 如果项目是多人合作的，那么就需要在拉去别人更新的代码合并到本地。Git 会自动合并本地代码。如果合并失败，需要手动解决冲突。

```git
git pull origin <分支名>
```

## git push

本地提交推送到远程仓库

```git
git push origin <分支名>
```

## git branch

分支管理

```git
1) 查看分支：git branch
2) 创建分支：git branch <name>
3) 切换分支：git checkout <name>
4) 创建+切换分支：git checkout -b <name>
5) 合并某分支到当前分支：git merge <name>
6) 删除分支git branch -d <name>
```

## git stash

暂存修改

```git
1) 暂存分支工作状态： git stash
2) 查看分支存储的工作状态： git stash list
3) 恢复分支工作状态： git stash apply
4) 删除分支存储的工作状态：git stash drop
5) 恢复并删除分支存储工作状态：git stash pop
```

## git rebase

**合并多个 commit 操作**

- 1、`git log` 显示 commit 记录

  ![git log](.//images/rebase/rebase1.png)

- 2、`git rebase -i 2cd1a7` **-i** 参数表示要合并提交的前一个 commit 或者执行 `git rebase -i HEAD~3`

  ![git log](.//images/rebase/rebase2.png)

- 3、 第二步完成后显示所有的合并的 commit，进入 vi 模式进行合并操作。
  - pick 的 commit 会执行提交。
  - squash 的 commit 会被合并到前一个 commit。
    修改完后 ESC 退出 vi 模式，:wq 保存退出，再次进入 vi 模式编写合并的信息提示，退出 vi 模式，保存退出即可。
    ![git log](.//images/rebase/rebase3.png)
- 4、`git log` 进行验证合并结果

  ![git log](.//images/rebase/rebase4.png)

## git reset

`git reset`: 回退，修改 HEAD 的位置，即将 HEAD 指向的位置改变为之前存在的某个版本。

![git log](.//images/reset.jpeg)

常用命令：

`git reset commit`：回退到某个 commit

`git reset origin/分支` ：回退到某个分支

三种模式：

- --hard：直接将工作目录、暂存区(index)及版本库(repository)都重置成目标 Reset 节点的內容。

- --mixed（默认）：只保留工作目录的內容，但会将暂存区(Index)和版本库中的內容更改和 reset 目标节点一致。

- --soft：保留工作目录和暂存区(index)的内容，只让版本木中的内容和 reset 目标节点保持一致。

**适用场景：操作未提交到远程库的撤销操作**

## git revert

`git revert commit`: 返回,想要撤销版本二，但又不想影响撤销版本三的提交，就可以用 `git revert` 命令来反做版本二，生成新的版本四，
这个版本四里会保留版本三的东西，但撤销了版本二的东西。

![git log](.//images/revert.jpeg)

**适用场景：操作已经提交到远程库**

## git rm

`git rm --cached “文件路径”` : 将该文件从缓存中删除，不删除物理文件

`git rm --f “文件路径”`: 将该文件从缓存中删除，还会删除物理文件（不会回收到垃圾桶）

`git rm -r 文件夹`: 递归删除，删除文件夹内的所有文件
