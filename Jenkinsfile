pipeline {
    agent any
    environment { 
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh './src/tools/api-dev-install.sh'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver') { 
            steps {
                sh './jenkins/scripts/deliver.sh' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh './jenkins/scripts/kill.sh' 
            }
        }
    }
}