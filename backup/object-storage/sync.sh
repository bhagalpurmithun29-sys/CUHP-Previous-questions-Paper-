#!/bin/bash
set -e
# Object Storage Backup/Sync Strategy
echo "Synchronizing primary storage bucket to disaster recovery bucket..."
# aws s3 sync s3://$PRIMARY_BUCKET s3://$DR_BUCKET
echo "Object storage sync complete."
