export class AuditLogService {
  async log(data: any): Promise<void> {
    // Placeholder implementation for the mock AuditLogService
    console.log('[AuditLogService] logged event:', data.action || data);
  }
}
