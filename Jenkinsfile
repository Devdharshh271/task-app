pipeline {
    agent any

    environment {
        DEPLOY_SERVER = "98.130.15.159"
        DEPLOY_USER = "ubuntu"
        PEM_PATH = "/var/lib/jenkins/vpc-key.pem"
    }

    stages {
        stage('Checkout Code') {
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
                sshagent(credentials: ['EC2-Server']) {
                    sh '''
                    echo "🚀 Deploying to EC2 Server..."
                    ssh -o StrictHostKeyChecking=no -i $PEM_PATH $DEPLOY_USER@$DEPLOY_SERVER 'bash -s' <<'EOF'
                    chmod +x ~/deploy.sh
                    ~/deploy.sh
                    EOF
                    '''
                }
            }
        }
    }

    post {
        success {
            emailext(
                subject: "✅ Jenkins Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Good news! Your deployment succeeded.\n\nJob: ${env.JOB_NAME}\nBuild: ${env.BUILD_NUMBER}\nCheck app at http://$DEPLOY_SERVER:3000",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }

        failure {
            emailext(
                subject: "❌ Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build failed! Please check Jenkins console for logs.\n\nJob: ${env.JOB_NAME}\nBuild: ${env.BUILD_NUMBER}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
        }
    }
}
