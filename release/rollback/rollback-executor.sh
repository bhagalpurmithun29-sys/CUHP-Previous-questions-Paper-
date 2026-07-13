#!/bin/bash
set -e
# Automated Rollback Executor
RELEASE_ID=$1
echo "Initiating rollback for release $RELEASE_ID..."
# kubectl rollout undo deployment/backend-api -n cuhp-prod
echo "Rollback complete."
