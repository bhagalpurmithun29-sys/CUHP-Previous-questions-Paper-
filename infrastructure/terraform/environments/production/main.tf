# Production Environment Configuration

module "network" {
  source = "../../modules/network"
  environment = var.environment
  vpc_cidr = var.vpc_cidr
  public_subnet_cidrs = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  allowed_ingress_ports = [443] # Encryption in Transit enforced
  domain_name = "cuhp.edu"
}

module "compute" {
  source = "../../modules/compute"
  environment = var.environment
  vpc_id = module.network.vpc_id
  subnet_ids = module.network.private_subnet_ids
  instance_type = var.instance_type
  min_capacity = 3
  max_capacity = 10
}

module "database" {
  source = "../../modules/database"
  environment = var.environment
  vpc_id = module.network.vpc_id
  subnet_ids = module.network.private_subnet_ids
  db_engine = "postgres"
  db_version = "15"
  db_instance_class = "large"
  db_allocated_storage = 500
}

module "storage" {
  source = "../../modules/storage"
  environment = var.environment
  project_name = "cuhp-qbank"
  enable_versioning = true
}

module "security" {
  source = "../../modules/security"
  environment = var.environment
}

module "monitoring" {
  source = "../../modules/monitoring"
  environment = var.environment
  log_retention_days = 365
}
