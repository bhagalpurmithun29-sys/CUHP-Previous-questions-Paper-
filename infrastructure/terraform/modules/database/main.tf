# Database Module Main

resource "null_resource" "managed_database" {
  triggers = {
    environment    = var.environment
    engine         = var.db_engine
    version        = var.db_version
    instance_class = var.db_instance_class
    storage_gb     = var.db_allocated_storage
    encryption     = "enabled" # Secure Default - Encryption at Rest
  }
}
