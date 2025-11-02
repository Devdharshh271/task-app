pipeline {
  agent any
  environment {
    SSH_CRED = 'deploy-ssh'
    TARGET = 'localhost'
    ARTIFACT = "app-${env.BUILD_NUMBER}.tar.gz"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Package') {
      steps {
        sh "tar -czf ${ARTIFACT} *"
      }
    }

    stage('Deploy') {
      steps {
        sshagent (credentials: [env.SSH_CRED]) {
          sh """
          scp -o StrictHostKeyChecking=no ${ARTIFACT} ubuntu@${TARGET}:/tmp/
          ssh -o StrictHostKeyChecking=no ubuntu@${TARGET} 'bash -s' <<'ENDSSH'
          sudo mkdir -p /var/www/task-app
          sudo tar -xzf /tmp/${ARTIFACT} -C /var/www/task-app
          cd /var/www/task-app
          npm install --production
          pm2 delete task-app || true
          pm2 start server.js --name task-app
          ENDSSH
          """
        }
      }
    }
  }

  post {
    success {
      echo '✅ Build & Deploy success!'
    }
    failure {
      echo '❌ Build failed!'
    }
  }
}
