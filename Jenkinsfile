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
                sh 'cd ./src/server/templates && npm install && npm start' 
                sh './src/tools/api-dev-install.sh' 
            }
        }        
    }
}