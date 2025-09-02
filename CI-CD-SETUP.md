# CI/CD Setup Guide

## 🚀 Automatic Deployment Setup

Your GitHub Actions workflow is now configured to automatically deploy your frontend to ECS whenever you push changes to your repository.

## 📋 Setup Steps

### 1. Add AWS Secrets to GitHub Repository

Go to your GitHub repository and add these secrets:

**Repository Settings → Secrets and variables → Actions → New repository secret**

Add these secrets:

```
AWS_ACCESS_KEY_ID: YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY: YOUR_AWS_SECRET_ACCESS_KEY
```

### 2. How It Works

The workflow will automatically trigger when you:
- Push to `main` or `master` branch
- Make changes to files in the `frontend/` directory

### 3. What Happens During Deployment

1. **Build**: Creates a new Docker image with your latest code
2. **Push**: Uploads the image to ECR with a unique tag (Git commit SHA)
3. **Deploy**: Updates the ECS service with the new image
4. **Verify**: Waits for the service to be stable

### 4. Your Current Deployment

- **Public URL**: http://54.80.34.68:3000
- **ECS Cluster**: birdbot-cluster
- **ECS Service**: birdbot-service
- **ECR Repository**: birdbot-frontend

## 🔄 Testing the Deployment

1. Make a change to your frontend code
2. Commit and push to your repository:
   ```bash
   git add .
   git commit -m "Update frontend"
   git push origin main
   ```
3. Go to your GitHub repository → Actions tab to watch the deployment
4. Once complete, visit http://54.80.34.68:3000 to see your changes

## 📊 Monitoring

- **GitHub Actions**: Check the Actions tab in your repository
- **ECS Console**: Monitor service health in AWS ECS console
- **CloudWatch Logs**: View application logs at `/ecs/birdbot`

## 🔧 Troubleshooting

If deployment fails:
1. Check GitHub Actions logs
2. Verify AWS secrets are correctly set
3. Check ECS service events in AWS console
4. Review CloudWatch logs for application errors

## 🎯 Next Steps

Once this is working, you can:
- Add environment-specific deployments (staging/production)
- Set up custom domains with Route 53
- Add SSL certificates with ACM
- Implement blue-green deployments
