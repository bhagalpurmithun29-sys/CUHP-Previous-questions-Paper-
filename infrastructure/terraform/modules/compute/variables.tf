variable "environment" { type = string }
variable "vpc_id" { type = string }
variable "subnet_ids" { type = list(string) }
variable "instance_type" { type = string }
variable "min_capacity" { type = number }
variable "max_capacity" { type = number }
