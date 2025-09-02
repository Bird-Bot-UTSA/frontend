# 🚀 GitHub Repository Setup - Step by Step

## 📋 What You Need to Do

I've created the files you need. Follow these steps to set up automatic deployment from your GitHub repository.

## Step 1: Add GitHub Actions Workflow

1. **Go to your GitHub repository**: https://github.com/Bird-Bot-UTSA/frontend
2. **Click "Actions" tab**
3. **Click "New workflow"**
4. **Click "set up a workflow yourself"**
5. **Copy the content from `github-workflow.yml`** (I created this file for you)
6. **Paste it into the editor**
7. **Click "Start commit"**
8. **Commit the file**

## Step 2: Add Dockerfile

1. **Go to your GitHub repository root**
2. **Click "Add file" → "Create new file"**
3. **Name the file**: `Dockerfile`
4. **Copy the content from `github-dockerfile`** (I created this file for you)
5. **Paste it into the editor**
6. **Click "Commit new file"**

## Step 3: Add AWS Secrets

1. **Go to your GitHub repository**
2. **Click "Settings" tab**
3. **Click "Secrets and variables" → "Actions"**
4. **Click "New repository secret"**
5. **Add these two secrets**:

### Secret 1:
- **Name**: `AWS_ACCESS_KEY_ID`
- **Value**: `YOUR_AWS_ACCESS_KEY_ID`

### Secret 2:
- **Name**: `AWS_SECRET_ACCESS_KEY`
- **Value**: `YOUR_AWS_SECRET_ACCESS_KEY`

## Step 4: Test the Deployment

1. **Make a small change** to any file in your GitHub repository
2. **Commit and push** the change
3. **Go to "Actions" tab** to watch the deployment
4. **Wait for it to complete** (about 5-10 minutes)

## 🎯 What Happens Next

Once you complete these steps:

- ✅ **Push code** → **Automatic deployment**
- ✅ **GitHub Actions** builds your Docker image
- ✅ **Pushes to ECR** with unique tag
- ✅ **Deploys to ECS** service
- ✅ **Updates your live app**

## 📊 Your Infrastructure

Your app will be available at:
- **HTTPS URL**: `https://<alb-dns-name>` (from terraform output)
- **ECS Cluster**: `birdbot-cluster`
- **ECS Service**: `birdbot-service`

## 🔧 Files I Created for You

1. **`github-workflow.yml`** - GitHub Actions workflow
2. **`github-dockerfile`** - Dockerfile for your repository
3. **`SETUP-GITHUB-REPO.md`** - This guide

## 🚨 Important Notes

- **Same Infrastructure**: Deploys to your existing ECS setup
- **Automatic**: Every push triggers deployment
- **Secure**: Uses your existing AWS credentials
- **Fast**: Builds and deploys in ~5-10 minutes

## 🎊 Ready to Go!

Complete these 4 steps and your GitHub repository will automatically deploy to your ECS service every time you push code!

**Need help with any step? Let me know!** 🚀
