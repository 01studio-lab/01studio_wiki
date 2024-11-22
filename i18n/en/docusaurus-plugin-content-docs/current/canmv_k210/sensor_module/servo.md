---
sidebar_position: 2
---

# 舵机

## 前言
舵机又叫伺服电机，是一个可以旋转特定角度的电机，可转动角度通常是90°、180°和360°（360°可以连续旋转）。我们看到的机器人身上就有非常多的舵机，它们抬手或者摇头的动作往往是通过舵机完成，因此机器人身上的舵机越多，意味着动作越灵活。

## 实验平台

CanMV K210开发套件和舵机。

![servo](./img/servo/servo1.png)

## 实验目的
通过编程实现对舵机的控制。

## 实验讲解

伺服电机对象通过3线（一般舵机的线序为信号，电源，地）控制，本节实验用到的是性价比较高的SG90舵机。通常情况下：黑色表示GND，红色表示VCC，橙色表示信号线。

![servo](./img/servo/servo2.png)

CanMV K210引出的GPIO排针可以接1路舵机，供电为5V。注意引线顺序不要接错。

![servo](./img/servo/servo3.png)

180°舵机的控制一般需要一个20ms左右的时基脉冲，该脉冲的高电平部分一般为0.5ms-2.5ms范围内的角度控制脉冲部分，总间隔为2ms。以180度角度伺服为例，在MicroPython编程对应的控制关系是从-90°至90°，示例图如下：

![servo](./img/servo/servo4.jpg)

而对于360°连续旋转舵机，上面的脉冲表则对应从正向最大速度旋转到反向最大速度旋转的过程。

CanMV库并没有集成Servo模块，但从上面可以看到上面是通过PWM来控制的，我们可以直接写PWM函数驱动即可。PWM教程可以长参考： [PWM](../basic_examples/pwm_beep.md) 章节内容。

代码编程流程图如下：




```mermaid
graph TD
    导入PWM模块 --> 初始化相关模块 --> 定义舵机驱动函数 --> 控制舵机旋转至不同角度;
```

## 参考代码

```python
'''
实验名称：舵机控制
版本：v1.0
日期：2022.9
作者：01Studio 【www.01Studio.cc】
说明：通过编程控制舵机旋转到不同角度
'''

from machine import Timer,PWM
import time

#PWM通过定时器配置，接到IO6引脚
tim = Timer(Timer.TIMER0, Timer.CHANNEL0, mode=Timer.MODE_PWM)
S1 = PWM(tim, freq=50, duty=0, pin=6)

'''
#4路舵机代码定义参考,利用定时器的4个通道。

tim2 = Timer(Timer.TIMER0, Timer.CHANNEL1, mode=Timer.MODE_PWM)
S2 = PWM(tim2, freq=50, duty=0, pin=7)

tim3 = Timer(Timer.TIMER0, Timer.CHANNEL2, mode=Timer.MODE_PWM)
S3 = PWM(tim3, freq=50, duty=0, pin=8)

tim4 = Timer(Timer.TIMER0, Timer.CHANNEL3, mode=Timer.MODE_PWM)
S4 = PWM(tim4, freq=50, duty=0, pin=9)
'''


'''
说明：舵机控制函数
功能：180度舵机：angle:-90至90 表示相应的角度
     360连续旋转度舵机：angle:-90至90 旋转方向和速度值。
    【duty】占空比值：0-100
'''

def Servo(servo,angle):
    servo.duty((angle+90)/180*10+2.5)


while True:
    #-90度
    Servo(S1,-90)
    time.sleep(1)

    #-45度
    Servo(S1,-45)
    time.sleep(1)

    #0度
    Servo(S1,0)
    time.sleep(1)

    #45度
    Servo(S1,45)
    time.sleep(1)

    #90度
    Servo(S1,90)
    time.sleep(1)

```

## 实验结果

将180°舵机插到下图排针接口。运行程序。可以看到舵机依次旋转至不同角度。

![servo](./img/servo/servo3.png)

## 360度连续旋转舵机

我们刚刚实现了180°舵机的角度控制，现在来做一下360°连续旋转舵机的实验，360°连续旋转舵机可以实现直流减速电机功能，用在小车或者航模上。

实验的代码不变，参数【-90至90】代表旋转方向和速度值大小。插上360°连续旋转舵机。可以看到舵机的旋转速度和方向逐渐变变化。

![servo](./img/servo/servo5.png)

通过本节我们学会了使用不同类型的舵机，通过多路电机的组合使用，可以实现模型、航模、小车、机器人的实验。