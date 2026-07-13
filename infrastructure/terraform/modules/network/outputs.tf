output "vpc_id" {
  value = "vpc-${var.environment}-placeholder"
}
output "public_subnet_ids" {
  value = [for i in var.public_subnet_cidrs : "subnet-pub-${i}"]
}
output "private_subnet_ids" {
  value = [for i in var.private_subnet_cidrs : "subnet-priv-${i}"]
}
