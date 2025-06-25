---
sidebar_position: 10
---

# KPU简介

前面的颜色识别、二维码识别都是使用了一些简单的图像处理功能，而更高级的机器视觉就需要使用KPU。可以简单类别为计算机的GPU（显卡），本质是实现高速的图像数据运算。


我们来简单介绍一下K210的KPU。KPU是K210内部一个神经网络处理器，它可以在低功耗的情况下实现卷积神经网络计算，实时获取被检测目标的大小、坐标和种类，对人脸或者物体进行检测和分类。
KPU 具备以下几个特点：
- 支持主流训练框架按照特定限制规则训练出来的定点化模型
- 对网络层数无直接限制，支持每层卷积神经网络参数单独配置，包括输入输出通道数目、输入输 出行宽列高
- 支持两种卷积内核 1x1 和 3x3
- 支持任意形式的激活函数
- 实时工作时最大支持神经网络参数大小为 5.5MiB 到 5.9MiB
- 非实时工作时最大支持网络参数大小为（Flash 容量-软件体积）

简单来说就是KPU能加载和运行不同的模型，实现各种机器视觉等功能。

目前K210的KPU上主要跑YOLO（You Only Look Once）框架的目标检测算法来实现。通过micropython的封装让我们可以不关心底层实现原理，非常方便的使用起来。我们来看一下通过KPU运行Yolo的对象用法。

:::tip 提示
KPU这部分内容和参数跟模型相关，MicroPython顶层用户可以直接按示例代码初始化使用无需关心细节。如感兴趣可以网上搜素一下Yolo原理相结合学习。
:::

## KPU对象

### 构造函数
```python
kpu = maix.KPU
```
构建KPU对象，KPU模块位于maix下。

### 运行模型使用方法

```python
kpu.load_kmodel(file_path)
```
通过SD卡加载模型。**（推荐使用SD卡方式存放模型，方便拷贝）**
- `file_path`: 模型在SD卡的文件名，如“/sd/xxx.kmodel”

<br></br>

```python
kpu.load_kmodel(flash_offset, size)
```
通过Flash加载模型。（kmodel模型烧录跟固件烧录一致，只需要修改一下起始地址）
- `flash_offset`: 模型在 flash 中的偏移大小，如 0xd00000 表示模型烧录在13M起始的地方, 0x300000表示在 Flash 3M的地方。

- `size`: 模型大小，通过文件右键属性查看。

例：kpu.load_kmodel(0x300000, 1536936)

<br></br>

```python
kpu.init_yolo2(anchor, anchor_num=5, img_w=320, img_h=240, net_w=320, net_h=240,layer_w=10,
                layer_h=8, threshold=0.7, nms_value=0.4, classes=1)
```
为yolo2网络模型传入初始化参数， 只有使用yolo2时使用。
- `anchor` : 锚点参数与模型参数一致，同一个模型这个参数是固定的，和模型绑定的（训练模型时即确定了）， 不能改成其它值。
可选参数：
- `anchor_num` : anchor 的锚点数， 这里固定为 len(anchors)//2，默认值为5;
- `img_w` : 输入图像的宽，决定了画框边界，如果送入kpu的图是由一张小尺寸图扩充而来，该值可以设为原图宽，默认值为320;
- `img_h` : 输入图像的高，决定了画框边界，如果送入kpu的图是由一张小尺寸图扩充而来，该值可以设为原图高，默认值为240;
- `net_w` : 模型需要的图的宽，该值由训好的模型所决定，默认值为320;
- `net_h` : 模型需要的图的高，该值由训好的模型所决定，默认值为240;
- `layer_w` : 模型层宽，该值由训好的模型所决定，默认值为10;
- `layer_h` : 模型层高，该值由训好的模型所决定，默认值为8;
- `threshold` : 概率阈值， 只有是这个物体的概率大于这个值才会输出结果， 取值范围：[0, 1]，默认值为0.7;
- `nms_value` : box_iou 门限, 为了防止同一个物体被框出多个框，当在同一个物体上框出了两个框，这两个框的交叉区域占两个框总占用面积的比例 如果小于这个值时， 就取其中概率最大的一个框，默认值为0.4;
- `classes` : 要分辨的目标类数量，该值由训好的模型所决定，默认值为1。

<br></br>

```python
kpu.run_with_output(img [,getlist=False [, get_feature=False]])
```
运行yolo2网络：

- `img` : 从sensor中采集到的图像，也可以传入图片文件路径;
- `getlist` : 为True返回浮点数列表，默认False;
- `get_feature` : 为True则返回归一化后的256浮点特征值，在自学习分类示例中用到，默认False。

<br></br>

```python
kpu.regionlayer_yolo2()
```
yolo2运算，并获取结果。

返回一个二维列表，每个子列表代表一个识别到的目标物体，目标物体信息列表包含以下6个数据：
x, y, w, h：代表目标框的左上角x,y坐标，以及框的宽w高h
class: 类别序号
prob : 概率值，范围：[0, 1]

<br></br>

```python
kpu.deinit()
```
KPU注销函数，释放模型占用的内存。

立即释放，但是变量还在，可以使用del kpu_object 的方式删除， 另外也可以直接只使用del kpu_object来标记对象已被删除，下一次GC进行内存回收或者手动调用gc.collect()时，会自动释放内存。

<br></br>

更多用法请阅读官方文档：<br></br>
https://www.kendryte.com/canmv/main/canmv/library/canmv/maix/maix.KPU_NEW.html