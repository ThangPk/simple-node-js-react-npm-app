pipeline {
    agent none
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {       
          agent {
              docker {
                  image 'python:3.7-alpine' 
              }
          }         
          steps {                 
              sh 'python3 ./src/tools/build.py ./src/tools/build_ext'                           
          }
        }        
    }
}