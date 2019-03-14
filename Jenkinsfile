pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {                
          steps {   
              sh 'cd src/tools && api-dev-install.sh'                               
          }
        }        
    }
}