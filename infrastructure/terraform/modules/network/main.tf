# Network Module Main
# Replace 'null_resource' with actual provider resources (e.g., aws_vpc, azurerm_virtual_network)

resource "null_resource" "virtual_network" {
  triggers = {
    vpc_cidr     = var.vpc_cidr
    environment  = var.environment
  }
}

resource "null_resource" "public_subnet" {
  count = length(var.public_subnet_cidrs)
  triggers = {
    cidr = var.public_subnet_cidrs[count.index]
  }
}

resource "null_resource" "private_subnet" {
  count = length(var.private_subnet_cidrs)
  triggers = {
    cidr = var.private_subnet_cidrs[count.index]
  }
}

resource "null_resource" "firewall_rules" {
  triggers = {
    allowed_ports = join(",", var.allowed_ingress_ports)
  }
}

resource "null_resource" "dns_zone" {
  triggers = {
    domain_name = var.domain_name
  }
}
