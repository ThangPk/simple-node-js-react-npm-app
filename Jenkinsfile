pipeline {
    agent none
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {                
          steps {   
              sh 'pip3 install -r ./src/server/requirements.txt'                 
              sh 'python3 ./src/tools/build.py'                           
          }
        }        
    }
}