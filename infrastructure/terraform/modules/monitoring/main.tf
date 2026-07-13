# Monitoring Module Main

resource "null_resource" "log_group" {
  triggers = {
    name           = "/cuhp/${var.environment}/application"
    retention_days = var.log_retention_days
  }
}

resource "null_resource" "alerts" {
  triggers = {
    cpu_threshold = 80
    environment   = var.environment
  }
}
