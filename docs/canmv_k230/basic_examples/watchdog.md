---
sidebar_position: 10
---

# 看门狗

## 前言
任何代码在运行过程中都可能出现崩溃的情况，这时候就可以加入看门狗代码。看门狗的用途是在应用程序崩溃并最终进入不可恢复状态时自动重新启动系统。一旦启动，就无法以任何方式停止或重新配置。启用后，应用程序必须定期“喂食”看门狗，以防止其过期并重置系统。

## 实验目的
测试看门狗自动复位功能。

## 实验讲解

CanMV K230的MicroPython固件已经集成了看门狗WDT模块。我们直接调用即可。

## WDT对象

### 构造函数
```python
from machine import WDT

wdt = WDT(id, timeout)
```
创建看门狗对象。K230有2个看门狗，CPU0（小核800M）使用看门狗0，CPU1（大核1.6G）使用看门狗1，由于CanMV RTOS只使用CPU1，所以只有看门狗1能用。

- `id` ：看门狗编号。

    - `1`: 看门狗1。

- `timeout` ：超时时间，单位秒。

### 使用方法

```python
wdt.feed()
```
喂狗。需要在构建看门狗对象时指定的超时时间内执行该指令。

<br></br>

更多用法请阅读官方文档：<br></br>
https://docs.micropython.org/en/latest/library/machine.WDT.html

编程流程如下：

```mermaid
graph TD
    导入看门狗模块 --> 初始化看门狗对象 --> 喂狗 --> 停止喂狗模拟死机系统自动重启;
```

## 参考代码

```python
'''
实验名称：看门狗
版本： v1.0
作者：01Studio
实验平台：01Studio CanMV K230
说明：看门狗测试。
'''

from machine import WDT #导入线程模块
import time

#构建看门狗对象。
wdt = WDT(1,3) #看门狗编号1，超时时间3秒。


#每隔1秒喂一次狗，执行3次。
for i in range(3):

    time.sleep(1)
    print(i)

    wdt.feed() #喂狗

#停止喂狗，系统会重启。
while True:

    time.sleep(0.01) #防止CPU满跑

```

## 实验结果

运行代码，可以看到串口终端打印了3次信息后自动重启。断开了IDE连接。

![watchdog](./img/watchdog/watchdog1.png)

有了看门狗，当开发板死机时候就可以自动重启了。