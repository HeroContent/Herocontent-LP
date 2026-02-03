# PostHog Implementation for AWS Deployment

## Overview

PostHog is already integrated into the codebase. This document outlines what's needed to enable PostHog when deploying to AWS.

## Current Implementation Status

✅ **Already Implemented:**
- PostHog JavaScript SDK (`posthog-js`) installed
- Client-side initialization in `app/instrumentation-client.ts`
- Event tracking functions in `lib/analytics.ts`
- Next.js instrumentation hook enabled in `next.config.mjs`

## Required Environment Variables

To enable PostHog on AWS, you need to set these environment variables in your AWS deployment:

### Required Variables

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://your-posthog-instance.com
```

### Variable Details

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_POSTHOG_KEY` | Your PostHog project API key | `phc_xxxxxxxxxxxxx` | Yes |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog instance URL | `https://app.posthog.com` or `https://posthog.yourdomain.com` | Yes |

**Note:** The `NEXT_PUBLIC_` prefix is required for Next.js to expose these variables to the client-side code.

## AWS Deployment Options

### Option 1: Use PostHog Cloud (Recommended)

**Simplest approach** - Use PostHog's hosted service:

1. **Sign up for PostHog Cloud** at https://posthog.com
2. **Get your API key** from PostHog project settings
3. **Set environment variables in AWS:**
   - `NEXT_PUBLIC_POSTHOG_KEY` = Your PostHog project key
   - `NEXT_PUBLIC_POSTHOG_HOST` = `https://app.posthog.com` (or your region-specific URL)

**AWS Services Needed:**
- None (uses PostHog's infrastructure)
- Just configure environment variables in your AWS deployment platform

### Option 2: Self-Host PostHog on AWS

If you want to self-host PostHog on AWS, you'll need:

#### AWS Infrastructure Requirements

1. **Compute Resources:**
   - **EC2 Instances** or **ECS/Fargate** for PostHog services
   - **Minimum:** 2 vCPU, 4GB RAM (for small deployments)
   - **Recommended:** 4 vCPU, 8GB RAM (for production)

2. **Database:**
   - **PostgreSQL** (RDS or self-managed)
     - Minimum: db.t3.medium (2 vCPU, 4GB RAM)
     - Recommended: db.t3.large (2 vCPU, 8GB RAM) or larger
   - **Redis** (ElastiCache or self-managed)
     - Minimum: cache.t3.micro (0.5GB)
     - Recommended: cache.t3.small (1.37GB) or larger

3. **Storage:**
   - **S3 Bucket** for object storage (events, recordings, exports)
   - **EBS Volumes** for database storage

4. **Networking:**
   - **VPC** with public/private subnets
   - **Application Load Balancer (ALB)** or **CloudFront** for HTTPS
   - **Security Groups** for access control
   - **Route 53** (optional) for custom domain

5. **Container Services (if using containers):**
   - **ECS** or **EKS** cluster
   - **ECR** for container images

#### Deployment Methods

**A. Docker Compose on EC2:**
- Single EC2 instance running PostHog via Docker Compose
- Good for: Development, small deployments
- Cost: ~$50-100/month

**B. ECS/Fargate:**
- Containerized PostHog on AWS ECS
- Good for: Production, scalable deployments
- Cost: ~$200-500/month

**C. EKS (Kubernetes):**
- PostHog on Kubernetes
- Good for: Large-scale, enterprise deployments
- Cost: ~$300-1000+/month

#### Self-Hosting Setup Steps

1. **Set up AWS infrastructure:**
   ```bash
   # Create RDS PostgreSQL instance
   # Create ElastiCache Redis cluster
   # Create S3 bucket
   # Set up VPC and networking
   ```

2. **Deploy PostHog:**
   - Use PostHog's official deployment guides
   - Configure environment variables for PostHog services
   - Set up SSL/TLS certificates

3. **Configure your Next.js app:**
   - Set `NEXT_PUBLIC_POSTHOG_HOST` to your PostHog instance URL
   - Set `NEXT_PUBLIC_POSTHOG_KEY` to your project key

## AWS Deployment Platform Configuration

### AWS Amplify

1. **Go to AWS Amplify Console**
2. **Select your app**
3. **Navigate to:** App settings → Environment variables
4. **Add variables:**
   ```
   NEXT_PUBLIC_POSTHOG_KEY=your_key_here
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```
5. **Redeploy** your application

### AWS Elastic Beanstalk

1. **Via EB CLI:**
   ```bash
   eb setenv NEXT_PUBLIC_POSTHOG_KEY=your_key_here \
            NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

2. **Via Console:**
   - Go to Elastic Beanstalk → Your Environment → Configuration
   - Software → Environment properties
   - Add the variables and save

### AWS ECS/Fargate

1. **Update task definition:**
   ```json
   {
     "environment": [
       {
         "name": "NEXT_PUBLIC_POSTHOG_KEY",
         "value": "your_key_here"
       },
       {
         "name": "NEXT_PUBLIC_POSTHOG_HOST",
         "value": "https://app.posthog.com"
       }
     ]
   }
   ```

2. **Or use AWS Systems Manager Parameter Store:**
   - Store secrets in Parameter Store
   - Reference in task definition

### AWS Lambda (Serverless)

1. **Set environment variables in Lambda function:**
   ```bash
   aws lambda update-function-configuration \
     --function-name your-function-name \
     --environment Variables='{
       "NEXT_PUBLIC_POSTHOG_KEY":"your_key_here",
       "NEXT_PUBLIC_POSTHOG_HOST":"https://app.posthog.com"
     }'
   ```

2. **Or use AWS Secrets Manager** for sensitive values

### AWS EC2 (Manual Deployment)

1. **SSH into your EC2 instance**
2. **Edit your `.env` file or systemd service:**
   ```bash
   sudo nano /etc/environment
   # Add:
   NEXT_PUBLIC_POSTHOG_KEY=your_key_here
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```
3. **Restart your application**

## Security Best Practices

### 1. Use AWS Secrets Manager (Recommended)

For production deployments, store PostHog keys in AWS Secrets Manager:

```typescript
// Example: Fetch from Secrets Manager at build time
import { SecretsManager } from '@aws-sdk/client-secrets-manager'

