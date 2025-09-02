# GitHub Repository CI/CD Setup

## 🔗 Connecting Your GitHub Repo to ECS

Your GitHub repository at [https://github.com/Bird-Bot-UTSA/frontend.git](https://github.com/Bird-Bot-UTSA/frontend.git) can be connected to your ECS deployment for automatic updates.

## 📋 Setup Steps

### Step 1: Add the Workflow to Your GitHub Repository

1. **Copy the workflow file** to your GitHub repository:
   - Copy `.github/workflows/deploy-frontend-github.yml` to your GitHub repo
   - Place it in `.github/workflows/` directory

2. **Or create it directly in GitHub**:
   - Go to your GitHub repository
   - Click "Actions" tab
   - Click "New workflow"
   - Copy the content from `deploy-frontend-github.yml`

### Step 2: Add Dockerfile to Your GitHub Repository

Make sure your GitHub repository has a `Dockerfile` in the root directory. If it doesn't exist, copy it from your local project:

```dockerfile
# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm","run","start"]
```

### Step 3: Add AWS Secrets to GitHub Repository

Go to your GitHub repository settings:

1. **Repository Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** and add:

```
AWS_ACCESS_KEY_ID: YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY: YOUR_AWS_SECRET_ACCESS_KEY
```

### Step 4: Test the Deployment

1. **Make a small change** to any file in your GitHub repository
2. **Commit and push** the change
3. **Go to "Actions" tab** to watch the deployment
4. **Wait for it to complete** (about 5-10 minutes)

## 🚀 How It Works

### Automatic Deployment Process:

1. **Push Code** to your GitHub repository (main/master branch)
2. **GitHub Actions** automatically triggers
3. **Builds** new Docker image with your changes
4. **Pushes** image to ECR with unique tag (Git commit SHA)
5. **Deploys** to ECS service
6. **Updates** your live app

### What Gets Deployed:

- **ECR Repository**: `birdbot-frontend`
- **ECS Cluster**: `birdbot-cluster`
- **ECS Service**: `birdbot-service`
- **ALB URL**: `https://<alb-dns-name>` (from terraform output)

## 🧪 Testing the Deployment

1. **Make a change** to your code in the GitHub repository
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. **Watch the deployment** in GitHub Actions tab
4. **Check your app** at the ALB URL

## 📊 Monitoring

- **GitHub Actions**: Check the Actions tab in your repository
- **ECS Console**: Monitor service health in AWS ECS console
- **CloudWatch Logs**: View application logs at `/ecs/birdbot`

## 🔧 Current Infrastructure

Your ECS infrastructure is already set up with:
- ✅ **ECR Repository**: `birdbot-frontend`
- ✅ **ECS Cluster**: `birdbot-cluster`
- ✅ **ECS Service**: `birdbot-service`
- ✅ **ALB with HTTPS**: Ready for production
- ✅ **IAM Roles**: Proper permissions configured

## 🎯 Benefits

- ✅ **Automatic Deployments**: Push code → Live app updates
- ✅ **Zero Downtime**: Rolling deployments
- ✅ **Version Control**: Each deployment tagged with Git commit
- ✅ **Rollback Capability**: Easy to revert to previous versions
- ✅ **Build Logs**: Full visibility in GitHub Actions

## 🔄 Workflow Differences

### Local Repository (Current):
- Structure: `math-ai/frontend/`
- Workflow: `deploy-frontend.yml`
- Builds from: `frontend/` directory

### GitHub Repository:
- Structure: Root directory is frontend code
- Workflow: `deploy-frontend-github.yml`
- Builds from: Root directory

## 🚨 Important Notes

1. **Same Infrastructure**: Both workflows deploy to the same ECS service
2. **Image Tags**: GitHub uses Git commit SHA, local uses `v1`
3. **Task Definition**: GitHub creates dynamic task definition
4. **Environment**: Both use the same environment variables

## 🎊 Ready to Deploy!

Once you've added the workflow and secrets to your GitHub repository:

1. **Push any change** to trigger the first deployment
2. **Watch GitHub Actions** for the build process
3. **Visit your ALB URL** to see the updated app
4. **Future pushes** will automatically deploy

Your GitHub repository will now automatically deploy to your ECS infrastructure! 🚀