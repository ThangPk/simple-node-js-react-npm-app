pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {                
          steps {  
            dir ('src/tools/') { 
              sh('api-dev-install.sh')
            }                          
          }
        }        
    }
}