---
sidebar_position: 2
---

# 温湿度传感器（DHT11）

## 前言
温湿度也是我们日常非常常见的指标，我们使用的是DHT11数字温湿度传感器。这是一款含有已校准数字信号输出的温湿度复合传感器，它应用专用的数字模块采集技术和温湿度传感技术，确保产品具有极高的可靠性和卓越的长期稳定性。

DHT11具有小体积、极低的功耗，信号传输距离可达20米以上，使其成为给类应用甚至最为苛刻的应用场合的最佳选择。产品为4针单排引脚封装，连接方便。

![dht11](./img/dht11/dht11_1.jpg)

**DHT11温湿度传感器**

## 实验平台
pyBoard开发套件，DHT11温湿度传感器位于右上角。 

![dht11](./img/dht11/dht11_2.png)

## 实验目的
通过编程采集温湿度数据，并在OLED上显示。

## 实验讲解

DHT11虽然有4个引脚，但其中第3个引脚是悬空的，也就是说DHT11也是单总线的传感器，只占用1个IO口。：

![dht11](./img/dht11/dht11_2.jpg)

我们来看看DHT11在开发板上的接线图：

![dht11](./img/dht11/dht11_3.png)

可以看到DHT11连接到pyboard的‘X12’引脚，可以针对该引脚编程来驱动DHT11传感器，函数模块说明如下：

## dht对象

### 构造函数
```python
d = dht.DHT11(machine.Pin(id))
```
构建DHT11传感器对象

- `id` ：芯片引脚编号。如：'X12'。


### 使用方法
```python
d.measure()
```
测量温湿度。

<br></br>

```python
d.temperature()
```
获取温度值。

<br></br>

```python
d.humidity()
```
获取湿度值。

<br></br>


建议上电先延时1~2秒，让DHT11稳定后再开始读取。代码编写流程如下：


```mermaid
graph TD
    导入相关模块 --> 构建DHT11对象,延时2秒 --> 每隔2秒读取当前温湿度值并在oled屏显示;
```

## 参考代码

```python
'''
实验名称：温湿度传感器实验DTH11
版本：v1.0
平台：pyBoard开发套件
作者：01Studio
说明：通过编程采集温湿度数据，并在OLED上显示。
'''

#引入相关模块
import time
from machine import Pin,SoftI2C
from ssd1306 import SSD1306_I2C
from dht import DHT11

#初始化相关模块
i2c = SoftI2C(sda=Pin("Y8"), scl=Pin("Y6"))
oled = SSD1306_I2C(128, 64, i2c, addr=0x3c)

#创建DTH11对象dt
dt=DHT11(Pin('X12'))
time.sleep(2)          #首次启动停顿2秒然传感器稳定

while True:

    try: #异常处理
        dt.measure()         #温湿度采集
        te=dt.temperature()  #获取温度值
        dh=dt.humidity()     #获取湿度值

        oled.fill(0) #清屏背景黑色
        oled.text('01Studio', 0, 0)
        oled.text('DHT11 test:',0,15)

        #温度显示
        oled.text(str(te)+' C',0,40)

        #湿度显示
        oled.text(str(dh)+' %',48,40)

        print('Temp is: '+str(te)+'C  '+'Humi is:'+str(dh)+'%')

        oled.show()

    except Exception as e: #异常提示

        print('Time Out!')

    time.sleep(2) #每隔2秒采集一次

```

## 实验结果

运行代码，可以看到OLED显示采集到的温湿度信息：

![dht11](./img/dht11/dht11_4.png)

本代码还使用了print函数在终端打印数据，因此在串口终端可以同时看到温湿度信息：

![dht11](./img/dht11/dht11_5.png)


通过本节学习我们学会了使用MicroPython来驱动DTH11温湿度传感器，DHT11性价比比较高，是很适合学习使用的，但精度和响应速度有点低，需要更高要求应用的用户可以使用DHT22或者其他更高级的传感器。