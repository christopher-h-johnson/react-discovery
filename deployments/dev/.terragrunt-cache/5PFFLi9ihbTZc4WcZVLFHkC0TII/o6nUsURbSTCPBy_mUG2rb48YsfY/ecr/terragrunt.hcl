terraform {
  source = "${get_parent_terragrunt_dir()}/../../modules//ecr"
}

locals {
  common_vars = yamldecode(file(find_in_parent_folders("common_vars.yaml")))
  region = {
    name   = "us-east-1"
    abbr   = "ue1"
    vpc_id = "vpc-0ccafea89e711a3fc"
  }

  aws_account_id = "177981160483"
  github_iam_role = "Github-OIDC-ECR"
  bucket_key  = "docker-ecr/terraform-${ local.common_vars.project_name }.tfstate"
  bucket_name = "chj-terraform-backend-primary-region"
  table_name = "chj-tf-lock-${ local.common_vars.project_name }"
}

inputs = {
  repository_name = "christopher-h-johnson_react-discovery"
  iam_role = "arn:aws:iam::${ local.aws_account_id }:role/${ local.github_iam_role }'"
  aws_account_id = local.aws_account_id
  lifecycle_policy = "${get_parent_terragrunt_dir()}/../../modules//ecr/policy.json"
}

remote_state {
  backend  = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    encrypt        = true
    bucket         = local.bucket_name
    key            = local.bucket_key
    region         = local.region.name
    kms_key_id     = "alias/aws/s3"
    dynamodb_table = local.table_name
  }
  disable_init = tobool(get_env("TERRAGRUNT_DISABLE_INIT", "false"))
}
