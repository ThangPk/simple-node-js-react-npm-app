pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {                
          steps {   
              sh '.src/tools/api-dev-install.sh'                               
          }
        }        
    }
}