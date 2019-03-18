from setuptools import setup
from setuptools.extension import Extension
from Cython.Build import cythonize
from pathlib import Path
from Cython.Distutils import build_ext
from distutils.dir_util import copy_tree

import shutil, glob, os

def normalize_dir(dir):
    if dir.endswith('/'):
        return dir
    return dir + '/'

def check_path(path, dir_arrs):
    for dir_item in dir_arrs:
        if normalize_dir(path).replace(Config.SOURCE_DIR, '').startswith(normalize_dir(dir_item)):
            return True
    return False

class Config():
    APP_FOLDER = None
    OUTPUT_DIR = None
    WORKING_DIR = None
    INCLUDED_FILES = []
    INCLUDED_DIRS = []
    SOURCE_DIR = None
    BUILD_FOLDER = 'build'
    EXCLUDED_DIRS = []
    DESTINATION_DIR = None

class CopyInitFileBuildExt(build_ext):
    def run(self):
        build_ext.run(self)
        Config.OUTPUT_DIR = os.path.join(Config.WORKING_DIR, os.path.basename(self.build_lib))

        print('Copying included files to output: ' + Config.OUTPUT_DIR)
        for filename in Config.INCLUDED_FILES:
            self.copy_file(filename, Config.OUTPUT_DIR)

        print('Copying included folders to output: ' + Config.OUTPUT_DIR)
        for folder in Config.INCLUDED_DIRS:
            self.copy_dir(folder, Config.OUTPUT_DIR)

        init_files = glob.glob(Config.SOURCE_DIR + '**/__init__.py', recursive=True)
        print('Copying __init__.py to output: ' + Config.OUTPUT_DIR)
        for filename in init_files:
            container = normalize_dir(os.path.dirname(os.path.realpath(filename)))
            if check_path(container, [Config.BUILD_FOLDER]) or \
               check_path(container, Config.EXCLUDED_DIRS) or \
               check_path(container, Config.INCLUDED_DIRS):
                continue

            filename = filename.replace(Config.SOURCE_DIR, '')
            self.copy_file(filename, Config.OUTPUT_DIR)

        compiled_init_files = glob.glob(normalize_dir(Config.OUTPUT_DIR) + '**/__init__.*.so', recursive=True)
        print('Deleting compiled __init__.*.so files from output: ' + Config.OUTPUT_DIR)
        for filename in compiled_init_files:
            os.remove(filename)

        print('Copy all files & folders in the output to destination dir')

        if os.path.exists(Config.DESTINATION_DIR):
            shutil.rmtree(Config.DESTINATION_DIR)

        copy_tree(Config.OUTPUT_DIR, Config.DESTINATION_DIR)
        # shutil.rmtree(Config.WORKING_DIR)

    def copy_file(self, path, output_dir):
        shutil.copyfile(os.path.join(Config.SOURCE_DIR, path), os.path.join(output_dir, path))

    def copy_dir(self, path, output_dir):
        shutil.copytree(os.path.join(Config.SOURCE_DIR, path), os.path.join(output_dir, path))

def build():
    if Config.OUTPUT_DIR != None and os.path.exists(Config.OUTPUT_DIR):
        shutil.rmtree(Config.OUTPUT_DIR)
        os.makedirs(Config.OUTPUT_DIR)

    ext_modules = []
    scanned_folders = []
    for dirpath, dirs, files in os.walk(Config.SOURCE_DIR):
        # if dirpath == '/home/thanhpham/Projects/vms/src/common/video_processor/video_processing/face_recognition':
        #     print('check_path(dirpath, Config.EXCLUDED_DIRS) = ' + str(check_path(dirpath, Config.EXCLUDED_DIRS)))
        #     print('check_path(dirpath, Config.INCLUDED_DIRS) = ' + str(check_path(dirpath, Config.INCLUDED_DIRS)))
        if check_path(dirpath, Config.EXCLUDED_DIRS) or check_path(dirpath, Config.INCLUDED_DIRS):
            continue

        dirpath = normalize_dir(dirpath)
        if len(glob.glob(dirpath + '*.py')) == 0:
            continue

        if dirpath == Config.SOURCE_DIR:
            pass
        else:
            ext_modules.append(Extension(dirpath.replace(Config.SOURCE_DIR, '').replace('/', '.') + '*', 
                                         [dirpath + '/*.py']))
            scanned_folders.append(dirpath)

    setup(
        ext_modules=cythonize(
            ext_modules,
            build_dir=Config.BUILD_FOLDER,
            compiler_directives=dict(
                always_allow_keywords=True
            )),
        cmdclass=dict(
            build_ext=CopyInitFileBuildExt
        ),
        packages=[]
    )

    print('Clean up the geneated C files in source folder')
    for scanned_folder in scanned_folders:
        for file in os.listdir(scanned_folder):
            if file.endswith('.c'):
                os.remove(os.path.join(scanned_folder, file))

Config.APP_FOLDER = os.path.dirname(os.path.realpath(__file__))
Config.WORKING_DIR = normalize_dir(Config.APP_FOLDER + '/' + Config.BUILD_FOLDER)
if os.path.exists(Config.WORKING_DIR):
    shutil.rmtree(Config.WORKING_DIR)

