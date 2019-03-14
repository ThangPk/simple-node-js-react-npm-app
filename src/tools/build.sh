SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null && pwd )"
cd $DIR

echo ">>>>> Compile common package"
touch .module_common
python3 build.py build_ext
rm .module_common

echo ">>>>> Compile API server package"
touch .module_api_server
python3 build.py build_ext
rm .module_api_server

echo ">>>>> Compile streaming server package"
touch .module_streaming_server
python3 build.py build_ext
rm .module_streaming_server

echo ">>>>> Compile Human processing server package"
touch .module_human_processing_server
python3 build.py build_ext
rm .module_human_processing_server

echo ">>>>> Compile Face processing server package"
touch .module_face_processing_server
python3 build.py build_ext
rm .module_face_processing_server

echo ">>>>> Compile License plate processing server package"
touch .module_license_plate_processing_server
python3 build.py build_ext
rm .module_license_plate_processing_server

echo ">>>>> All packages are compiled at $DIR/dist folder"