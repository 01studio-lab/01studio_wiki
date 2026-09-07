---
sidebar_position: 1
---

# 小车介绍和组装

K230小车底盘使用4个独立减速电机（马达），每路电机可以独立控制速度。车头位置使用角度可调支架固定K230开发板，通过I2C与电机驱动板通讯实现小车各类运行动作控制。

**典型应用场景**
- 巡线识别小车;
- 路标识别：通过K230识别路标，对小车进行相应控制。
- 追踪小车：作为视觉系统的载体，用于色块或者人脸、人体相关视觉追踪。

![intro](./img/intro/line_follow0.png)

## 产品介绍

01Studio K230 小车底盘 [**点击购买>>**](https://item.taobao.com/item.htm?id=1048548495613)

![intro](./img/intro/intro0.png)

### 参数

|  产品参数 |
|  :---:  | ---  |
| 电机类型  | 直流减速电机（TT马达） |
| 电机减速比  | 1:48 |
| 电机工作电压  | 3V - 6V |
| 控制方式  | I2C控制驱动板（4路电机） |
| 材质  | 亚克力 |
| 尺寸  | 长宽: 255x150mm , 高度取决于开发板类型 |
| 重量  | 650g (不含开发板) |

### 尺寸图

- 底层

![intro](./img/intro/size1.png)

- 顶层

![intro](./img/intro/size2.png)

## 组装

先检查配件清单：

![intro](./img/intro/intro0_1.png)

### 电机

小车底盘分顶层和底层，底层固定电机，顶层固定开发板和驱动板。

![intro](./img/intro/intro1.jpg)

将亚克力保护膜撕开。

![intro](./img/intro/intro2.png)

先使用底层亚克力板，将2个电机固定柱从底层的底部往上插入。

![intro](./img/intro/intro3.png)

放进电机，注意焊接引线朝外。

![intro](./img/intro/intro4.png)

将2个长螺丝从外侧插入，穿过电机固定柱和电机孔。

![intro](./img/intro/intro5.png)

使用螺母在内侧拧紧固定。

![intro](./img/intro/intro6.png)

安装电机后如感觉有点松动属于正常现象，不影响行驶使用，想紧一点的话可以在电机和亚克力底板接触面垫个纸片或贴个胶布（双面胶）再装电机。

![intro](./img/intro/intro7.png)

使用同样的方法将4路电机组装好，注意引线焊接处均朝外。

![intro](./img/intro/intro8.png)

### 轮胎

接下来安装轮胎，电机和轮子是长条形TT接口，务必对准后方可以插入。

![intro](./img/intro/intro9.png)

轮胎安装时请用手指将电机和底盘按紧，避免插入过程损坏固定柱导致松动。

![intro](./img/intro/intro10.png)

用同样方法将4个轮胎组装好。

![intro](./img/intro/intro11.png)

### 码盘和测速传感器（选装）

将码盘安装到前轮位置，左右均可，这里安装右前轮为例：

![intro](./img/intro/intro12.png)

![intro](./img/intro/intro13.png)

测速传感器从底部往上插入，使用配套的M2.5x10螺丝和M2.5螺母固定一侧：

![intro](./img/intro/intro14.png)

![intro](./img/intro/intro15.png)

### 锂电池

小车底盘使用5V锂电池，TYPE-C母头为充电，使用手机充电器或者电脑均可充电。公头为输出，给设备供电。

![intro](./img/intro/intro16.png)

将2个锂电池按下图所示使用双面胶固定。1个电池给电机模块供电，1个锂电池给K230供电。**TYPE-C母头朝外，方便充电。**

![intro](./img/intro/intro17.png)

### 电机驱动板

使用M3x6铜柱和M3x6平头螺丝将电机驱动板按下图所示方向安装在小车上层亚克力板上。

- 正面

![intro](./img/intro/intro20.png)

- 侧面

![intro](./img/intro/intro21.png)

- 底面

![intro](./img/intro/intro22.png)

### CyberCAM K230开发板支架

将CyberCAM K230开发板角度可调支架安装到车头位置。使用支架配套的M3螺丝和M3螺母固定。

:::tip 提示
01Studio CyberCAM K230, CanMV K230 和 CanMV K230 mini三款开发板不一样，请在购买时选择对应的支架。
:::

![intro](./img/intro/intro23.png)

![intro](./img/intro/intro24.png)

### 上下层固定

将6个M3*30铜柱使用M3螺丝固定到底层。

![intro](./img/intro/intro18.png)

![intro](./img/intro/intro19.png)

将顶层放置上方，然后将2个锂电池电源线和4个电机线从顶层孔穿出。

![intro](./img/intro/intro25.png)

使用M3螺丝将顶层拧紧到底层的铜柱，让底层和顶层固定。

![intro](./img/intro/intro26.png)

### 电机接线

为了方便后续代码统一，我们按下图逆时针方向分机将4个电机命名为M0、M1、M2、M3

![intro](./img/intro/intro27.png)

依次将电机红黑线接到电机驱动板对应的的M0、M1、M2、M3排针接口。

- 红色为正（+）；
- 黑色为负（-）。

![intro](./img/intro/intro28.png)

### 电机驱动板电源线

使用TYPE-C转DC2.1转接头给舵机驱动板供电。

![intro](./img/intro/intro29.png)

按下电源开关，红灯亮表示供电正常。

![intro](./img/intro/intro30.png)

### CyberCAM K230开发板

车头的锂电池接上TYPE-C延长线，给K230代码离线运行时供电。

![intro](./img/intro/intro31.png)

将CyberCAM K230开发板使用螺丝固定到支架。

- CyberCAM K230 开发板

![intro](./img/intro/intro32.png)

使用4P连接线中的绿色线（SDA）,黄色线（SCL）将CyberCAM K230和电机驱动板连接。电机驱动板上芯片供电是3.3V，需要格外使用杜邦线连接板子上的3.3V。

![intro](./img/intro/intro33.png)

这里排线端只接着绿色(SDA)，黄色(SCL)。

![intro](./img/intro/intro34.png)

![intro](./img/intro/intro35.png)

至此，组装完成。

![intro](./img/intro/intro36.png)






