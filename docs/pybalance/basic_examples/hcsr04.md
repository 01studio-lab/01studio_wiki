---
sidebar_position: 9
---

# 超声波测距（HC-SR04）

## 前言
超声波传感器是一款测量距离的传感器。其原理是利用声波在遇到障碍物反射接收结合声波在空气中传播的速度计算的得出。在测量、避障小车，无人驾驶等领域都有相关应用。

## 实验平台
pyBalance 开发板和超声波传感器模块。开发板提供超声波扩展接口，接口中的 3V3、TRIG、ECHO 和 GND 信号分别采用双引脚并联设计，因此超声波模块插接在接口前后两侧均可正常使用。其中 TRIG 信号连接至 ESP32-S3 的 GPIO47，ECHO 信号连接至 GPIO48。

![hcsr04](./img/hcsr04/hcsr04_0.png) 

![hcsr04](./img/hcsr04/hcsr04_1.png) 

![hcsr04](./img/hcsr04/hcsr04_2.png)

## 实验目的
通过MicroPython编程实现超声波测量距离并在LCD上显示相关数据。

## 实验讲解

超声波传感器模块使用两个IO口分别控制超声波发送和接收，工作原理如下：

1. 给超声波模块接入电源和地；
2. 给脉冲触发引脚（trig）输入一个长为20us的高电平方波；
3. 输入方波后，模块会自动发射8个40KHz的声波，与此同时回波引脚（echo）端的电平会由0变为1；（此时应该启动定时器计时）
4. 当超声波返回被模块接收到时，回波引 脚端的电平会由1变为0；（此时应该停止定时器计数），定时器记下的这个时间即为超声波由发射到返回的总时长；
5. 根据声音在空气中的速度为340米/秒，即可计算出所测的距离。

下面是超声波传感器HCSR04的时序触发图：

![hcsr04](./img/hcsr04/hcsr04_4.png) 

以上普及了超声波传感器的原理，我们已经将其集成在HCSR04.py文件，如想了解代码原理可以打开HCSR04.py文件查看代码实现原理。使用MicroPython开发的用户只需要直接使用即可。使用方法如下：

## HCSR04对象

在micropython中可以直接使用写好的Python库来获取超声波传感器测量的距离值。具体介绍如下：

### 构造函数
```python
sonar = HCSR04(trig,echo)
```
构建超声波模块对象，主要是初始化连接超声波传感器的2个引脚。

- `trig` 超声波发射端引脚；
- `echo` 超声波接收端引脚；

### 使用方法
```python
sonar.getDistance()
```
返回测量距离值，单位cm，数据类型为`float`。

<br></br>

我们构建对象后就可以一直循环获取超声波距离信息了，代码编写流程如下：

```mermaid
graph TD
    导入相关模块-->构建超声波传感器对象-->测量距离-->LCD显示和串口终端打印数据-->测量距离;
```

## 参考代码

```python
'''
实验名称：超声波传感器
版本：v1.0
日期：2026.8
作者：01Studio
说明：通过超声波传感器测距，并在LCD上显示。
'''
import time
from HCSR04 import HCSR04     #子文件夹下的调用方式
from machine import Pin
from tftlcd import LCD15

#定义常用颜色
RED = (255,0,0)
GREEN = (0,255,0)
BLUE = (0,0,255)
BLACK = (0,0,0)
WHITE = (255,255,255)

########################
# 构建1.5寸LCD对象并初始化
########################
d = LCD15(portrait=2) #默认方向竖屏

# 填充白色
d.fill(WHITE)

#初始化接口 trig对应的GPIO47,echo对应的GPIO48
trig = Pin(47,Pin.OUT)
echo = Pin(48,Pin.IN)

HC=HCSR04(trig,echo)

while True:
    # 测量距离
    Distance = HC.getDistance() 
    # LCD显示
    d.printStr('Distance:', 10, 10, BLUE, size=2)
    d.printStr(str('%.2f'%(Distance))+' cm'+' '*3, 120, 10, RED, size=2)
    # 串口打印
    print(str('%.2f'%(Distance))+' CM')

    time.sleep(1) #每秒采集1次

```

## 实验结果

将HCSR04.py文件上传到开发板文件系统，连接超声波传感器，运行代码。

在超声波传感器30cm外放置障碍物：

![hcsr04](./img/hcsr04/hcsr04_5.png) 

可以看到LCD显示屏实时显示距离数据约为30cm。

![hcsr04](./img/hcsr04/hcsr04_6.png) 

串口终端同时打印距离信息：

![hcsr04](./img/hcsr04/hcsr04_7.png) 

除去LCD显示代码，我们实际上只用了2行代码：初始化和调用测量函数就实现了对超声波传感器测距的应用。这让我们再一次感受到了MicroPython的魅力。赶快动作制作自己的避障小车和其他好玩的创作吧。
