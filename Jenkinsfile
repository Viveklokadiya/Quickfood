pipeline {
  agent any

  stages {
    stage('Clone Repository') {
      steps {
        deleteDir()
        git branch: 'devops', url: "https://github.com/Viveklokadiya/Quickfood.git"
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh """
          docker build \
            -t viveklokadiya/quickfood-client:latest \
            -f client/Dockerfile client
        """
      }
    }

    stage('Build Backend Image') {
      steps {
        sh """
          docker build \
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
            docker push viveklokadiya/quickfood-client:latest
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
          sh '''
            export KUBECONFIG="$KUBECONFIG_FILE"
            kubectl set image deployment/frontend-deployment quickfood-frontend=viveklokadiya/quickfood-client:latest -n quickfood
            kubectl set image deployment/backend-deployment quickfood-backend=viveklokadiya/quickfood-server:latest -n quickfood
            kubectl rollout status deployment/frontend-deployment -n quickfood
            kubectl rollout status deployment/backend-deployment -n quickfood
          '''
        }
      }
    }
  }
}
