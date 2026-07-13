class OcrPreprocessingService {
  async preprocessForOcr(buffer: Buffer) {
    // Binarization, contrast maximization, etc.
    return buffer;
  }
}

export const ocrPreprocessingService = new OcrPreprocessingService();
