---
sidebar_position: 3
---

# 小车动作

## 前言

上一节我们学习了电机的控制，这节来学习小车的各类动作控制，如前进、后退、左转、右转。

## 实验目的

学习CyberCAM K230控制小车执行各种动作。

## 实验讲解

上一节我们学习了电机的控制方法，实现了对电机正转、反转、停止和转速的控制。这款小车底盘由4个电机组成，每个电机可以独立控制，通过不同的方向和速度可以实现小车的**前进、后退、左转、右转**功能。 这种控制方式称为**差速控制**小车。

- 前进

当4个电机同时正转（向前转）时，小车前进。电机的速度越大小车的前进速度越快。

![motor](./img/move/forward.png)

- 后退

当4个电机同时反转（向后转）时，小车后退。电机的速度越大小车的后退速度越快。

![motor](./img/move/backward.png)

- 左转

当左侧2个电机（M0,M1）反转（向后转），右侧2个电机（M2,M3）正转（向前转），小车左转。两侧电机的速度相差越大小车的转弯角度越大。

![motor](./img/move/left.png)

- 右转

当左侧2个电机（M0,M1）正转（向前转），右侧2个电机（M2,M3）反转（向后转），小车右转。两侧电机的速度相差越大小车的转弯角度越大。。

![motor](./img/move/right.png)

## 开启I2C2

I2C2 与 UART2 复用同一组引脚，在同一时间只能选择其中一种功能使用，系统默认启用 UART2。

先执行下方指令检查一下I2C2的开启情况：
```bash
gpio pins
```

出现下图表示开启成功：

![i2c](./img/i2c/i2c_2.png)

如果没有，需要在终端输入下面指令开启：
```bash
sudo set-device enable i2c2
```

重启开发板：
```bash
sudo reboot
```

重启后再次执行`gpio pins`指令检查确认已经开启即可。

## Motors对象

直流电机的 CircuitPython 驱动已经封装在 motor.py 和 pca9685.py 中。使用时初始化 I2C 和 PCA9685，然后创建直流电机对象即可。

### 构造函数

```python
from adafruit_pca9685 import PCA9685
from adafruit_motor import motor

i2c = busio.I2C(board.SCL2, board.SDA2)
pca = PCA9685(i2c, address=0x40)
pca.frequency = 100
...

m = motor.DCMotor(pca.channels[0], pca.channels[1])
```
使用 PCA9685 的两个 PWM 通道构建一路直流电机对象。

### 使用方法

```python
m.throttle = value
```
电机控制函数。

- `value`: 表示 PWM 占空比。取值范围：-1.0～1.0；

<br></br>

运行前需要将资料包中的示例程序文件夹整体拷贝到 CyberCAM 的 `/data/app`目录下。

代码编写流程如下：

```mermaid
graph TD
    导入相关模块 --> 构建小车电机对象 --> 将前进,后退,左转,右转5个动作封装成函数 --> 调用相关函数让小车执行相关动作;
```

## 参考代码

```python
'''
# Copyright (c) [2026] [01Studio]. Licensed under the MIT License.

实验名称：小车动作控制
实验平台：01Studio CyberCAM + 小车底盘
'''
import time, busio, board, os, sys

# 优先当前文件夹下相对路径（app离线部署）
local_lib_path = "./lib"
system_lib_path = "/data/app/car-motor/lib"

# 判断优先使用哪个路径
if os.path.exists(os.path.join(local_lib_path, "adafruit_motor")) or os.path.exists(os.path.join(local_lib_path, "adafruit_pca9685")):
    target_path = os.path.abspath(local_lib_path)
# 使用系统绝对路径（IDE运行调试）
elif os.path.exists(os.path.join(system_lib_path, "adafruit_motor")) or os.path.exists(os.path.join(system_lib_path, "adafruit_pca9685")):
    target_path = system_lib_path
else:
    raise FileNotFoundError("文件缺失，请检查当前路径与系统路径下的文件是否存在。")

# 将找到的路径插入到 sys.path 最前面（确保优先加载它）
sys.path.insert(0, target_path)

from adafruit_pca9685 import PCA9685
from adafruit_motor import motor

#构建I2C对象
i2c = busio.I2C(board.SCL2, board.SDA2)

#构建PCA9685对象
pca = PCA9685(i2c, address=0x40)
#设置pwm输出频率
pca.frequency = 100

#构建4小车4个电机对象
motor0 = motor.DCMotor(pca.channels[0], pca.channels[1])
motor1 = motor.DCMotor(pca.channels[3], pca.channels[2])
motor2 = motor.DCMotor(pca.channels[5], pca.channels[4])
motor3 = motor.DCMotor(pca.channels[6], pca.channels[7])

# throttle 取值范围：-1.0～1.0
# 正负号控制电机转向，绝对值表示 PWM 占空比
# 绝对值越大，电机驱动力通常越大、转速通常越高
# 教程接线中，负值对应小车前进

#前进
def forward():

    motor0.throttle = -0.5
    motor1.throttle = -0.5
    motor2.throttle = -0.5
    motor3.throttle = -0.5

#后退
def backward():

    motor0.throttle = 0.5
    motor1.throttle = 0.5
    motor2.throttle = 0.5
    motor3.throttle = 0.5

#左转
def turn_left():

    motor0.throttle = 0.5
    motor1.throttle = 0.5
    motor2.throttle = -0.5
    motor3.throttle = -0.5

#右转
def turn_right():

    motor0.throttle = -0.5
    motor1.throttle = -0.5
    motor2.throttle = 0.5
    motor3.throttle = 0.5

#停止
def stop():

    motor0.throttle = 0
    motor1.throttle = 0
    motor2.throttle = 0
    motor3.throttle = 0

forward() #前进
time.sleep(3)

backward() #后退
time.sleep(3)

turn_left() #左 转
time.sleep(3)

turn_right() #右转
time.sleep(3)

stop()
```

## 调试技巧

为了方便调试，避免电机转动导致小车跑动，可以在小车底盘下方放置一个尺寸合适的盒子，将轮胎撑起，然后做相关调试。

![motor](./img/move/box1.png)

![motor](./img/move/box2.png)


## 实验结果

将资料包中的示例程序文件夹整体拷贝到 CyberCAM 的 `/data/app`目录下，主程序及其依赖库均包含在该文件夹中。

![motor](./img/move/move4.png)

终端输入下面指令确认I2C开启情况：
```bash
gpio pins
```

出现下图表示开启成功：

![i2c](./img/i2c/i2c_2.png) 

如没开启请按前面内容打开：[开启I2C2](#开启I2C2)

上面的资料包中的示例程序文件夹整体拷贝到 CyberCAM的`/data/app`目录下完成[离线APP部署](../os_software/custom_app), 然后放置在底面，使用前面的锂电池给CyberCAM上电，在显示屏上点击应用可以看到小车一次完成前进，后退，左转，右转动作。

![motor](./img/move/move5.png)




