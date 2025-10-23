# Kubernetes Manifests for Simple Web App

This directory contains Kubernetes manifests for deploying the Simple Web App to EKS.

## Files Overview

- `01-namespace.yaml` - Creates the `simplewebapp` namespace
- `02-backend-deployment.yaml` - Backend deployment (Node.js/Express)
- `03-frontend-deployment.yaml` - Frontend deployment (React/Nginx)
- `04-services.yaml` - ClusterIP services for frontend and backend
- `05-ingress.yaml` - ALB Ingress for external access
- `06-secret.yaml` - Database credentials secret
- `deploy.sh` - Deployment script

## Prerequisites

1. EKS cluster running
2. kubectl configured and working
3. Docker images pushed to ECR
4. ALB Controller installed (if not, install it first)

## Deployment

### Quick Deploy
```bash
cd k8s-manifests
./deploy.sh
```

### Manual Deploy
```bash
kubectl apply -f 01-namespace.yaml
kubectl apply -f 06-secret.yaml
kubectl apply -f 02-backend-deployment.yaml
kubectl apply -f 03-frontend-deployment.yaml
kubectl apply -f 04-services.yaml
kubectl apply -f 05-ingress.yaml
```

## Configuration

### Database Connection
Update the database password in `06-secret.yaml`:
```bash
echo -n "your-actual-password" | base64
```

### Environment Variables
The backend deployment includes:
- `NODE_ENV=production`
- `PORT=3001`
- `DATABASE_URL` pointing to RDS

## Monitoring

### Check Pod Status
```bash
kubectl get pods -n simplewebapp
```

### Check Services
```bash
kubectl get services -n simplewebapp
```

### Check Ingress
```bash
kubectl get ingress -n simplewebapp
```

### View Logs
```bash
kubectl logs -f deployment/backend-deployment -n simplewebapp
kubectl logs -f deployment/frontend-deployment -n simplewebapp
```

## Accessing the Application

After deployment, get the ALB URL:
```bash
kubectl get ingress -n simplewebapp
```

The application will be available at:
- Frontend: `http://ALB-URL/`
- Backend API: `http://ALB-URL/api`

## Troubleshooting

### Pods Not Starting
```bash
kubectl describe pod <pod-name> -n simplewebapp
```

### Service Issues
```bash
kubectl describe service <service-name> -n simplewebapp
```

### Ingress Issues
```bash
kubectl describe ingress simplewebapp-ingress -n simplewebapp
```
