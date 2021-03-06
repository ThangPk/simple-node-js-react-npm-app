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

echo '>>>>> Copying the backup configurations..........'
cp $ROOT_PATH/backup/common/orator.yml $GIT_PATH/src/common/db/orator.yml
cp $ROOT_PATH/backup/face-processor/app_config.py $GIT_PATH/src/face-processor/app_config.py

echo '>>>>> Installing the requirements for servers..........'
sudo pip3 install -r $GIT_PATH/src/face-processor/requirements.txt

echo '>>>>> Compiling the python server sources............'
cd $GIT_PATH/src/tools


echo ">>>>> Compile common package"
touch .module_common
python3 build.py build_ext
rm .module_common

echo ">>>>> Compile Face processing server package"
touch .module_face_processing_server
python3 build.py build_ext
rm .module_face_processing_server

echo '>>>>> Change permission to build folders..........'
sudo chmod -R 777 $GIT_PATH/src/tools/dist

echo '>>>>> Migrating database..........'
cd $GIT_PATH/src/tools/dist/common/db
orator migrate

echo '>>>>> Coping license files..........'
cp -a $ROOT_PATH/backup/face-processor/license/. $GIT_PATH/src/tools/dist/face-processor/

echo '>>>>> Restarting servers..........'
sudo systemctl restart vms-face-dev-server
echo '>>>>> Done!'