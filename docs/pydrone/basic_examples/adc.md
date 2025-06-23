---
sidebar_position: 6
---

# 电池电量（ADC）

## 前言
ADC(analog to digital conversion) 模拟数字转换。意思就是将模拟信号转化成数字信号，由于单片机只能识别二级制数字，所以外界模拟信号常常会通过ADC转换成其可以识别的数字信息。常见的应用就是将变化的电压转成数字信号实现对电压值测量。

pyDrone上带有锂电池电压测量电路，通过电压测量我们可以判断电池电量。

## 实验目的

通过编程调用MicroPython的内置ADC函数，实现电池电量测量。

## 实验讲解

pyDrone装有3.7V的锂电池（充满电最高可达4.2V）。但ESP32-S3的IO耐压是3.3V，因此我们可以通过一个分压电路实现对高于3.3V电压值的测量。电路原理图如下：

![adc](./img/adc/adc1.png)


从上图可以看到锂电池通过2个电阻分压，接到了GPIO2。因此可得到电池VBAT与实际测量电压ADC的对应关系：VBAT / (40.2K+10K) = ADC / 10K ;
即：**VBAT = ADC * 5.02**

ESP32-S3的ADC默认量程为0-1V（0-4095），我们来看看ADC模块的构造函数和使用方法。

## ADC对象

### 构造函数
```python
adc = machine.ADC(Pin(id))
```
构建ADC对象，ADC引脚对应如下：

- `Pin(id)` ：支持ADC的Pin对象，如：Pin(2) 。


### 使用方法
```python
adc.read()
```
获取ADC值，测量精度是12位，返回0-4095（对应电压0-1V）。

<br></br>

```python
adc.atten(attenuation)
```
配置衰减器。配置衰减器能增加电压测量范围，以牺牲精度为代价的。
- `attenuation` ：衰减设置。
    - `ADC.ATTN_0DB` ：0dB衰减，最大测量电压1.00V。（默认配置）
    - `ADC.ATTN_2_5DB` ： 2.5dB 衰减, 最大输入电压约为 1.34v；
    - `ADC.ATTN_6DB` ：6dB 衰减, 最大输入电压约为 2.00v；
    - `ADC.ATTN_11DB` ：11dB 衰减, 最大输入电压约为3.3v


更多用法请阅读官方文档：<br></br>
https://docs.micropython.org/en/latest/esp32/quickref.html#adc-analog-to-digital-conversion

<br></br>

熟悉ADC使用方法后，我们通过代码实现周期性测量引脚2电压，代码编程流程图如下：


```mermaid
graph TD
    导入相关模块 --> 初始化相关模块 --> 获取ADC原始值 --> 计算锂电池电压值并打印  --> 获取ADC原始值;
```

## 参考代码

```python
'''
实验名称：电池电量（ADC）
版本：v1.0
日期：2022.4
作者：01Studio
说明：测量电池电压值。
'''

#导入相关模块
from machine import Pin,ADC,Timer

#电池电压测量引脚初始化
adc = ADC(Pin(2))

def ADC_Test(tim):

    #采集ADC值并计算电池电压值,0.96为使用电压表误差修正值，用户可以自行调整，接近1即可。
    v = adc.read()/4095*5.02*0.96
    
    #串口REPL打印
    print('Battery: '+str('%.2f'%v)+'V  ')

#开启定时器
tim = Timer(1)
tim.init(period=1000, mode=Timer.PERIODIC, callback=ADC_Test) #周期1s
```

## 实验结果

运行代码，可以看到thonny终端定时打印电压信息。

![adc](./img/adc/adc2.png)

这一节我们学习了电池电量测量，当电压不足时候，就可以充电了。[充电教程>>](../intro/charge.md)