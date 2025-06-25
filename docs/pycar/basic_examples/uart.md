---
sidebar_position: 8
---

# 串口通讯（UART）

## 前言
串口是非常常用的通信接口，有很多工控产品、无线透传模块都是使用串口来收发指令和传输数据，以及和其它开发板如树莓派，核桃派，STM32，Arduio等带串口的开发板通讯，这样用户就可以在无须考虑底层实现原理的前提下将各类串口功能模块灵活应用起来。

## 实验目的
编程实现串口收发数据。

## 实验讲解

pyCar开发板一共有3个串口，编号0-2，如下表：**UART0用于下载和REPL调试，UART1用于模块内部连接Flash没有引出，因此只可以使用UART2来调试。**

![uart](./img/uart/uart0.png)

我们来了解一下串口对象的构造函数和使用方法：

## UART对象

### 构造函数
```python
uart = machine.UART(id,baudrate,tx=None,rx=None bits=8, parity=None, stop=1,…)
```
创建UART对象。

- `id` ：串口编号，共2个可用, 1或2。

- `baudrate`：波特率，常用115200、9600;

- `tx` ：发送引脚，可自定义IO，例：tx = 12。

- `rx` ：接收引脚，可自定义IO，例：rx = 11。

- `bits` ：数据位，默认8;

- `parity` ：奇偶校验，默认None;
    - `0`: 偶校验；
    - `1`: 奇校验；

- `stop`: 停止位，支持 1， 1.5, 2， 默认 1 。

:::tip 提示
ESP32的UART引脚映射到其它IO来使用，比如UART2默认引脚是TX—>17,RX—>16; 用户可以通过构造函数定义tx=27,rx=26的方式来改变串口指向引脚，实现更灵活的应用。
:::

### 使用方法

```python
uart.any()
```
返回等待读取的字节数据，0表示没有，用于判断是否有接收到数据。

<br></br>

```python
uart.read([nbytes])
```
读取字符。
- `nbytes`: 读取字节数量。

<br></br>

```python
uart.readline()
```
读行。

<br></br>

```python
UART.write(buf)
```
发送数据。
- `buf`: 需要发送的数据。

<br></br>

```python
UART.deinit()
```
注销串口。

更多用法请阅读官方文档：<br></br>
https://docs.01studio.cc/library/machine.UART.html#machine-uart

<br></br>

我们可以用一个USB转TTL工具，配合电脑上位机串口助手来跟开发板进行通信测试。

![uart1](./img/uart/uart1.png)

注意要使用3.3V电平的USB转串口TTL工具，本实验我们使用串口2，也就是27（TX）和26（RX），接线示意图如下（交叉接线）：

![uart2](./img/uart/uart2.png)


在本实验中我们可以先初始化串口，然后给串口发去一条信息，这样PC机的串口助手就会在接收区显示出来，然后进入循环，当检测到有数据可以接收时候就将数据接收并打印，并通过REPL打印显示。代码编写流程图如下：


```mermaid
graph TD
    导入UART相关模块 --> 构建UART对象 --> 串口发送信息 --> 判断是否有信息--是-->接收并在终端打印-->判断是否有信息;
    判断是否有信息--否-->判断是否有信息;
```

## 参考代码

```python
'''
实验名称：串口通信
版本：v1.0
作者：01Studio
说明：通过编程实现串口通信，跟电脑串口助手实现数据收发。
'''

#导入串口模块
from machine import UART

uart=UART(2,115200,tx=27, rx=26) #设置串口号2和波特率,TX--27,RX--26

uart.write('Hello 01Studio!')#发送一条数据

while True:

    #判断有无收到信息
    if uart.any():

        text=uart.read(128) #接收128个字符
        print(text) #通过REPL打印串口3接收的数据

```

## 实验结果

我们按照上述方式将USB转TTL的TX接到开发板的RX（26），USB转TTL的RX接到开发板的TX（27）。GND接一起，3.3V可以选择接或不接。**（特别注意超声波传感器不能接。）**

![uart4](./img/uart/uart3.jpg)

这时候打开电脑的设备管理器，能看到2个COM。写着CH340的是串口工具，另外一个则是开发板的串口。**如果CH340驱动没安装，则需要手动安装，驱动在：<u>配套资料包\开发工具\串口终端\CH340文件夹</u> 下。**

![uart5](./img/uart/uart5.png)

本实验要用到串口助手，打开配套资料包\开发工具\串口终端工具下的【UartAssist.exe】软件。

![uart6](./img/uart/uart6.png)

根据上图设备管理器里面的信息，将串口工具配置成COM22，开发板REPL串口配置成COM27（根据自己的串口号调整）。波特率115200。运行程序，可以看到一开始串口助手收到开发板上电发来的信息“Hello 01Studio!”。我们在串口助手的发送端输入“http://www.01studio.cc”， 点击发送，可以看到pyCar在接收到该信息后在REPL里面打印了出来。如下图所示： 

![uart7](./img/uart/uart7.png)

## 跟其它开发板或串口模块通讯

只需要将本实验中的串口TTL工具接线换成开发板的即可。接线方式是交叉接线，pyCar的TX，RX分别连接其它开发板的RX，TX ，GND连接一起。注意其它开发板的IO电平也是3.3V即可。
