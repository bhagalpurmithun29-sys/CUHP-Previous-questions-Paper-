import { OcrQueueService } from '../services/ocr-queue.service';
import { OcrResult } from '../../../models/ocrResult.model';

jest.mock('../../../models/ocrResult.model');

describe('OcrQueueService', () => {
  let queueService: OcrQueueService;
  
  beforeEach(() => {
    queueService = new OcrQueueService();
  });

  it('should queue a paper for OCR processing', async () => {
    const mockRecord = { _id: 'ocr1', paperId: 'paper1', status: 'PENDING' };
    (OcrResult.findOneAndUpdate as jest.Mock).mockResolvedValue(mockRecord);

    const result = await queueService.queuePaperForOcr('paper1');

    expect(result).toEqual(mockRecord);
    expect(OcrResult.findOneAndUpdate).toHaveBeenCalledWith(
      { paperId: 'paper1' },
      { status: 'PENDING', errorMessage: null, 'qualityScore.overallQuality': 0 },
      { upsert: true, new: true }
    );
  });
});
