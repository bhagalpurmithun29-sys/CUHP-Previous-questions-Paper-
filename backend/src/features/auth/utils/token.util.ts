import crypto from 'crypto';

export class TokenUtil {
  /**
   * Generates a secure random crypto token (used for Refresh Tokens, Email Verification, etc.)
   */
  static generateSecureToken(byteLength = 40): string {
    return crypto.randomBytes(byteLength).toString('hex');
  }

  /**
   * Hashes a token using SHA-256 for secure database storage
   */
  static hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Compares a raw token against a hashed token in constant time
   */
  static compareTokens(rawToken: string, hashedToken: string): boolean {
    const hashOfRaw = this.hashToken(rawToken);
    
    // Use timingSafeEqual to prevent timing attacks
    const buffer1 = Buffer.from(hashOfRaw);
    const buffer2 = Buffer.from(hashedToken);
    
    if (buffer1.length !== buffer2.length) {
      return false;
    }
    
    return crypto.timingSafeEqual(buffer1, buffer2);
  }
}
