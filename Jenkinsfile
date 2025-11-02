pipeline {
    agent any

    stages {
        stage('Pull from GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/Devdharshh271/task-app.git'
            }
        }

        stage('Install Dependencies') {
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
                                    nohup node server.js > app.log 2>&1 &
                                '''
                            )
                        ],
                        verbose: true
                    )
                ])
            }
        }
    }
}