const client = new SecretsManager({ region: 'us-east-1' })
const secret = await client.getSecretValue({ SecretId: 'posthog-credentials' })
```

### 2. Use Parameter Store

Store non-sensitive configuration in Systems Manager Parameter Store:

```bash
aws ssm put-parameter \
  --name "/app/posthog/host" \
  --value "https://app.posthog.com" \
  --type "String"
```

### 3. IAM Roles

- Use IAM roles instead of access keys when possible
- Grant minimal permissions needed
- Use separate roles for different environments (dev/staging/prod)

### 4. Environment Separation

- Use different PostHog projects for dev/staging/production
- Set different environment variables per environment
- Never commit API keys to version control

## Verification Steps

After deploying, verify PostHog is working:

1. **Check browser console:**
   - Open browser DevTools → Console
   - Look for PostHog initialization messages
   - No errors should appear

2. **Test event tracking:**
   - Open contact form (should trigger `lead_form_open`)
   - Submit form (should trigger `lead_form_submit`)
   - Check PostHog dashboard for events

3. **Network tab:**
   - Open DevTools → Network
   - Filter for "posthog" or your PostHog host
   - Verify events are being sent

## Troubleshooting

### PostHog Not Initializing

**Issue:** PostHog events not appearing

**Solutions:**
1. Verify environment variables are set correctly
2. Check that variables start with `NEXT_PUBLIC_`
3. Ensure variables are available at build time (for static exports) or runtime
4. Check browser console for errors
5. Verify PostHog host URL is accessible from your domain

### CORS Errors

**Issue:** CORS errors when sending events

**Solutions:**
1. If self-hosting, configure CORS in PostHog settings
2. Add your domain to PostHog's allowed origins
3. Check security groups/firewall rules

### Events Not Appearing in PostHog

**Issue:** Events sent but not visible in dashboard

**Solutions:**
1. Check PostHog project settings
2. Verify API key is correct
3. Check PostHog instance logs
4. Ensure events are being sent to correct project

## Cost Estimation

### PostHog Cloud
- **Free tier:** Up to 1M events/month
- **Paid:** Starting at $0.000225 per event after free tier
- **Recommended for:** Most use cases

### Self-Hosted on AWS
- **Small deployment:** ~$100-200/month
- **Medium deployment:** ~$300-500/month
- **Large deployment:** ~$500-1000+/month

## Additional Resources

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Self-Hosting Guide](https://posthog.com/docs/self-host)
- [AWS Amplify Environment Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)
- [AWS ECS Task Definitions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html)

## Summary Checklist

- [ ] Choose PostHog Cloud or self-hosted option
- [ ] Obtain PostHog API key
- [ ] Set `NEXT_PUBLIC_POSTHOG_KEY` environment variable in AWS
- [ ] Set `NEXT_PUBLIC_POSTHOG_HOST` environment variable in AWS
- [ ] Deploy application
- [ ] Verify PostHog initialization in browser console
- [ ] Test event tracking
- [ ] Verify events appear in PostHog dashboard
- [ ] Set up monitoring/alerts (optional)

---

**Last Updated:** January 2026
