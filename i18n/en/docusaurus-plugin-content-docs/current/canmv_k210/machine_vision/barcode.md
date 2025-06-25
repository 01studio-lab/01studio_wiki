---
sidebar_position: 6
---

# 条形码识别

## 前言
条形码（barcode）是将宽度不等的多个黑条和空白，按照一定的编码规则排列，用以表达一组信息的图形标识符。常见的条形码是由反射率相差很大的黑条（简称条）和白条（简称空）排成的平行线图案。条形码可以标出物品的生产国、制造厂家、商品名称、生产日期、图书分类号、邮件起止地点、类别、日期等许多信息，因而在商品流通、图书管理、邮政管理、银行系统等许多领域都得到广泛的应用。

![barcode](./img/barcode/barcode0.png)

## 实验目的
编程实现条形码识别，并将识别到的信息通过串口终端打印出来。

## 实验讲解

而对于CanMV K210而言，直接使用MicroPython中的find_barcodes()即可获取摄像头采集图像中条形码的相关信息。该函数支持所有一维条形码：

image.EAN2 image.EAN5 image.EAN8 image.UPCE image.ISBN10 image.UPCA image.EAN13 image.ISBN13 image.I25 image.DATABAR (RSS-14) image.DATABAR_EXP (RSS-Expanded) image.CODABAR image.CODE39 image.PDF417 image.CODE93 image.CODE128

具体说明如下：

## find_barcodes对象

### 构造函数
```python
image.find_barcodes([roi])
```
查找roi区域内的所有条形码并返回一个image.barcode的对象列表。

### 使用方法

以上函数返回image.barcode对象列表。

```python
barcode.rect()
```
返回一个矩形元组（x,y,w,h）,条形码的边界。可以通过索引[0-3]来获得单个值。

<br></br>

```python
barcode.payload()
```
返回条形码字符串信息。可以通过索引[4]来获得这个值。

<br></br>

```python
barcode.type()
```
返回条形码类型。

<br></br>

更多用法请阅读官方文档：<br></br>
https://www.kendryte.com/canmv/main/canmv/library/canmv/image.html#find-barcodes

<br></br>

从上表可以看到，使用MicroPython编程我们只需要简单地调用find_barcodes()函数，对得到的结果再进行处理即可，非常方便。代码编写流程如下图所示：

```mermaid
graph TD
    导入sensor等相关模块 --> 初始化和配置相关模块  --> 寻找拍照到图像中的条形码 --> 画方框指示 --> 终端打印条形码信息;
```

## 参考代码

```python
#实验名称：条形码识别
#版本：v1.0
#日期：2023.12
#翻译和注释：01Studio

import sensor, image, time, math, lcd

#lcd初始化
lcd.init()

sensor.reset()
sensor.set_pixformat(sensor.GRAYSCALE)
# sensor.set_framesize(sensor.QVGA) # High Res!
# sensor.set_windowing((640, 80)) # V Res of 80 == less work (40 for 2X the speed).
sensor.set_framesize(sensor.QVGA)
sensor.set_vflip(1) #摄像头后置模式
sensor.skip_frames(time = 2000)
sensor.set_auto_gain(False)  # must turn this off to prevent image washout...
sensor.set_auto_whitebal(False)  # must turn this off to prevent image washout...
clock = time.clock()

# Barcode detection can run at the full 640x480 resolution of your CanMV Cam's
# OV7725 camera module. Barcode detection will also work in RGB565 mode but at
# a lower resolution. That said, barcode detection requires a higher resolution
# to work well so it should always be run at 640x480 in grayscale...

def barcode_name(code): #条形码类型
    if(code.type() == image.EAN2):
        return "EAN2"
    if(code.type() == image.EAN5):
        return "EAN5"
    if(code.type() == image.EAN8):
        return "EAN8"
    if(code.type() == image.UPCE):
        return "UPCE"
    if(code.type() == image.ISBN10):
        return "ISBN10"
    if(code.type() == image.UPCA):
        return "UPCA"
    if(code.type() == image.EAN13):
        return "EAN13"
    if(code.type() == image.ISBN13):
        return "ISBN13"
    if(code.type() == image.I25):
        return "I25"
    if(code.type() == image.DATABAR):
        return "DATABAR"
    if(code.type() == image.DATABAR_EXP):
        return "DATABAR_EXP"
    if(code.type() == image.CODABAR):
        return "CODABAR"
    if(code.type() == image.CODE39):
        return "CODE39"
    if(code.type() == image.PDF417):
        return "PDF417"
    if(code.type() == image.CODE93):
        return "CODE93"
    if(code.type() == image.CODE128):
        return "CODE128"

while(True):
    clock.tick()
    img = sensor.snapshot()
    codes = img.find_barcodes() #寻找图片中的条形码
    for code in codes:
        img.draw_rectangle(code.rect())
        img.draw_string(2,2, code.payload(), color=(255,255,255), scale=2)
        print_args = (barcode_name(code), code.payload(), (180 * code.rotation()) / math.pi, code.quality(), clock.fps())
        print("Barcode %s, Payload \"%s\", rotation %f (degrees), quality %d, FPS %f" % print_args)
    if not codes:
        print("FPS %f" % clock.fps())
        
    lcd.display(img)
```

## 实验结果

为了更好地识别，图像上条形码需比较平展，不能太小。

运行程序，打开一个条形码图片。摄像头正对条形码，识别成功后可以看到图片出现方框以及在串口终端打印出条形码信息。

原图：

![barcode](./img/barcode/barcode1.jpg)

识别结果：

![barcode](./img/barcode/barcode2.jpg)

串口终端打印条形码详细信息：

![barcode](./img/barcode/barcode3.png)

条形码是日常生活应用非常广泛的东西，有了本节实验技能，我们就可以轻松打造一个属于自己的条形码扫描仪了。