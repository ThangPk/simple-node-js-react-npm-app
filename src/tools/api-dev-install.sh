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

echo '>>>>> Installing the requirements for servers..........'
sudo pip3 install -r $GIT_PATH/src/server/requirements.txt

echo '>>>>> Compiling the python server sources............'
cd $GIT_PATH/src/tools

echo ">>>>> Compile common package"
touch .module_common
python3 build.py build_ext
rm .module_common

echo ">>>>> Compile API server package"
touch .module_api_server
python3 build.py build_ext
rm .module_api_server

echo '>>>>> Change permission to build folders..........'
sudo chmod -R 777 $GIT_PATH/src/tools/dist

echo '>>>>> Migrating database..........'
cd $GIT_PATH/src/tools/dist/common/db
orator migrate

echo '>>>>> Coping license files..........'
cp -a $ROOT_PATH/backup/server/license/. $GIT_PATH/src/tools/dist/api-server/

echo '>>>>> Restarting servers..........'
sudo systemctl restart vms-api-dev-server
echo '>>>>> Done!'