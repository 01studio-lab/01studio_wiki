---
sidebar_position: 1
---

# 车牌检测

## 前言

车牌检测实现将图像中的车牌找出来，并使用矩形框画图指示，支持单个车牌和多个车牌检测。

## 实验目的

检测摄像头拍摄到的画面中的车牌并画图指示。

## 实验讲解

本实验通过CanMV K230 AI视觉框架开发，详细说明参考 [AI视觉开发框架](../ai_frame.md) 章节内容，这里不再重复。例程用到的模型已经存放在CanMV K230的文件系统，无需额外拷贝。

具体编程思路如下：

```mermaid
graph TD
    导入AI视觉框架相关模块  --> 加载相关模型 --> 初始化和配置相关模块 --> 获取摄像头图像 --> AI视觉推理查找图像中车牌 --> 画图描绘 --> 获取摄像头图像;
```

## 参考代码

```python
'''
实验名称：车牌检测
实验平台：01Studio CanMV K230
教程：wiki.01studio.cc
说明：检测车牌位置并用矩形框指示
    可以通过display="xxx"参数选择"hdmi"、"lcd3_5"(3.5寸mipi屏)或"lcd2_4"(2.4寸mipi屏)显示方式
'''

from libs.PipeLine import PipeLine, ScopedTiming
from libs.AIBase import AIBase
from libs.AI2D import Ai2d
import os
import ujson
from media.media import *
from media.sensor import *
from time import *
import nncase_runtime as nn
import ulab.numpy as np
import time
import utime
import image
import random
import gc
import sys
import aidemo

# 自定义车牌检测类
class LicenceDetectionApp(AIBase):
    # 初始化函数，设置车牌检测应用的参数
    def __init__(self, kmodel_path, model_input_size, confidence_threshold=0.5, nms_threshold=0.2, rgb888p_size=[224,224], display_size=[1920,1080], debug_mode=0):
        super().__init__(kmodel_path, model_input_size, rgb888p_size, debug_mode)  # 调用基类的初始化函数
        self.kmodel_path = kmodel_path  # 模型路径
        # 模型输入分辨率
        self.model_input_size = model_input_size
        # 分类阈值
        self.confidence_threshold = confidence_threshold
        self.nms_threshold = nms_threshold
        # sensor给到AI的图像分辨率
        self.rgb888p_size = [ALIGN_UP(rgb888p_size[0], 16), rgb888p_size[1]]
        # 显示分辨率
        self.display_size = [ALIGN_UP(display_size[0], 16), display_size[1]]
        self.debug_mode = debug_mode
        # Ai2d实例，用于实现模型预处理
        self.ai2d = Ai2d(debug_mode)
        # 设置Ai2d的输入输出格式和类型
        self.ai2d.set_ai2d_dtype(nn.ai2d_format.NCHW_FMT, nn.ai2d_format.NCHW_FMT, np.uint8, np.uint8)

    # 配置预处理操作，这里使用了pad和resize，Ai2d支持crop/shift/pad/resize/affine
    def config_preprocess(self, input_image_size=None):
        with ScopedTiming("set preprocess config", self.debug_mode > 0):
            # 初始化ai2d预处理配置，默认为sensor给到AI的尺寸，可以通过设置input_image_size自行修改输入尺寸
            ai2d_input_size = input_image_size if input_image_size else self.rgb888p_size
            self.ai2d.resize(nn.interp_method.tf_bilinear, nn.interp_mode.half_pixel)
            self.ai2d.build([1,3,ai2d_input_size[1],ai2d_input_size[0]],[1,3,self.model_input_size[1],self.model_input_size[0]])

    # 自定义当前任务的后处理
    def postprocess(self, results):
        with ScopedTiming("postprocess", self.debug_mode > 0):
            # 对检测结果进行后处理
            det_res = aidemo.licence_det_postprocess(results, [self.rgb888p_size[1], self.rgb888p_size[0]], self.model_input_size, self.confidence_threshold, self.nms_threshold)
            return det_res

    # 绘制检测结果到屏幕上
    def draw_result(self, pl, dets):
        with ScopedTiming("display_draw", self.debug_mode > 0):
            if dets:
                pl.osd_img.clear()  # 清除屏幕
                point_8 = np.zeros((8), dtype=np.int16)
                for det in dets:
                    # 将检测框坐标从sensor图像分辨率转换为显示分辨率
                    for i in range(4):
                        x = det[i * 2 + 0] / self.rgb888p_size[0] * self.display_size[0]
                        y = det[i * 2 + 1] / self.rgb888p_size[1] * self.display_size[1]
                        point_8[i * 2 + 0] = int(x)
                        point_8[i * 2 + 1] = int(y)
                    # 在屏幕上绘制检测框
                    for i in range(4):
                        pl.osd_img.draw_line(point_8[i * 2 + 0], point_8[i * 2 + 1], point_8[(i + 1) % 4 * 2 + 0], point_8[(i + 1) % 4 * 2 + 1], color=(255, 0, 255, 0), thickness=4)
            else:
                pl.osd_img.clear()  # 如果没有检测结果，则清空屏幕

if __name__=="__main__":

    # 显示模式，可以选择"hdmi"、"lcd3_5"(3.5寸mipi屏)和"lcd2_4"(2.4寸mipi屏)

    display="lcd3_5"

    if display=="hdmi":
        display_mode='hdmi'
        display_size=[1920,1080]
        rgb888p_size = [1920, 1080]

    elif display=="lcd3_5":
        display_mode= 'st7701'
        display_size=[800,480]
        rgb888p_size = [1920, 1080]

    elif display=="lcd2_4":
        display_mode= 'st7701'
        display_size=[640,480]
        rgb888p_size = [1280, 960] #2.4寸屏摄像头画面比例为4:3

    # 模型路径
    kmodel_path="/sdcard/examples/kmodel/LPD_640.kmodel"
    # 其它参数设置
    confidence_threshold = 0.2
    nms_threshold = 0.2

    # 初始化PipeLine
    pl=PipeLine(rgb888p_size=rgb888p_size,display_size=display_size,display_mode=display_mode)

    pl.create(Sensor(width=rgb888p_size[0], height=rgb888p_size[1]))  # 创建PipeLine实例

    # 初始化自定义车牌检测实例
    licence_det=LicenceDetectionApp(kmodel_path,model_input_size=[640,640],confidence_threshold=confidence_threshold,nms_threshold=nms_threshold,rgb888p_size=rgb888p_size,display_size=display_size,debug_mode=0)
    licence_det.config_preprocess()

    clock = time.clock()

    while True:

        clock.tick()

        img=pl.get_frame() # 获取当前帧数据
        res=licence_det.run(img) # 推理当前帧
        licence_det.draw_result(pl,res) # 绘制结果到PipeLine的osd图像
        print(res) # 显示当前的绘制结果
        pl.show_image() # 显示当前的绘制结果
        gc.collect() # 垃圾回收

        print(clock.fps()) #打印帧率

```

