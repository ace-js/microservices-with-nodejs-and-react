minikube start
eval $(minikube docker-env)
minikube addons enable ingress
minikube tunnel
