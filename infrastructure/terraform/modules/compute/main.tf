# Compute Module Main

resource "null_resource" "load_balancer" {
  triggers = {
    environment = var.environment
    subnet_ids  = join(",", var.subnet_ids)
  }
}

resource "null_resource" "app_cluster" {
  triggers = {
    instance_type = var.instance_type
    min_capacity  = var.min_capacity
    max_capacity  = var.max_capacity
  }
}
