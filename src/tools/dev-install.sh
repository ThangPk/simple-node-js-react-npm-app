SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null && pwd )"

GIT_PATH="$(dirname "$(dirname "$DIR")")"
ROOT_PATH="$(dirname "$GIT_PATH")"
echo ">>>>> Working directory is at $ROOT_PATH"

echo '>>>>> Pulling the latest code from git..........'
cd $GIT_PATH
git reset --hard
git pull origin master

echo '>>>>> Stopping servers..........'
if [ "$1" = "--pro" ]
then
    sudo systemctl stop vms-api-server
    sudo systemctl stop vms-streaming-server
    sudo systemctl stop vms-human-server
    sudo systemctl stop vms-face-server
    sudo systemctl stop vms-license-plate-server
else
    sudo systemctl stop vms-api-dev-server
    sudo systemctl stop vms-streaming-dev-server
    sudo systemctl stop vms-human-dev-server
    sudo systemctl stop vms-face-dev-server
    sudo systemctl stop vms-license-plate-dev-server
fi

echo '>>>>> Copying the backup configurations..........'
cp $ROOT_PATH/backup/common/orator.yml $GIT_PATH/src/common/db/orator.yml
cp $ROOT_PATH/backup/server/app_config.py $GIT_PATH/src/server/app_config.py
cp $ROOT_PATH/backup/camera-server/app_config.py $GIT_PATH/src/camera-server/app_config.py
cp $ROOT_PATH/backup/human-processor/app_config.py $GIT_PATH/src/human-processor/app_config.py
cp $ROOT_PATH/backup/face-processor/app_config.py $GIT_PATH/src/face-processor/app_config.py
cp $ROOT_PATH/backup/license-plate-processor/app_config.py $GIT_PATH/src/license-plate-processor/app_config.py

echo '>>>>> Compiling the latest code of Administration website..........'
cd $GIT_PATH/src/server/templates/src
npm install
npm run build

echo '>>>>> Installing the requirements for servers..........'
sudo pip3 install -r $GIT_PATH/src/server/requirements.txt
sudo pip3 install -r $GIT_PATH/src/camera-server/requirements.txt
sudo pip3 install -r $GIT_PATH/src/human-processor/requirements.txt
sudo pip3 install -r $GIT_PATH/src/face-processor/requirements.txt
sudo pip3 install -r $GIT_PATH/src/license-plate-processor/requirements.txt

echo '>>>>> Compiling the python server sources............'
cd $GIT_PATH/src/tools
./build.sh

echo '>>>>> Change permission to build folders..........'
sudo chmod -R 777 $GIT_PATH/src/tools/dist

echo '>>>>> Migrating database..........'
cd $GIT_PATH/src/tools/dist/common/db
orator migrate

echo '>>>>> Coping license files..........'
cp -a $ROOT_PATH/backup/server/license/. $GIT_PATH/src/tools/dist/api-server/
cp -a $ROOT_PATH/backup/camera-server/license/. $GIT_PATH/src/tools/dist/streaming-server/
cp -a $ROOT_PATH/backup/human-processor/license/. $GIT_PATH/src/tools/dist/human-processor/
cp -a $ROOT_PATH/backup/face-processor/license/. $GIT_PATH/src/tools/dist/face-processor/
cp -a $ROOT_PATH/backup/license-plate-processor/license/. $GIT_PATH/src/tools/dist/license-plate-processor/

echo '>>>>> Restarting servers..........'
if [ "$1" = "--pro" ]
then
    sudo systemctl start vms-api-server
    sudo systemctl start vms-streaming-server
    sudo systemctl start vms-human-server
    sudo systemctl start vms-face-server
    sudo systemctl start vms-license-plate-server
else
    sudo systemctl start vms-api-dev-server
    sudo systemctl start vms-streaming-dev-server
    sudo systemctl start vms-human-dev-server
    sudo systemctl start vms-face-dev-server
    sudo systemctl start vms-license-plate-dev-server
fi
echo '>>>>> Done!'