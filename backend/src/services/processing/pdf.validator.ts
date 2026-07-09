import { AppError } from '../../utils/AppError';

export class PDFValidator {
  private readonly MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
  private readonly MIN_PAGES = 1;
  private readonly MAX_PAGES = 500;

  /**
   * Validates the binary header to ensure it's a valid PDF structure
   */
  public validateHeader(buffer: Buffer): boolean {
    if (buffer.length < 5) return false;
    const header = buffer.subarray(0, 5).toString('ascii');
    return header === '%PDF-';
  }

  /**
   * Checks for signs of corruption by looking for the EOF marker
   */
  public validateIntegrity(buffer: Buffer): boolean {
    // A standard PDF ends with %%EOF within the last 1024 bytes
    const tail = buffer.subarray(Math.max(0, buffer.length - 1024)).toString('ascii');
    return tail.includes('%%EOF');
  }

  /**
   * Placeholder to detect if the PDF is password protected/encrypted
   */
  public isEncrypted(buffer: Buffer): boolean {
    // In reality, this requires parsing the PDF dictionary for /Encrypt
    const content = buffer.subarray(0, Math.min(buffer.length, 5000)).toString('ascii');
    return content.includes('/Encrypt');
  }

  /**
   * Full validation suite run before processing
   */
  public validate(buffer: Buffer, pageCount: number): void {
    if (buffer.length === 0) {
      throw new AppError('PDF file is empty.', 400);
    }

    if (buffer.length > this.MAX_FILE_SIZE) {
      throw new AppError(`PDF exceeds maximum allowed size of ${this.MAX_FILE_SIZE / (1024 * 1024)}MB.`, 400);
    }

    if (!this.validateHeader(buffer)) {
      throw new AppError('Invalid PDF file signature.', 400);
    }

    if (!this.validateIntegrity(buffer)) {
      throw new AppError('Corrupted PDF file detected. Missing EOF marker.', 400);
    }

    if (this.isEncrypted(buffer)) {
      throw new AppError('Encrypted or password-protected PDFs are not allowed.', 400);
    }

    if (pageCount < this.MIN_PAGES || pageCount > this.MAX_PAGES) {
      throw new AppError(`PDF page count (${pageCount}) is outside allowed limits (${this.MIN_PAGES}-${this.MAX_PAGES}).`, 400);
    }
  }
}

export const pdfValidator = new PDFValidator();
