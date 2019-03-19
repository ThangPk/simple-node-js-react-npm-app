### On Ubuntu:
- Clone source from git
- Visual Studio Code is installed
- Install Python3
```
    sudo apt-get update
    sudo apt-get -y upgrade
    sudo apt-get install -y python3-pip
```
- Install all dependencies
```
    sudo pip3 install -r requirements.txt
```
- Install extension ms-python.python for VS Code then restart VS Code.
- Install dependencies system modules:
```
    sudo apt-get install python-gi python3-gi

    sudo apt-get install libgstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-doc gstreamer1.0-tools

    sudo apt-get install gir1.2-gst-rtsp-server-1.0
    sudo apt-get install python3-tk

```  
- Install hadoop cluster. Reference:
    https://viblo.asia/p/hadoop-cai-dat-hadoop-tren-ubuntu-phan-1-4dbZNo3qlYM  
    https://viblo.asia/p/hadoop-cai-dat-hadoop-tren-ubuntu-phan-2-eW65GxPjKDO  

- Turn off safe mode of HDFS while testing to prevent the corrupt files

```
    hdfs dfsadmin -safemode leave
```

- Install CUDA:

```
    Download https://developer.nvidia.com/cuda-90-download-archive
    sudo dpkg -i cuda-repo-ubuntu1604-9-0-local_9.0.176-1_amd64.deb
    sudo apt-key add /var/cuda-repo-9-0-local/7fa2af80.pub
    sudo apt-get update
    sudo apt-get install cuda

    Update .bashrc
    export CUDA_HOME=/usr/local/cuda-9.0
    export LD_LIBRARY_PATH=${CUDA_HOME}/lib64:$LD_LIBRARY_PATH

    PATH=${CUDA_HOME}/bin:${PATH}
    export PATH

```

- Install cudnn:

```
    wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1604/x86_64/libcudnn7_7.0.5.15-1+cuda9.0_amd64.deb
    wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1604/x86_64/libcudnn7-dev_7.0.5.15-1+cuda9.0_amd64.deb
    wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1604/x86_64/libnccl2_2.1.4-1+cuda9.0_amd64.deb
    wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1604/x86_64/libnccl-dev_2.1.4-1+cuda9.0_amd64.deb
    sudo dpkg -i cuda-repo-ubuntu1604_9.0.176-1_amd64.deb
    sudo dpkg -i libcudnn7_7.0.5.15-1+cuda9.0_amd64.deb
    sudo dpkg -i libcudnn7-dev_7.0.5.15-1+cuda9.0_amd64.deb
    sudo dpkg -i libnccl2_2.1.4-1+cuda9.0_amd64.deb
    sudo dpkg -i libnccl-dev_2.1.4-1+cuda9.0_amd64.deb
    sudo apt-get update
    sudo apt-get install cuda=9.0.176-1
    sudo apt-get install libcudnn7-dev
    sudo apt-get install libnccl-dev
```
    Reboot the system to reload drivers

- Select launcher 'RTSP Server' configuration and press ^F5 to start
- Build source:
```
    python3 build.py build_ext
```

- Get license request key
```
    python3 request_license.py
```