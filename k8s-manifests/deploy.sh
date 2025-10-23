#!/bin/bash

# Simple Web App - Kubernetes Deployment Script
# This script deploys the application to EKS

echo "🚀 Deploying Simple Web App to EKS..."

# Apply manifests in order
echo "📦 Creating namespace..."
kubectl apply -f 01-namespace.yaml

echo "🔐 Creating secrets..."
kubectl apply -f 06-secret.yaml

echo "🔄 Deploying backend..."
kubectl apply -f 02-backend-deployment.yaml

echo "🔄 Deploying frontend..."
kubectl apply -f 03-frontend-deployment.yaml

echo "🌐 Creating services..."
kubectl apply -f 04-services.yaml

echo "🔗 Creating ingress..."
kubectl apply -f 05-ingress.yaml

echo "⏳ Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/backend-deployment -n simplewebapp
kubectl wait --for=condition=available --timeout=300s deployment/frontend-deployment -n simplewebapp

echo "✅ Deployment complete!"
echo ""
echo "📊 Check deployment status:"
kubectl get pods -n simplewebapp
echo ""
echo "🌐 Get ALB URL:"
kubectl get ingress -n simplewebapp
echo ""
echo "🔍 Check logs:"
echo "kubectl logs -f deployment/backend-deployment -n simplewebapp"
echo "kubectl logs -f deployment/frontend-deployment -n simplewebapp"
