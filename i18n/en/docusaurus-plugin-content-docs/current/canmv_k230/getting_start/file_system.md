---
sidebar_position: 5
---

# File System

The CanMV K230 system has a built-in file system. The CanMV drive letter that appears on Computer after powering on is it.

![file_system1](./img/file_system/file_system1.png)

After opening it, you can see that there are two drive letters, namely `sdcard` and `data`.

![file_system1](./img/file_system/file_system1_1.png)

Some MicroPython library files and official sample program files are stored here. The official sample code is located in the `CanMV\sdcard\examples\` directory，**Due to the lag in the update of some codes in the USB flash drive, it may not work. Please refer to the code in the 01 technology data package for this online tutorial**::

![file_system1](./img/file_system/file_system2.png)

- `data` is the remaining available space on the user's SD card.

The file system has a wide range of uses. It can store your own MicroPython code files, as well as pictures, audio, video and other materials.