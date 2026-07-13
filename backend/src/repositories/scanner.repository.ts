class ScannerRepository {
  async logScan(userId: string, metadata: any) {
    // Save metadata to database (tracking usage, OCR readiness, etc.)
    return { scanId: `scan_\${Date.now()}`, ...metadata };
  }

  async getScanStatus(userId: string, scanId: string) {
    return { scanId, status: 'UPLOADED_AND_READY' };
  }
}

export const scannerRepository = new ScannerRepository();
