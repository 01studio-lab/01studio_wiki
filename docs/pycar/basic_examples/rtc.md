---
sidebar_position: 7
---

# RTC实时时钟

## 前言
时钟可以说我们日常最常用的东西了，手表、电脑、手机等等无时无刻不显示当前的时间。可以说每一个电子爱好者心中都希望拥有属于自己制作的一个电子时钟，接下来我们就用MicroPython开发板来制作一个属于自己的电子时钟。

![rtc](./img/rtc/rtc1.png)


## 实验目的

学习RTC编程和制作电子时钟，使用OLED显示。

## 实验讲解

实验的原理是读取RTC数据，然后通过LCD显示。毫无疑问，强大的MicroPython已经集成了内置时钟函数模块。位于machine的RTC模块中，具体介绍如下：

## RTC对象

### 构造函数
```python
rtc = machine.RTC()
```
构建RTC对象，RTC对象位于machine模块下。

### 使用方法
```python
rtc.datetime((2024, 1, 1, 0, 0, 0, 0, 0))
```
设置RTC日期和时间。(2024, 1, 1, 0, 0, 0, 0, 0)按顺序分别表示（年，月，日，星期，时，分，秒，微妙），其中星期使用0-6表示星期一到星期日。

<br></br>

```python
rtc.datetime()
```
获取当前RTC时间。返回元组：（年，月，日，星期，时，分，秒，微妙），其中星期使用0-6表示星期一到星期日。

更多用法请阅读官方文档：<br></br>
https://docs.micropython.org/en/latest/library/machine.RTC.html#machine-rtc

<br></br>

从上表可以看到RTC对象的使用方法，我们需要做的就是先设定时间，然后再获取当前芯片里的时间，通过OLED显示屏显示，如此循环。在循环里，如果一直获取日期时间数据会造成资源浪费，所以可以每隔第一段时间获取一次数据，又由于肉眼需要看到至少每秒刷新一次即可，这里每隔300ms获取一次数据，使用前面学习过的RTOS定时器来计时，具体编程流程如下：


```mermaid
graph TD
    导入RTC,OLED相关模块 --> 构建RTC,OLED对象 --> 首次时间设置 --> 获取当前时间 --> OLED显示当前时间 --> 获取当前时间;
```

## 参考代码

```python
'''
实验名称：RTC实时时钟
版本：v1.0
作者：01Studio
'''

# 导入相关模块
from machine import Pin, SoftI2C, RTC,Timer
from ssd1306 import SSD1306_I2C

# 定义星期和时间（时分秒）显示字符列表
week = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
time_list = ['', '', '']

# 初始化所有相关对象
i2c = SoftI2C(sda=Pin(25), scl=Pin(23)) #I2C初始化：sda--> 25, scl --> 23
oled = SSD1306_I2C(128, 64, i2c, addr=0x3c)
rtc = RTC()

# 首次上电配置时间，按顺序分别是：年，月，日，星期，时，分，秒，次秒级；这里做了
# 一个简单的判断，检查到当前年份不对就修改当前时间，开发者可以根据自己实际情况来
# 修改。
if rtc.datetime()[0] != 2021:
    rtc.datetime((2021, 4, 1, 0, 0, 0, 0, 0))

def RTC_Run(tim):

    datetime = rtc.datetime()  # 获取当前时间

    oled.fill(0)  # 清屏显示黑色背景
    oled.text('01Studio', 0, 0)    # 首行显示01Studio
    oled.text('RTC Clock', 0, 15)  # 次行显示实验名称

    # 显示日期，字符串可以直接用“+”来连接
    oled.text(str(datetime[0]) + '-' + str(datetime[1]) + '-' + str(datetime[2]) + ' ' + week[datetime[3]], 0, 40)

    # 显示时间需要判断时、分、秒的值否小于10，如果小于10，则在显示前面补“0”以达
    # 到较佳的显示效果
    for i in range(4, 7):
        if datetime[i] < 10:
            time_list[i - 4] = "0"
        else:
            time_list[i - 4] = ""

    # 显示时间
    oled.text(time_list[0] + str(datetime[4]) + ':' + time_list[1] + str(datetime[5]) + ':' + time_list[2] + str(datetime[6]), 0, 55)
    oled.show()

#开启RTOS定时器
tim = Timer(-1)
tim.init(period=300, mode=Timer.PERIODIC, callback=RTC_Run) #周期300ms

```

## 实验结果

由于实验要用到OLED显示屏，所以同样别忘了将示例代码该实验文件夹下的ssd1306.py文件复制到pyCar的文件系统里面。

![rtc](./img/rtc/rtc1_1.png)

在Thonny IDE运行代码，可以看到时钟开始跑起来。

![rtc](./img/rtc/rtc2.jpg)

通过Thonny IDE连接开发板后会自动同步RTC时间。RTC实时时钟的可玩性很强，我们还可以根据自己的风格来设定数字显示位置，以及加上一些属于自己的字符标识。打造自己的电子时钟。