这里对关键代码进行讲解：

- 设置显示方式：
    通过改变`display`的参数选择 `hdmi` 或 `lcd`（3.5寸mipi显示屏）显示图像。
```python
    ...

    # 显示模式，可以选择"hdmi"、"lcd3_5"(3.5寸mipi屏)和"lcd2_4"(2.4寸mipi屏)

    display="lcd3_5"

    if display=="hdmi":
        display_mode='hdmi'
        display_size=[1920,1080]
        rgb888p_size = [1920, 1080]

    elif display=="lcd3_5":
        display_mode= 'st7701'
        display_size=[800,480]
        rgb888p_size = [1920, 1080]

    elif display=="lcd2_4":
        display_mode= 'st7701'
        display_size=[640,480]
        rgb888p_size = [1280, 960] #2.4寸屏摄像头画面比例为4:3
    ...    
```

- 主函数代码：

可以看到使用默认配置后只使用了4行代码便实现了**获取当前帧图像、AI推理、绘制结果、显示结果** 的识别流程。

代码中 `res`为识别结果。

```python
    ...
    while True:

        clock.tick()

        img=pl.get_frame() # 获取当前帧数据
        res=licence_det.run(img) # 推理当前帧
        licence_det.draw_result(pl,res) # 绘制结果到PipeLine的osd图像
        print(res) # 显示当前的绘制结果
        pl.show_image() # 显示当前的绘制结果
        gc.collect() # 垃圾回收

        print(clock.fps()) #打印帧率
    ...
```

## 实验结果

运行代码，将摄像头正对下图车牌。

原图：

![hand_detection](./img/license_det/license_det1.jpg)

识别结果：

![hand_detection](./img/license_det/license_det2.jpg)


