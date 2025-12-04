---
sidebar_position: 10
---

# 固件更新

当pyboard上的固件意外丢失或者我们希望升级到较新版本固件时候，就需重新烧录pyboard的固件。Pyboard上面是一个M4单片机，所以这个操作相当于给M4单片机重新烧录程序。

我们采用DFU的烧写方式，DFU烧写方式优势是不需要ST-LINK一类仿真器，只需要安装一个软件即可。我们打开 **pyBoard开发套件配套资料\开发工具\Windows\固件更新工具\DfuSe_Demo_V3.0.5** 目录下的DfuSe安装软件。DFU软件安装完成后相当于电脑所需要的驱动也安装了。


![firmware_update](./img/firmware_update/firmware_update0.png)

将开发板上的默认连接的BOOT--GND跳线帽连接到3.3V，让pyboard进入DFU烧写模式，如下图所示：

![firmware_update](./img/firmware_update/firmware_update0_1.png)

单独核心可以通过下面方式连接：

![firmware_update](./img/firmware_update/firmware_update0_2.png)

打开刚刚安装的DFU软件，没找到可以在开始菜单搜索一下

![firmware_update1](./img/firmware_update/firmware_update1.png)

按下开发板RST复位键，可以见到DFU软件成功识别出ST的芯片。

![firmware_update2](./img/firmware_update/firmware_update2.png)

点击choose，选择要升级的固件版本，在MicroPython开发板配套资料\相关固件\pyboard v1.1目录下选择要升级的固件版本。

![firmware_update2](./img/firmware_update/firmware_update3.png)

![firmware_update2](./img/firmware_update/firmware_update4.png)

勾选配置参数，点击Upgrade开始烧录。

![firmware_update2](./img/firmware_update/firmware_update5.png)

正在烧录：

![firmware_update2](./img/firmware_update/firmware_update6.png)

烧录完成后如下图所示：

![firmware_update2](./img/firmware_update/firmware_update7.png)

烧录完成后将BOOT跳线帽拔掉或者连接到开发板上的GND备用，重新按下复位键。

![firmware_update2](./img/firmware_update/firmware_update8.png)

可以见到系统检测到pyboard的U盘文件系统。说明固件更新完成并启动正常。

![firmware_update2](./img/firmware_update/firmware_update9.png)



