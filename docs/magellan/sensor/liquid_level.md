---
sidebar_position: 6
---

# 水（液）位传感器

## 前言
水位（液位）传感器是一款简单易用、小巧轻便、水位/水滴识别检测传感
器，传感器通过一系列的暴露的平行导线线迹测量其水滴/水量大小使得传感器输出的模拟信号产生相应的变化，轻松完成水量到模拟信号的转换，从而判断水位。


## 实验平台
麦哲伦开发套件和液位传感器模块。

![iamge](./img/liquid_level/liquid1.jpg) 

## 实验目的
测量水位高度并在LCD显示，显示方式为：0-4cm。

## 实验讲解

我们先来看看水位传感器的介绍：[**点击购买>>**](https://item.taobao.com/item.htm?id=623859169795)

![iamge](./img/liquid_level/liquid2.png) 

![iamge](./img/liquid_level/liquid3.png) 

|  产品参数 |
|  :---:  |  --- |
| 供电电压  | 3.3V |
| 工作电流  | <20mA |
| 接口定义  | XH2.54防呆接口（3Pin）【GND、VCC、Single】 |
| 输出信号  | 模拟信号：0-3.3V （VCC=3.3V时）|
| 模块尺寸  | 6.6*2.0cm |

:::tip 提示
水位传感器接口旁元件不能接触水，否则容易短路。所以测量时候要注意液体水位的高度。
:::

从上表可以看到，水位传感器的量程为4cm，输出的是模拟信号：0-3.3V，这代表水位高度情况。接近0V时湿度为0cm或没有放进液体，电压升高，意味着水位升高。因此我们可以使用基础实验-ADC学习过的内容来编程。

水位传感器接在3P传感器接口，对应的引脚是“PB1”。ADC使用16bit精度，即最大值为2^16-1=65535。我们使用的是普通桶装水，根据实际测试数据将检测到的数值0-65535分成5档。分别代表水位高度0cm：【0-9600】，1cm：【9600-14400】，2cm：【14400-19200】，3cm：【19200-20800】，4cm：【>20800】。

当然开发者可以根据自己测量液体不同或其它情况来调整数值。代码编写流程如下：

```mermaid
graph TD
    导入ADC模块-->构建ADC对象-->获取液位值,即ADC电压值-->将液位高度值在LCD显示--> 获取液位值,即ADC电压值;
```

## 参考代码

```python
'''
实验名称：水位传感器
版本：v1.0
平台：麦哲伦开发套件
作者：01Studio 【www.01Studio.cc】
说明：通过水位传感器对水位测量并显示。
'''

#导入相关模块
import machine,time
from machine import Pin
from tftlcd import LCD43R

#定义常用颜色
WHITE=(255,255,255)
BLACK = (0,0,0)
RED=(255,0,0)

#初始化LCD
d=LCD43R(portrait=4) #竖屏
d.fill(WHITE)#填充白色

#初始化ADC
Water_level = machine.ADC('B1')

#显示标题
d.printStr('01Studio Water ', 10, 10, BLACK, size=4)
while True:

    value=Water_level.read_u16() #获取ADC数值

    #LCD显示
    d.printStr('Vol:'+str('%.2f'%(value/65535*3.3))+" V", 10, 100, BLACK, size=4)
    d.printStr('Value:'+str(value)+"   ", 10, 200, BLACK, size=4)
    d.printStr("(65535)", 300, 200, BLACK, size=4)

    #判断水位，分5档
    if 0 < value <=9600:
        d.printStr('0cm', 10, 300, BLACK, size=4)

    if 9600 < value <= 14400:
        d.printStr('1cm', 10, 300, BLACK, size=4)

    if 14400 < value <= 19200:
        d.printStr('2cm', 10, 300, BLACK, size=4)

    if 19200 < value <= 20800:
        d.printStr('3cm   ', 10, 300, BLACK, size=4)

    if 20800 < value:
        d.printStr('4cm   ', 10, 300, BLACK, size=4)

    time.sleep(1) #延时1秒
```

## 实验结果

使用Thonny IDE运行代码，当没插入水中时，LCD显示当前水位为0cm:

![iamge](./img/liquid_level/liquid4.png) 

将水位传感器模块慢慢放入水中，可以看到LCD显示从1cm-4cm变化。**（注意量程是4cm，请勿将超出的电路部分放置水中以免发生短路。）**


![iamge](./img/liquid_level/liquid5.png) 


从实验可以见到，这款水位传感器出了可以用来测量水位（液位）高度外，还可以用来测量室外下雨情况和家里的淹水情况。有兴趣的小伙伴可以动手制作一下！
