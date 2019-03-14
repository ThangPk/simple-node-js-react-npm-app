pipeline {
     agent {
        docker {
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
              sh 'pip3 install -r ./src/server/requirements.txt'                 
              sh 'python3 ./src/tools/build.py'                           
          }
        }        
    }
}