pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {                
          steps {   
              sh 'cd src/tools && ls && api-dev-install.sh'                               
          }
        }        
    }
}