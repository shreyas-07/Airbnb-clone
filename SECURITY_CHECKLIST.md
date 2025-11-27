# Security Checklist - Pre-Sharing

This document lists all sensitive information that has been sanitized from the codebase before sharing.

## ✅ Sanitized Files

### 1. AWS Account Information
- **File**: `k8s/helm/airbnb/values.yaml`
  - Replaced AWS account ID `779926948199` with `YOUR_AWS_ACCOUNT_ID`
  
- **File**: `k8s/helm/airbnb/templates/frontend.yaml`
  - Replaced ACM certificate ARN with placeholder `YOUR_AWS_ACCOUNT_ID` and `YOUR_CERTIFICATE_ID`

- **File**: `aws/QUICKSTART.md`
  - Replaced AWS account ID and VPC ID with placeholders

### 2. Network Configuration
- **File**: `aws/network.auto.tfvars`
  - Replaced VPC ID and subnet IDs with placeholders
  - Note: This file is gitignored (`.auto.tfvars`)

### 3. Terraform Configuration
- **File**: `aws/terraform.tfvars`
  - Already contains no sensitive data (only project names)
  - Created `terraform.tfvars.example` as a template

## ✅ Protected Files (Gitignored)

The following files are already in `.gitignore` and will not be shared:

- `*.tfstate` and `*.tfstate.*` (Terraform state files)
- `*.tfvars` (except `*.tfvars.example`)
- `*.auto.tfvars` (auto-generated network config)
- `.env` files in all directories
- `.env.local` and `.env.*.local` files

## 📝 Environment Setup Files Created

Created documentation files to help set up environment variables:

- `backend/ENV_SETUP.md` - Lists all required backend environment variables
- `agent-service/ENV_SETUP.md` - Lists all required agent service environment variables
- `aws/terraform.tfvars.example` - Template for Terraform variables

## ⚠️ Important Notes

1. **Backend `.env` file**: Must be created manually with database URLs, secrets, and API keys
2. **Agent Service `.env` file**: Must be created manually with OpenAI, Anthropic, Supabase, and other API keys
3. **AWS Configuration**: 
   - Replace `YOUR_AWS_ACCOUNT_ID` in Helm values
   - Run `aws/scripts/configure-network.sh` to generate `network.auto.tfvars`
   - Set Terraform variables via environment or `terraform.tfvars`

## 🔍 Verification

Before sharing, ensure:
- ✅ No `.env` files are committed
- ✅ No `*.tfstate` files are committed  
- ✅ No `*.tfvars` files are committed (except examples)
- ✅ All AWS account IDs replaced with placeholders
- ✅ All VPC/subnet IDs replaced with placeholders

## 📋 Next Steps for Recipient

1. Set up AWS credentials: `aws configure`
2. Create `.env` files using the `ENV_SETUP.md` guides
3. Configure Terraform variables (see `aws/QUICKSTART.md`)
4. Run `aws/scripts/configure-network.sh` to generate network config
5. Follow deployment instructions in `README.md`

