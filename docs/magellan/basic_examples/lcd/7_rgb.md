---
sidebar_position: 2
---

# 7寸RGB屏

## 前言

本节讲解麦哲伦 + 7寸RGB屏的使用方法。

## 实验平台
麦哲伦MicroPython开发套件、7寸RGB显示屏（电容触摸）。

![lcd](./img/7_rgb/7_rgb1.png)

## 实验目的
通过MicorPython编程方式实现LCD的各种显示功能，包括画点、线、矩形、圆形、显示英文、显示图片等。

## 实验讲解

我们先来看看实验所使用的7寸RGB屏 (电容触摸) 的参数介绍：[**点击购买>>**](https://item.taobao.com/item.htm?id=648501507047)

![lcd](./img/7_rgb/7_rgb2.png)

|  产品参数 |
|  :---:  |  --- |
| 屏幕类型  | RGB屏 |
| 屏幕尺寸  | 7寸 |
| 颜色参数  | 24位彩色 |
| 驱动芯片  | 群创AT070TN92 + GT911(触摸) |
| 触摸方式  | 电容触摸（五点触控），I2C接口 |
| 通讯方式  | 24位并行 (RGB888) |
| 供电电压  | 背光：3.7-5V，GPIO 3.3V |
| 接口定义  | 40P-2.54mm排针和40P-0.5MM FPC座 |
| 整体尺寸  | 18*12 cm |

:::tip 提示
7寸RGB屏通过40P排线连接到麦哲伦H743核心板（只支持这种方式）
:::

实验用的LCD是7寸，型号是群创AT070TN92，使用24位RGB888并口跟STM32通信，按以往嵌入式C语言开发，我们需要对其进行编程实现驱动，然后再建立各种描点、划线、以及显示图片函数。

使用MicroPython其实也需要做以上工作，但由于可读性和移植性强的特点，我们只需要搞清各个对象函数使如何使用即可。总的来说和前面实验一样，有构造函数和功能函数。构造函数解决的是初始化问题，告诉麦哲伦开发板该外设是怎么接线，初始化参数如何，而功能函数解决的则是使用问题，我们基于自己的需求直接调用相关功能函数，实现自己的功能即可！

我们管这些函数的集合叫驱动，驱动可以是预先在固件里面，也可以通过.py文件存放在开发板文件系统。也就是说工程师已经将复杂的底层代码封装好，我们顶层直接使用python开发即可，人生苦短。我们来看看麦哲伦开发板7寸RGB LCD的构造函数和使用方法。

## LCD7R对象

### 构造函数
```python
tftlcd.LCD7R(portrait=1)
```
构建7寸RGB屏对象。

- `portrait` ：屏幕显示方向：
    - `1`: 横屏，800*480  ，默认
    - `2`: 竖屏，480*800 ，1基础上顺时针旋转90° 
    - `3`: 横屏，800*480  ，1基础上顺时针旋转180°
    - `4`: 竖屏，480*800 ，1基础上顺时针旋转270°


### 使用方法

```python
LCD7R.fill(color)
```
填充画面。
- `color`: RGB颜色数据；如(255,0,0)表示红色。

<br></br>

```python
LCD7R.drawPixel(x, y, color)
```
画点。
- `x`: 横坐标；
- `y`: 纵坐标；
- `color`: RGB颜色数据；如(255,0,0)表示红色。

<br></br>

```python
LCD7R.drawLine(x0, y0, x1, y1, color)
```
画线段。
- `x0`: 起点横坐标；
- `y0`: 起点纵坐标；
- `x1`: 终点横坐标；
- `y1`: 终点纵坐标；
- `color`: RGB颜色数据；如(255,0,0)表示红色。

<br></br>

```python
LCD7R.drawRect(x, y, width, height, color, border=1, fillcolor=None)
```
画矩形。
- `x`: 左上角横坐标；
- `y`: 左上角纵坐标；
- `width`: 宽度；
- `height`: 高度；
- `color`: 颜色；如(255,0,0)表示红色；
- `border`: 边宽；
- `fillcolor`: 填充颜色，默认None为不填充。

<br></br>

```python
LCD7R.drawCircle(x, y, radius, color, border=1, fillcolor=None)
```
画圆。
- `x`: 圆心横坐标；
- `y`: 圆心纵坐标；
- `width`: 宽度；
- `height`: 高度；
- `color`: 颜色；如(255,0,0)表示红色；
- `border`: 边宽；
- `fillcolor`: 填充颜色，默认None为不填充。

<br></br>

```python
LCD7R.printStr(text, x, y, color, backcolor=None, size=2)
```
写字符。
- `text`: 字符；
- `x`: 起始横坐标；
- `y`: 起始纵坐标；
- `color`: 字体颜色；如(255,0,0)表示红色；
- `backcolor`: 字体背景颜色，默认None为无。
- `size`: 字体尺寸
    - `1`: 小号
    - `2`: 标准
    - `3`: 中号
    - `4`: 大号

<br></br>

```python
LCD7R.Picture(x, y, filename)
```
显示图片。支持图片格式类型：jpg、bmp。
- `x`: 起始横坐标；
- `y`: 起始纵坐标；
- `filename`: 图片路径+名称，如："/flash/cat.jpg"，"/sd/dog.jpg"。。（‘/’表示开发板的板载flash或sd卡的根目录。）

<br></br>


更多用法请阅读官方文档：<br></br>
https://docs.01studio.cc/library/tftlcd/tftlcd.LCD7R.html
<br></br>

有了上面的对象构造函数和使用说明，编程可以说是信手拈来了，我们在使用中将以上功能都跑一遍先看看编程流程图：


```mermaid
graph TD
    导入tftlcd模块 --> 构建7寸RGB屏对象 --> 执行画点,线,图形,字符,图像功能
```

## 参考代码

```python
'''
实验名称：7寸LCD液晶显示屏
版本：v1.0
平台：麦哲伦开发套件
作者：01Studio
社区：www.01studio.cc
说明：通过编程实现LCD的各种显示功能，包括填充、画点、线、矩形、圆形、显示英文、显示图片等。
'''

from tftlcd import LCD7R
import time

#定义常用颜色
RED = (255,0,0)
GREEN = (0,255,0)
BLUE = (0,0,255)
BLACK = (0,0,0)

########################
# 构建4.3寸LCD对象并初始化
########################
d = LCD7R(portrait=4) #竖屏显示

#填充白色
d.fill((255,255,255))

#画点
d.drawPixel(5, 20, RED)

#画线段
d.drawLine(5, 50, 300, 50, RED)

#画矩形
d.drawRect(5, 100, 300, 100, RED, border=5)

#画圆
d.drawCircle(150, 300, 50, RED, border=10)

#写字符,4种尺寸
d.printStr('Hello 01Studio', 10, 400, RED, size=1)
d.printStr('Hello 01Studio', 10, 500, GREEN, size=2)
d.printStr('Hello 01Studio', 10, 600, BLUE, size=3)
d.printStr('Hello 01Studio', 10, 700, BLACK, size=4)

time.sleep(5) #等待5秒

#显示图片
d.Picture(0,0,"/flash/picture/01studio.jpg")
time.sleep(3)
d.Picture(0,0,"/flash/picture/MAGELLAN.jpg")
```

## 实验结果

将示例程序的素材文件上传到开发板。（也可以直接用U盘拷贝然后复位开发板，速度更快。）

![lcd](./img/7_rgb/7_rgb3.png)

在Thonny IDE运行程序，可以看到LCD依次显示相关内容。

- 点、线、字符等显示

![lcd](./img/7_rgb/7_rgb4.jpg)

- 显示图片

:::tip 提示
麦哲伦（STM32H743）开发板相比于哥伦布（STM32F405）多了JPG图像硬件解码功能，因此图片显示速度非常快。
:::

![lcd](./img/7_rgb/7_rgb5.jpg)

从4.3寸到7寸，使用micropython编程只需要修改简单的初始化构建对象并可轻松切换，通过本实验我们体验到了LCD使用micropython开发的简单和灵活性。我们轻松实现了LCD的各种常规操作，让用户将精力放在应用。相信随着micropython库函数的日益成熟，其性能和可玩性将变得更强大！