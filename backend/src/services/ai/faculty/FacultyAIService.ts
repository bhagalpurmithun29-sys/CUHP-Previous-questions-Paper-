import { aiGateway } from '../AiGateway';
import { knowledgeService } from '../../rag/KnowledgeService';
import { AppError } from '../../../utils/AppError';

export interface GenerateQuestionsDto {
  subject: string;
  examType: 'INTERNAL' | 'MID_SEM' | 'END_SEM' | 'QUIZ' | 'ASSIGNMENT' | 'PRACTICAL';
  questionType: 'SHORT_ANSWER' | 'LONG_ANSWER' | 'MCQ' | 'CASE_STUDY' | 'PROGRAMMING' | 'NUMERICAL';
  topic: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  count: number;
}

export class FacultyAIService {
  /**
   * Generates questions using RAG for grounding to ensure alignment with past repository papers.
   */
  async generateQuestions(dto: GenerateQuestionsDto, userId: string) {
    const ragContext = await knowledgeService.query(`Questions related to \${dto.topic} in \${dto.subject}`, userId);
    
    const prompt = `
      You are an expert Academic Assessment Designer for \${dto.subject}.
      Generate \${dto.count} \${dto.questionType} questions for a \${dto.examType} examination.
      Difficulty Level: \${dto.difficulty}.
      Topic: \${dto.topic}.
      
      Use the following historical context to align with past patterns, but create original questions:
      \${ragContext.answer}
      
      Output strictly in valid JSON format:
      {
        "questions": [
          {
            "text": "The question text",
            "marks": number,
            "difficulty": "EASY|MEDIUM|HARD",
            "bloomsTaxonomy": "REMEMBER|UNDERSTAND|APPLY|ANALYZE|EVALUATE|CREATE",
            "courseOutcome": "CO1|CO2|CO3|CO4",
            "suggestedAnswer": "Brief key points expected"
          }
        ]
      }
    `;

    const response = await aiGateway.chat('gemini', {
      messages: [
        { role: 'system', content: 'You are an academic assessment generation engine. Return JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    }, userId);

    return this.parseJsonResponse(response.content);
  }

  /**
   * Analyzes a set of questions for coverage, difficulty, and taxonomy.
   */
  async analyzePaper(questions: any[], subject: string, userId: string) {
    const prompt = `
      Analyze this draft question paper for \${subject}.
      
      Questions:
      \${JSON.stringify(questions, null, 2)}
      
      Analyze and return strictly valid JSON:
      {
        "difficultyDistribution": { "EASY": number, "MEDIUM": number, "HARD": number },
        "bloomsDistribution": { "REMEMBER": number, "UNDERSTAND": number, "APPLY": number, "ANALYZE": number, "EVALUATE": number, "CREATE": number },
        "syllabusCoverage": {
          "coveredUnits": ["string"],
          "missingUnits": ["string"],
          "coveragePercentage": number,
          "suggestions": ["string"]
        }
      }
    `;

    const response = await aiGateway.chat('gemini', {
      messages: [
        { role: 'system', content: 'You are an academic assessment analyst. Return JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    }, userId);

    return this.parseJsonResponse(response.content);
  }

  /**
   * Generates a marking rubric for a set of questions.
   */
  async generateRubric(questions: any[], userId: string) {
    const prompt = `
      Create a detailed evaluation rubric for these questions:
      \${JSON.stringify(questions, null, 2)}
      
      Return strictly valid JSON:
      {
        "rubrics": [
          {
            "questionText": "string",
            "totalMarks": number,
            "criteria": [
              {
                "description": "string",
                "marksAllocated": number
              }
            ]
          }
        ]
      }
    `;

    const response = await aiGateway.chat('gemini', {
      messages: [
        { role: 'system', content: 'You are an academic evaluation rubric generator. Return JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    }, userId);

    return this.parseJsonResponse(response.content);
  }

  private parseJsonResponse(content: string) {
    let clean = content.trim();
    if (clean.startsWith('\`\`\`json')) clean = clean.replace(/\`\`\`json/g, '');
    if (clean.startsWith('\`\`\`')) clean = clean.replace(/\`\`\`/g, '');
    try {
      return JSON.parse(clean);
    } catch (e) {
      console.error("JSON Parse Error on AI output", clean);
      throw new AppError('AI generated invalid format. Please try again.', 500);
    }
  }
}

export const facultyAIService = new FacultyAIService();
