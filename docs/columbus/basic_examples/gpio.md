---
sidebar_position: 4
---

# GPIO

## 前言
我们能看到哥伦布开发板上引出了非常多的引脚和GPIO口（General Purpose Input/Output，通用输入输出口），前两节的LED和按键实验背后原理都是使用GPIO来实现的，只是被提前封装好了。今天我们来做一下GPIO口的实验。

## 实验平台

哥伦布开发板。

![kit](./img/kit.jpg)

## 实验目的
学会使用微处理器的GPIO的输入/输出，使用GPIO方式来操作LED和按键。

## 实验讲解

前面实验实验了pyb模块来控制LED和按键，pyb顾名思义就是早期用于pyBoard的专用模块，随着micropython移植到越来越多平台，逐渐改为更为通用的machine模块，基本上哥伦布的每个IO口都可以配置成特定的GPIO方式来进行应用。

使用Pin就需要看开发板原理图，确认要操作IO的编号。

![key](./img/gpio/gpio1.png)

从上面原理图可以看到LED（4）连接倒PF10引脚，USR按键连接到PE4引脚。我们将LED（4）即“F10”引脚配置成输出，将USER按键即“E4”引脚配置成输入，实现当检测到按键被按下时候点亮LED（4），松开时关闭LED（4）。代码编写流程如下：

我们先来了解一下machine中GPIO使用到的Pin对象的构造函数和使用方法：

## Pin对象

GPIO引脚对象。

### 构造函数
```python
machine.Pin(id, mode, pull)
```

machine模块下的Pin对象。

- `id` ：芯片引脚编号。如：X17, B4。
- `mode` ：输入/输出模式。
    - `Pin.IN` : 输入模式；
    - `Pin.OUT` : 输出模式；   
- `pull`: 上下拉电阻配置。
    - `None` : 无上下拉电阻；
    - `Pin.PULL_UP` : 上拉电阻启用；
    - `Pin.PULL_DOWN` : 下拉电阻启用。

### 使用方法

```python
Pin.value([X])
```
配置引脚电平值：
- `输出模式` ：输出电平值。
    - `0` : 输出低电平；
    - `1` : 输出高电平。
- `输入模式` ：无需参数，获取当前引脚输入电平值。

<br></br>

```python
Pin.high()
```
引脚输出高电平。

<br></br>

```python
Pin.low()
```
引脚输出低电平。

<br></br>

更多用法请阅读官方文档：<br></br>
https://docs.01studio.cc/library/machine.Pin.html#machine-pin

<br></br>

本节实现当按键按下时，LED蓝灯常亮，松开时熄灭。代码编写流程如下：

```mermaid
graph TD
    导入Pin模块 --> 构建led和key对象 --> 根据按键状态控制led亮灭状态;
```

## 参考代码

```python
'''
实验名称：GPIO
版本：v1.0
实验平台：哥伦布STM32开发板
作者：01Studio
'''

from pyb import Pin

#将LED(4)-"F10"配置成推挽输出模式
p_out=Pin('F10',Pin.OUT_PP)

#将USR按键-"E4"配置为输入方式
p_in = Pin('E4', Pin.IN, Pin.PULL_UP)

while True:

    if p_in.value()==0: #USR被按下接地
        p_out.high()    #点亮LED（4）蓝灯

    else:
        p_out.low()     #关闭LED（4）蓝灯
```

## 实验结果

在Thonny IDE中运行代码，可以看到当按键KEY按下时，LED点亮，松开时熄灭。

![key](./img/gpio/gpio3.png)

machine模块下的Pin对象，能调用所有GPIO，通用性更强。