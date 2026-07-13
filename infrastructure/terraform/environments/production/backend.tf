terraform {
  # Remote State Placeholder
  # backend "s3" {
  #   bucket = "cuhp-terraform-state-prod"
  #   key    = "infrastructure/terraform.tfstate"
  #   region = "us-east-1"
  # }
  backend "local" {
    path = "terraform.tfstate"
  }
}
