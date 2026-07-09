import { Router } from 'express';
import { paperController } from '../controllers/paper.controller';
import { protect } from '../middlewares/auth.middleware';
import { uploadPaperMiddleware } from '../middlewares/upload.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: QuestionPapers
 *   description: Question Paper Upload and Management
 */

router.use(protect); // All upload actions require authentication

/**
 * @swagger
 * /api/question-papers/draft:
 *   post:
 *     summary: Save an incomplete upload as a draft
 *     tags: [QuestionPapers]
 */
router.post('/draft', uploadPaperMiddleware.single('file'), paperController.uploadDraft);

/**
 * @swagger
 * /api/question-papers/upload:
 *   post:
 *     summary: Submit a complete question paper
 *     tags: [QuestionPapers]
 */
router.post('/upload', uploadPaperMiddleware.single('file'), paperController.submitUpload);

/**
 * @swagger
 * /api/question-papers/{id}:
 *   put:
 *     summary: Update an existing paper or draft
 *     tags: [QuestionPapers]
 */
router.put('/:id', uploadPaperMiddleware.single('file'), paperController.updatePaper);

/**
 * @swagger
 * /api/question-papers/{id}:
 *   delete:
 *     summary: Delete a paper (soft delete)
 *     tags: [QuestionPapers]
 */
router.delete('/:id', paperController.deletePaper);

/**
 * @swagger
 * /api/question-papers/upload/status/{id}:
 *   get:
 *     summary: Check the approval/processing status of a paper
 *     tags: [QuestionPapers]
 */
router.get('/upload/status/:id', paperController.getStatus);

/**
 * @swagger
 * /api/question-papers/processing/{id}/status:
 *   get:
 *     summary: Check the background PDF processing status
 *     tags: [QuestionPapers]
 */
router.get('/processing/:id/status', paperController.getProcessingStatus);

/**
 * @swagger
 * /api/question-papers/processing/{id}/result:
 *   get:
 *     summary: Get the extracted metadata and OCR processing result
 *     tags: [QuestionPapers]
 */
router.get('/processing/:id/result', paperController.getProcessingResult);

export default router;
