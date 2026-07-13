variable "environment" { default = "production" }
variable "vpc_cidr" { default = "10.2.0.0/16" }
variable "public_subnet_cidrs" { default = ["10.2.1.0/24", "10.2.2.0/24", "10.2.3.0/24"] }
variable "private_subnet_cidrs" { default = ["10.2.10.0/24", "10.2.11.0/24", "10.2.12.0/24"] }
variable "instance_type" { default = "standard-large" }
