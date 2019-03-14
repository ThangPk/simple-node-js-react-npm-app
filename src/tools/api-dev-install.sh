
echo '>>>>> Compiling the latest code of Administration website..........'
cd ./src/server/templates/src
npm install
npm run build

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