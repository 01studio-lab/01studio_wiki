---
sidebar_position: 3
---

# 边缘检测（彩色图）

## 实验讲解

边缘检测（彩色）用于识别彩色图像里的轮廓并画框标注。使用cv_lite库与前面 [边缘检测](../image_detection/find_edges.md) 例程对比速度更快。

![color1](./img/find_edges_rgb/1.bmp)

## rgb888_find_edges对象

### 构造函数
```python
img_out = image.Image(image_shape[1], image_shape[0], image.GRAYSCALE, alloc=image.ALLOC_REF, data=edge_np)
```
查找图像中指定的边缘。参数说明：
- `image_shape`: 图像形状，list类型，顺序为[高，宽]，如[480,640]
- `img_np`: 图像数据引用，ulab.numpy.ndarray类型
- `threshold1`: 低阈值，int类型
- `threshold2`: 高阈值，int类型


### 使用方法

以上函数返回edge_np值：**边缘检测后的图像数据，ulab.numpy.ndarray类型，在此数据上创建image实例**

更多用法请阅读 [官方文档](https://www.kendryte.com/k230_canmv/zh/main/zh/api/cv_lite/cv_lite.html#grayscale-find-edges)

<br></br>

代码编写流程如下：

```mermaid
graph TD
    导入sensor等相关模块 --> 初始化和配置相关模块  --> 定义检测参数 --> 寻找图像中的边缘 --> 画图指示 --> 寻找图像中的边缘;
```

## 参考代码

### CanMV K230 + 3.5寸mipi屏

```python
'''
实验名称：边缘检测
实验平台：01Studio CanMV K230
教程：wiki.01studio.cc
说明：通过修改lcd_width和lcd_height参数值选择3.5寸或2.4寸屏。
'''

# ============================================================
# MicroPython 基于 cv_lite 的 RGB888 边缘检测测试代码
# RGB888 Edge Detection Test using cv_lite extension
# ============================================================

import time, os, sys, gc
from machine import Pin
from media.sensor import *    # 导入摄像头接口 / Camera interface
from media.display import *   # 导入显示接口 / Display interface
from media.media import *     # 导入媒体资源管理器 / Media manager
import _thread
import cv_lite                # 导入 cv_lite 扩展模块 / cv_lite extension
import ulab.numpy as np       # MicroPython 类 NumPy 库

#CanMV K230 - 3.5寸mipi屏分辨率定义
lcd_width = 800
lcd_height = 480

'''
#CanMV K230 mini - 2.4寸mipi屏分辨率定义
lcd_width = 640
lcd_height = 480
'''

# -------------------------------
# 图像尺寸设置 / Image resolution
# -------------------------------
image_shape = [480, 640]  # 高 x 宽 / Height x Width

# -------------------------------
# 初始化摄像头（RGB888格式） / Initialize camera (RGB888 format)
# -------------------------------
sensor = Sensor(id=2, width=1280, height=960,fps=90)
sensor.reset()
sensor.set_framesize(width=image_shape[1], height=image_shape[0])
sensor.set_pixformat(Sensor.RGB888)  # 设置 RGB888 像素格式 / Set RGB888 pixel format

# -------------------------------
# 初始化显示器（IDE虚拟输出） / Initialize display (IDE virtual output)
# -------------------------------
Display.init(Display.ST7701, width=lcd_width, height=lcd_height, to_ide=True, quality=50)

# -------------------------------
# 初始化媒体资源管理器 / Initialize media manager
# -------------------------------
MediaManager.init()
sensor.run()

# -------------------------------
# 启动帧率计时器 / Start FPS timer
# -------------------------------
clock = time.clock()

# -------------------------------
# 边缘检测参数 / Edge detection parameters (Canny thresholds)
# -------------------------------
threshold1 = 50   # Canny 边缘检测低阈值 / Lower threshold for Canny
threshold2 = 80   # Canny 边缘检测高阈值 / Higher threshold for Canny

# -------------------------------
# 主循环 / Main loop
# -------------------------------
while True:
    clock.tick()

    # 拍摄一帧图像 / Capture a frame
    img = sensor.snapshot()
    img_np = img.to_numpy_ref()  # 获取 RGB888 ndarray 引用

    # 调用 cv_lite 扩展的边缘检测函数，返回灰度边缘图 ndarray
    edge_np = cv_lite.rgb888_find_edges(image_shape, img_np, threshold1, threshold2)

    # 构造灰度图像对象用于显示
    img_out = image.Image(image_shape[1], image_shape[0], image.GRAYSCALE, alloc=image.ALLOC_REF, data=edge_np)
    
    img_out.draw_string_advanced(0, 0, 30, 'FPS: '+str("%.3f"%(clock.fps())), color = (255, 255, 255))

    # 显示结果图像 / Show image with blobs
    Display.show_image(img_out, x=round((lcd_width-sensor.width())/2),y=round((lcd_height-sensor.height())/2))

    # 垃圾回收 / Garbage collect
    gc.collect()

    # 打印当前帧率 / Print FPS
    print("edges:", clock.fps())

# -------------------------------
# 退出时释放资源 / Cleanup on exit
# -------------------------------
sensor.stop()
Display.deinit()
os.exitpoint(os.EXITPOINT_ENABLE_SLEEP)
time.sleep_ms(100)
MediaManager.deinit()

```

### CanMV K230 mini + 2.4寸mipi屏

```python
'''
实验名称：边缘检测
实验平台：01Studio CanMV K230
教程：wiki.01studio.cc
说明：通过修改lcd_width和lcd_height参数值选择3.5寸或2.4寸屏。
'''

# ============================================================
# MicroPython 基于 cv_lite 的 RGB888 边缘检测测试代码
# RGB888 Edge Detection Test using cv_lite extension
# ============================================================

import time, os, sys, gc
from machine import Pin
from media.sensor import *    # 导入摄像头接口 / Camera interface
from media.display import *   # 导入显示接口 / Display interface
from media.media import *     # 导入媒体资源管理器 / Media manager
import _thread
import cv_lite                # 导入 cv_lite 扩展模块 / cv_lite extension
import ulab.numpy as np       # MicroPython 类 NumPy 库

'''
#CanMV K230 - 3.5寸mipi屏分辨率定义
lcd_width = 800
lcd_height = 480
'''

#CanMV K230 mini - 2.4寸mipi屏分辨率定义
lcd_width = 640
lcd_height = 480


# -------------------------------
# 图像尺寸设置 / Image resolution
# -------------------------------
image_shape = [480, 640]  # 高 x 宽 / Height x Width

# -------------------------------
# 初始化摄像头（RGB888格式） / Initialize camera (RGB888 format)
# -------------------------------
sensor = Sensor(id=2, width=1280, height=960,fps=90)
sensor.reset()
sensor.set_framesize(width=image_shape[1], height=image_shape[0])
sensor.set_pixformat(Sensor.RGB888)  # 设置 RGB888 像素格式 / Set RGB888 pixel format

# -------------------------------
# 初始化显示器（IDE虚拟输出） / Initialize display (IDE virtual output)
# -------------------------------
Display.init(Display.ST7701, width=lcd_width, height=lcd_height, to_ide=True, quality=50)

# -------------------------------
# 初始化媒体资源管理器 / Initialize media manager
# -------------------------------
MediaManager.init()
sensor.run()

# -------------------------------
# 启动帧率计时器 / Start FPS timer
# -------------------------------
clock = time.clock()

# -------------------------------
# 边缘检测参数 / Edge detection parameters (Canny thresholds)
# -------------------------------
threshold1 = 50   # Canny 边缘检测低阈值 / Lower threshold for Canny
threshold2 = 80   # Canny 边缘检测高阈值 / Higher threshold for Canny

# -------------------------------
# 主循环 / Main loop
# -------------------------------
while True:
    clock.tick()

    # 拍摄一帧图像 / Capture a frame
    img = sensor.snapshot()
    img_np = img.to_numpy_ref()  # 获取 RGB888 ndarray 引用

    # 调用 cv_lite 扩展的边缘检测函数，返回灰度边缘图 ndarray
    edge_np = cv_lite.rgb888_find_edges(image_shape, img_np, threshold1, threshold2)

    # 构造灰度图像对象用于显示
    img_out = image.Image(image_shape[1], image_shape[0], image.GRAYSCALE, alloc=image.ALLOC_REF, data=edge_np)
    
    img_out.draw_string_advanced(0, 0, 30, 'FPS: '+str("%.3f"%(clock.fps())), color = (255, 255, 255))

    # 显示结果图像 / Show image with blobs
    Display.show_image(img_out, x=round((lcd_width-sensor.width())/2),y=round((lcd_height-sensor.height())/2))

    # 垃圾回收 / Garbage collect
    gc.collect()

    # 打印当前帧率 / Print FPS
    print("edges:", clock.fps())

# -------------------------------
# 退出时释放资源 / Cleanup on exit
# -------------------------------
sensor.stop()
Display.deinit()
os.exitpoint(os.EXITPOINT_ENABLE_SLEEP)
time.sleep_ms(100)
MediaManager.deinit()
```

## 实验结果

在CanMV IDE中运行代码，用户可自行调整参数，过滤一些干扰，识别结果如下：

**边缘识别：**

原图：

![color1](./img/find_edges_rgb/2.png)

实验结果：

![color1](./img/find_edges_rgb/1.bmp)