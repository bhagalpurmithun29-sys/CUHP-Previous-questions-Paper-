variable "environment" { type = string }
variable "vpc_cidr" { type = string }
variable "public_subnet_cidrs" { type = list(string) }
variable "private_subnet_cidrs" { type = list(string) }
variable "allowed_ingress_ports" { type = list(number) }
variable "domain_name" { type = string }
