# Storage Module Main

resource "null_resource" "object_storage_bucket" {
  triggers = {
    bucket_name = "${var.project_name}-${var.environment}-assets"
    versioning  = var.enable_versioning
    encryption  = "AES256" # Encryption at Rest Placeholder
  }
}
