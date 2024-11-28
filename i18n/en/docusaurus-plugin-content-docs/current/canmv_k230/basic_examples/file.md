---
sidebar_position: 11
---

# Reading and writing Files

## Foreword
在嵌入式编程中我们经常会遇到需要将某些数据实现掉电保存功能，如传感器数据等。往往会用到EEPROM、flash等一些储存方式。而CanMV K230 MicroPython自带文件系统，我们只需要将数据直接用文件方式保存即可。

## Experiment Purpose
编程实现文件读写操作。

## 实验讲解

micropython的文件操作大部分指令兼容CPython。因此我们可以直接使用Python编程来实现文件读写。CanMV K230盘符对应的目录为`/sdcard/`路径下：

编程流程如下：

```mermaid
graph TD
    新建1个文件并写入数据 -->  读取刚刚保存文件的内容 ;
```

## 参考代码

```python
'''
实验名称：文件读写
版本： v1.0
作者：01Studio
实验平台：01Studio CanMV K230
说明：文件读写，将字符“01Studio”写入文件后再读取出来。
'''

###########
## 写文件
###########
f = open('/sdcard/1.txt', 'w') #以写的方式打开一个文件，没有该文件就自动新建
f.write('01Studio') #写入数据
f.close() #每次操作完记得关闭文件

###########
## 读文件
###########
f = open('/sdcard/1.txt', 'r') #以读方式打开一个文件
text = f.read()
print(text) #读取数据并在终端打印
f.close() #每次操作完记得关闭文件

```

## 实验结果

运行代码，可以看到串口终端打印了文件内容。

![file](./img/file/file1.png)

打开CanMV盘符，在sdcard目录下可以看到刚刚代码新建的1.txt文件，里面的内容就是我们写入的01Studio：

![file](./img/file/file2.png)

除了txt，你可以写入任何后缀的文件，如json、csv或者无后缀的文件。更多文件操作使用方法可以网上搜索Pyhton或MicroPython文件读写。