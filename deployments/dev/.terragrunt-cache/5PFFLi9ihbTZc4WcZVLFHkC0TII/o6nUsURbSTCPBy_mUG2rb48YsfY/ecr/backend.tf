# Generated by Terragrunt. Sig: nIlQXj57tbuaRZEa
terraform {
  backend "s3" {
    bucket         = "chj-terraform-backend-primary-region"
    dynamodb_table = "chj-tf-lock-react-discovery"
    encrypt        = true
    key            = "docker-ecr/terraform-react-discovery.tfstate"
    kms_key_id     = "alias/aws/s3"
    region         = "us-east-1"
  }
}
