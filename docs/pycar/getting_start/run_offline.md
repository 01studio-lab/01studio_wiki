---
sidebar_position: 6
---

# 代码离线运行

直接在IDE里面运行功能代码是保存在开发板的RAM（内存）里面，方便调试，但断电后丢失，那么如何实现开发板上电运行我们的代码呢？方法如下：

Micropython机制是上电默认先运行名字为boot.py文件，然后在运行main.py文件，如果没有boot.py那么直接运行main.py。


- boot.py: **上电第1个运行的脚本，一般用于配置初始化参数，可以不需要，如果boot.py代码有while True阻塞，将不会运行下面的main.py。**

- main.py：**上电第2个运行的脚本。**

也就是我们只需要将代码以boot.py或main.py文件发送到开发板，那么开发板就可以实现上电运行相关程序。

:::tip Tips
通常情况下我们只需要使用main.py即可。
:::

我们使用thonny IDE将LED例程的main.py发送到开发板

![run_offline](./img/run_offline/run_offline1.png)

按下开发板左上角的复位键

![run_offline](./img/run_offline/run_offline2.png)

可以看到LED蓝灯被点亮：

![run_offline](./img/run_offline/run_offline3.png)
