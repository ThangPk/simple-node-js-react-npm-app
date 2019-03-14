pipeline {
    agent {
        docker {
            image 'python:3.5.1'
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
              sh './src/tools/api-dev-install.sh' 
          }
        }        
    }
}