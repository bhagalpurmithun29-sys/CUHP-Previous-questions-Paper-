# Incident Response Procedures

## Database Node Failure
1. The MongoDB Replica Set will automatically failover. No manual action required immediately.
2. Alert triggers. Operations engineers replace the degraded node to restore full quorum.

## Accidental Data Deletion
1. Initiate a **Partial Recovery** workflow.
2. Restore the latest backup into a temporary staging database.
3. Extract deleted documents and manually patch production database.
