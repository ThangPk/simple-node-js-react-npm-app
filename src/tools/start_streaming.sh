SRC_PATH=~/vms-build
BUILD_API=OFF
BUILD_AI=OFF
BUILD_SERVER=ON
BUILD_STREAMING=ON

echo '>>>>> Pulling the latest code from git..........'
cd $SRC_PATH/build
git reset --hard
git pull origin master

echo '>>>>> Copying the backup configurations..........'
cp -a $SRC_PATH/backup/server/config/. $SRC_PATH/build/src/server/config/
cp -a $SRC_PATH/backup/camera-server/config/. $SRC_PATH/build/src/camera-server/config/
cp -a $SRC_PATH/backup/ai-processing-server/config/. $SRC_PATH/build/src/ai-processing-server/config/

if [ $BUILD_API = ON ]  ; then
echo '>>>>> Compiling the latest code of Administration website..........'
cd $SRC_PATH/build/src/server/templates/src
npm install
npm run build
fi
if [ $BUILD_SERVER = ON ]  ; then
echo '>>>>> Compiling the python server sources............'
echo '>>>>> Installing the requirements for servers..........'
sudo pip3 install -r $SRC_PATH/build/src/server/build/requirements.txt
cd $SRC_PATH/build/src/server
python3 build.py build_ext
fi

if [ $BUILD_STREAMING= ON ]  ; then
echo '>>>>> Compiling the python streaming eserver sources............'
cd $SRC_PATH/build/src/camera-server
sudo pip3 install -r $SRC_PATH/build/src/camera-server/build/requirements.txt
python3 build.py build_ext

fi

if [ $BUILD_ai = ON ]  ; then
echo '>>>>> Compiling the python ai sources............'
sudo pip3 install -r $SRC_PATH/build/src/ai-processing-server/build/requirements.txt
cd $SRC_PATH/build/src/ai-processing-server
python3 build.py build_ext
fi

echo '>>>>> Migrating database..........'
cd $SRC_PATH/build/src/server/build
python3 db_tool.py migrate --path db/migrations

echo '>>>>> Coping license files..........'
cp -a $SRC_PATH/backup/server/license/. $SRC_PATH/build/src/server/build/
cp -a $SRC_PATH/backup/camera-server/license/. $SRC_PATH/build/src/camera-server/build/
cp -a $SRC_PATH/backup/ai-processing-server/license/. $SRC_PATH/build/src/ai-processing-server/build/

echo '>>>>> Change permission to build folders..........'
sudo chmod a+rwx $SRC_PATH/build/src/server/build
sudo chmod a+rwx $SRC_PATH/build/src/camera-server/build
sudo chmod a+rwx $SRC_PATH/build/src/ai-processing-server/build
echo '>>>>> Stop services..........'
if [ $BUILD_API= ON ]  ; then
sudo systemctl stop vms-api-server
fi

if [ $BUILD_STREAMING= ON ]  ; then
sudo systemctl stop vms-streaming-server
fi
if [ $BUILD_AI= ON ]  ; then
sudo systemctl stop vms-ai-processing-server
fi


echo '>>>>> Reload services..........'
sudo systemctl daemon-reload
echo '>>>>> Restarting servers..........'

if [ $BUILD_API= ON ]  ; then
sudo systemctl start vms-api-server
fi

if [ $BUILD_STREAMING= ON ]  ; then
sudo systemctl start vms-streaming-server
fi
if [ $BUILD_AI= ON ]  ; then
sudo systemctl start vms-ai-processing-server
fi

echo '>>>>> Done!'
