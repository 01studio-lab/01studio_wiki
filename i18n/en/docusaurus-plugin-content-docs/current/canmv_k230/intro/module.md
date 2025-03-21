---
sidebar_position: 2
---

# Accessories installation and use

This section introduces the installation and use of 01Studio CanMV K230 related accessory modules.

## Heat sink

The heat sink can help CanMV K230 dissipate heat more effectively, especially in high temperature environments to achieve stable operation. Installation is also very simple. Tear off the 3M adhesive at the bottom of the heat sink and stick it on the silk screen frame of K230 and memory chip. Because the heat sink is conductive, be careful not to contact other components (capacitors, resistors) on the circuit board during installation to avoid short circuits.

![module](./img/module/module1.png)

![module](./img/module/module2.jpg)

## Acrylic protection plate

The function of the acrylic base plate is to prevent the bottom of the PCB from short-circuiting with other metal objects and to prevent the solder pins from scratching the desktop. At the same time, the space created at the bottom also improves the heat dissipation effect.

The installation method of the CanMV K230 acrylic base plate is very simple. Tear off the acrylic protective film, embed the copper column in the middle, and tighten the upper and lower ends with M2.5 screws.

![module](./img/module/module3.png)

![module](./img/module/module4.png)

## shell

The function of the shell is to completely wrap and effectively protect the development board. Users can purchase: [Click to Buy>>](https://www.aliexpress.com/item/1005008584060443.html)

![shell](./img/module/shell0.png)

**Here is the assembly tutorial:**

First make sure you have the following:

- 01Studio CanMV K230 motherboard x1
- Shell x1
- Acrylic top cover x1
- Acrylic bottom plate x1
- M2.5*8+3 single-pass copper column x4
- M2.5*4 double-pass copper column x4
- M2.5*5 cross flat head screw x8

![shell](./img/module/shell1.jpg)

Step 1: Install the two copper pillars into the 4 holes as shown in the figure below and tighten them:
![shell](./img/module/shell2.png)

Then install the board into the shell from bottom to top:
![shell](./img/module/shell3.png)

Tear off the transparent acrylic protective film on the top cover:
![shell](./img/module/shell4.png)

Fix it to the top with screws:
![shell](./img/module/shell5.png)

The bottom cover acrylic is also operated in the same way:
![shell](./img/module/shell6.png)

At this point, the assembly is complete:
![shell](./img/module/shell7.png)

The top cover can be equipped with a cooling fan. Note that the fan screws are installed from bottom to top.
![shell](./img/module/shell8.png)

Connect the cooling fan power cable to the red and black pin headers shown in the figure below, and supply 5V power.

![shell](./img/module/shell9.png)

A 3.5-inch LCD MINI screen can also be installed on the back. First assemble the screen from the back of the development board, then put it into the shell and screw on the top cover.

![shell](./img/module/shell10.png)

## 3.5 inch MIPI display

[Click to Buy>>](https://www.aliexpress.com/item/1005007579014355.html)

### Function Introduction

![module](./img/module/lcd.png)

### Product Parameters

|  Product Parameters |
|  :---:  | ---  |
| Resolution  | 800 x 480（Pixel） |
| Interface | MIPI 2lane|
| Driver IC  | ST7701S | 
| Touch  | FT53xx (Capacitive touch) |
| Operating Temperature  | -20℃ ~ 70℃ |

|  Appearance Parameters |
|  :---:  | ---  |
| Size  | 87 x 56 mm |
| weight  | 52g |

### Assembly

The CanMV K230 development board and the 3.5-inch MIPI screen can be connected using the matching 31P cable. **The gold finger contacts of the cable are inserted downwards, as show in the following figure:**

![module](./img/module/module5_1.png)

After insertion, press down to lock the buckle:

![module](./img/module/module5.png)

It can be used in the same direction:

![module](./img/module/module6.png)

It can also be fixed on the back of the development board using studs:

![module](./img/module/module7.png)

## Camera

### GC2093
01Studio CanMV K230 development board comes standard with a GC2093 camera (70° viewing angle), and a 140° wide-angle lens version can be purchased additionally.[**Click to Buy>>**](https://www.aliexpress.com/item/3256807959778168.html)

|  Product Parameters |
|  :---:  | ---  |
| Sensor  | GC2093 |
| Resolution | 1920X1080（1080P） |
| viewing angle | 70° (140° Available) | 
| Interface  | 24P |

|  Appearance Parameters |
|  :---:  | ---  |
| Size  | 17mm (Total length) |

![module](./img/module/gc20931.png)

### Camera extension cable

The standard GC2093 camera can be extended using an FPC extension cable. 24P, length 15cm.[**Clikc to Buy>>**](https://www.aliexpress.com/item/1005008146010210.html)

![module](./img/module/fpc1.png)

![module](./img/module/fpc2.png)

### OV5647

[**Click to Buy>>**](https://www.aliexpress.com/item/1005007707000572.html)

01Studio CanMV K230 can connect to the OV5647 camera with CSI0 and CSI1 interfaces. [Tutorial on how to use the multi-channel camera interface>>](../machine_vision/camera.md#multi-channel-camera-interface-usage)

![module](./img/module/ov5647_1.png)

#### Product Parameters

|  Product Parameters |
|  :---:  | ---  |
| Sensor  | OV5647 |
| Resolution | 500万（K230 support up to 1080P with AI）|
| viewing angle   | 72° / 120° | 
| Interface  | 22P-0.5mm FPC |

|  Appearance Parameters |
|  :---:  | ---  |
| Szie  | 6cm/15cm/30cm (Optional length)  |

![module](./img/module/ov5647_2.png)

## USB to Ethernet Cable

Optional accessory, suitable for scenarios where Ethernet connection is required. [Click to Buy>>](https://www.aliexpress.com/item/1005007591736465.html)

[Ethernet Wired Connection Usage Tutorial](../network/ethernet.md)

![module](./img/module/module8.jpg)