# Security Module Main

resource "null_resource" "iam_roles" {
  triggers = {
    environment = var.environment
    policy      = "least_privilege" # Secure Defaults Placeholder
  }
}

resource "null_resource" "encryption_keys" {
  triggers = {
    purpose = "data-at-rest"
  }
}