from sys import argv
if len(argv) == 2 and argv[1] == 'build_ext':
    if os.path.exists(Config.APP_FOLDER + '/.module_common'):
        print('Build common packages..................................................................')
        Config.SOURCE_DIR = normalize_dir(os.path.dirname(Config.APP_FOLDER) + '/common')
        Config.DESTINATION_DIR = normalize_dir(Config.APP_FOLDER) + 'dist/common'
        Config.EXCLUDED_DIRS = ['.vscode', '__pycache__', 
                                'utils/rtspServer',
                                'video_processor/video_processing/face',
                                'video_processor/video_processing/test']
        Config.INCLUDED_FILES = ['video_processor/video_processing/detection/pallete',
                                 'video_processor/core/stream.m3u8']
        Config.INCLUDED_DIRS = ['db',
                                'video_processor/video_processing/detection/models', 
                                'video_processor/video_processing/detection/data', 
                                'video_processor/video_processing/detection/test', 
                                'video_processor/video_processing/object_tracking/model_data',
                                'video_processor/video_processing/object_tracking/feature_extract/checkpoint',
                                'video_processor/video_processing/object_tracking/tools/resources/networks',
                                'video_processor/video_processing/face_recog/models']
        build()
        shutil.rmtree(Config.WORKING_DIR)
    elif os.path.exists(Config.APP_FOLDER + '/.module_api_server'):
        print('Build API server..................................................................')
        Config.SOURCE_DIR = normalize_dir(os.path.dirname(Config.APP_FOLDER) + '/server')
        Config.DESTINATION_DIR = normalize_dir(Config.APP_FOLDER) + 'dist/api-server'
        Config.EXCLUDED_DIRS = ['.vscode', '__pycache__', 'app_env', 'templates']
        Config.INCLUDED_FILES = ['logging.conf', 
                                'requirements.txt',
                                'app.py',
                                'initializer.py',
                                'request_license.py',
                                'app_config.py']
        Config.INCLUDED_DIRS = ['templates/build',
                                'templates/samples']
        build()
        shutil.rmtree(Config.WORKING_DIR)
    elif os.path.exists(Config.APP_FOLDER + '/.module_streaming_server'):
        print('Build Streaming server..................................................................')
        Config.SOURCE_DIR = normalize_dir(os.path.dirname(Config.APP_FOLDER) + '/camera-server')
        Config.DESTINATION_DIR = normalize_dir(Config.APP_FOLDER) + 'dist/streaming-server'
        Config.EXCLUDED_DIRS = ['.vscode', '__pycache__', 'app_env']
        Config.INCLUDED_FILES = ['logging.conf', 
                                'requirements.txt',
                                'app.py',
                                'initializer.py',
                                'request_license.py',
                                'app_config.py',
                                'stream.m3u8']
        Config.INCLUDED_DIRS = []
        build()
        shutil.rmtree(Config.WORKING_DIR)
    elif os.path.exists(Config.APP_FOLDER + '/.module_human_processing_server'):
        print('Build Human Processing server..................................................................')
        Config.SOURCE_DIR = normalize_dir(os.path.dirname(Config.APP_FOLDER) + '/human-processor')
        Config.DESTINATION_DIR = normalize_dir(Config.APP_FOLDER) + 'dist/human-processor'
        Config.EXCLUDED_DIRS = ['.vscode', '__pycache__', 'app_env']
        Config.INCLUDED_FILES = ['app_config.py',
                                 'app.py',
                                 'human_agent_launcher.py',
                                 'initializer.py',
                                 'logging.conf', 
                                 'request_license.py', 
                                 'requirements.txt']
        Config.INCLUDED_DIRS = []
        build()
        shutil.rmtree(Config.WORKING_DIR)
    elif os.path.exists(Config.APP_FOLDER + '/.module_face_processing_server'):
        print('Build Face Processing server..................................................................')
        Config.SOURCE_DIR = normalize_dir(os.path.dirname(Config.APP_FOLDER) + '/face-processor')
        Config.DESTINATION_DIR = normalize_dir(Config.APP_FOLDER) + 'dist/face-processor'
        Config.EXCLUDED_DIRS = ['.vscode', '__pycache__', 'app_env']
        Config.INCLUDED_FILES = ['app_config.py',
                                 'app.py',
                                 'face_agent_launcher.py',
                                 'initializer.py',
                                 'logging.conf', 
                                 'request_license.py', 
                                 'requirements.txt']
        Config.INCLUDED_DIRS = []
        build()
        shutil.rmtree(Config.WORKING_DIR)
    elif os.path.exists(Config.APP_FOLDER + '/.module_license_plate_processing_server'):
        print('Build License Plate Processing server..................................................................')
        Config.SOURCE_DIR = normalize_dir(os.path.dirname(Config.APP_FOLDER) + '/license-plate-processor')
        Config.DESTINATION_DIR = normalize_dir(Config.APP_FOLDER) + 'dist/license-plate-processor'
        Config.EXCLUDED_DIRS = ['.vscode', '__pycache__', 'app_env']
        Config.INCLUDED_FILES = ['app_config.py',
                                 'app.py',
                                 'lic_plate_agent_launcher.py',
                                 'initializer.py',
                                 'logging.conf', 
                                 'request_license.py', 
                                 'requirements.txt']
        Config.INCLUDED_DIRS = []
        build()
        shutil.rmtree(Config.WORKING_DIR)