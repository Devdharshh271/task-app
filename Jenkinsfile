pipeline {
    agent any

    environment {
        SSH_USER = 'ubuntu'
        SSH_HOST = '18.60.54.125'
        APP_DIR = '/home/ubuntu/task-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Devdharshh271/task-app.git'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'EC2-Server',
                        transfers: [
                            sshTransfer(
                                sourceFiles: '**/*',
                                removePrefix: '',
                                remoteDirectory: '/home/ubuntu/task-app',
                                execCommand: '''
                                    cd /home/ubuntu/task-app
                                    npm install
                                    pm2 delete all || true
                                    pm2 start server.js --name task-app
                                    pm2 save
                                '''
                            )
                        ]
                    )
                ])
            }
        }
    }

    post {
        success {
            emailext (
                to: 'YOUR_EMAIL_HERE',
                subject: "SUCCESS: Jenkins Pipeline Build #${BUILD_NUMBER}",
                body: "The build was successful!"
            )
        }
        failure {
            emailext (
                to: 'YOUR_EMAIL_HERE',
                subject: "FAILURE: Jenkins Pipeline Build #${BUILD_NUMBER}",
                body: "The build failed. Please check Jenkins logs."
            )
        }
    }
}
