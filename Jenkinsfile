pipeline {
    agent {
        docker {
            image 'python:2-alpine'
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {                
          steps {   
              sh 'pip install -r ./src/server/requirements.txt'   
              sh 'touch .module_common'
              sh 'python ./src/tools/build.py ./src/tools/build_ext'
              sh 'rm .module_common'              
          }
        }        
    }
}