import * as crypto from 'crypto';

class IntegrityVerificationService {
  generateChecksum(buffer: Buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  verifyChecksum(buffer: Buffer, expectedChecksum: string) {
    const currentChecksum = this.generateChecksum(buffer);
    return currentChecksum === expectedChecksum;
  }
}

export const integrityVerificationService = new IntegrityVerificationService();
