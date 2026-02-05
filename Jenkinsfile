pipeline {
  agent any

  stages {
    stage('Clone Repository') {
      steps {
        deleteDir()
        git branch: 'devops', url: "https://github.com/Viveklokadiya/Quickfood.git"
        script {
          env.IMAGE_TAG = "build-${env.BUILD_NUMBER}"
        }
      }
    }

    stage('Prepare Env Files') {
      steps {
        withCredentials([
          file(credentialsId: 'quickfood-client-env', variable: 'CLIENT_ENV_FILE'),
          file(credentialsId: 'quickfood-server-env', variable: 'SERVER_ENV_FILE')
        ]) {
          sh '''
            cp "$CLIENT_ENV_FILE" client/.env
            cp "$SERVER_ENV_FILE" server/.env
          '''
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh """
          docker build \
            -t viveklokadiya/quickfood-client:${IMAGE_TAG} \
            -t viveklokadiya/quickfood-client:latest \
            -f client/Dockerfile client
        """
      }
    }

    stage('Build Backend Image') {
      steps {
        sh """
          docker build \
            -t viveklokadiya/quickfood-server:${IMAGE_TAG} \
            -t viveklokadiya/quickfood-server:latest \
            -f server/Dockerfile server
        """
      }
    }

    stage('Push Images') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-credentials',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push viveklokadiya/quickfood-client:${IMAGE_TAG}
            docker push viveklokadiya/quickfood-client:latest
            docker push viveklokadiya/quickfood-server:${IMAGE_TAG}
            docker push viveklokadiya/quickfood-server:latest
            docker logout
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(
          credentialsId: 'quickfood-kubeconfig',
          variable: 'KUBECONFIG_FILE'
        )]) {
          sh """
            export KUBECONFIG="\$KUBECONFIG_FILE"
            kubectl set image deployment/frontend-deployment quickfood-frontend=viveklokadiya/quickfood-client:${IMAGE_TAG} -n quickfood
            kubectl set image deployment/backend-deployment quickfood-backend=viveklokadiya/quickfood-server:${IMAGE_TAG} -n quickfood
            kubectl rollout status deployment/frontend-deployment -n quickfood
            kubectl rollout status deployment/backend-deployment -n quickfood
          """
        }
      }
    }
  }
}
