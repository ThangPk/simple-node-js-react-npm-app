
echo '>>>>> Compiling the latest code of Administration website..........'
cd ./src/server/templates/src
npm install
npm run build

echo '>>>>> Installing the requirements for servers..........'
sudo pip3 install -r ./src/server/requirements.txt

echo '>>>>> Compiling the python server sources............'
cd ./src/tools

echo ">>>>> Compile common package"
touch .module_common
python3 build.py build_ext
rm .module_common

echo ">>>>> Compile API server package"
touch .module_api_server
python3 build.py build_ext
rm .module_api_server

echo '>>>>> Change permission to build folders..........'
sudo chmod -R 777 $./src/tools/dist

echo '>>>>> Migrating database..........'
cd ./src/tools/dist/common/db
orator migrate

echo '>>>>> Coping license files..........'
cp -a ./backup/server/license/. ./src/tools/dist/api-server/

echo '>>>>> Restarting servers..........'
sudo systemctl restart vms-api-dev-server
echo '>>>>> Done!'