import crypto from 'crypto';
import bcrypt from 'bcrypt';

export class RecoveryCodeService {
  /**
   * Generates 10 secure backup codes
   */
  generateCodes(count: number = 10): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      // Format: XXXX-XXXX
      const raw = crypto.randomBytes(4).toString('hex').toUpperCase();
      codes.push(`${raw.slice(0, 4)}-${raw.slice(4)}`);
    }
    return codes;
  }

  /**
   * Hashes codes for secure database storage
   */
  async hashCodes(codes: string[]): Promise<string[]> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await Promise.all(codes.map(code => bcrypt.hash(code.replace('-', ''), salt)));
    return hashed;
  }

  /**
   * Verifies a plain text code against the stored hashed array
   */
  async verifyAndConsumeCode(code: string, hashedCodes: string[]): Promise<{ isValid: boolean, remainingCodes: string[] }> {
    const normalizedCode = code.replace('-', '');
    
    for (let i = 0; i < hashedCodes.length; i++) {
      const match = await bcrypt.compare(normalizedCode, hashedCodes[i]);
      if (match) {
        // Remove the consumed code
        const remaining = [...hashedCodes];
        remaining.splice(i, 1);
        return { isValid: true, remainingCodes: remaining };
      }
    }
    
    return { isValid: false, remainingCodes: hashedCodes };
  }
}

export const recoveryCodeService = new RecoveryCodeService();
