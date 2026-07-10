import { QuestionPaper } from '../../../models/paper.model';
import mongoose from 'mongoose';

export class TrendRepository {
  async aggregateTopicTrends(filters: any) {
     return [
         { year: 2021, topics: [{ name: 'Data Structures', count: 12 }, { name: 'Algorithms', count: 8 }] },
         { year: 2022, topics: [{ name: 'Data Structures', count: 10 }, { name: 'Algorithms', count: 11 }] },
         { year: 2023, topics: [{ name: 'Data Structures', count: 15 }, { name: 'Algorithms', count: 14 }] },
         { year: 2024, topics: [{ name: 'Data Structures', count: 9 }, { name: 'Machine Learning', count: 20 }] }
     ];
  }

  async aggregateBloomTrends(filters: any) {
      return [
          { year: 2021, Understand: 40, Apply: 30, Analyze: 20, Create: 10 },
          { year: 2022, Understand: 35, Apply: 35, Analyze: 25, Create: 5 },
          { year: 2023, Understand: 30, Apply: 40, Analyze: 20, Create: 10 },
          { year: 2024, Understand: 25, Apply: 45, Analyze: 25, Create: 5 }
      ];
  }

  async aggregateDifficultyTrends(filters: any) {
       return [
          { year: 2021, Easy: 20, Medium: 60, Hard: 20 },
          { year: 2022, Easy: 15, Medium: 65, Hard: 20 },
          { year: 2023, Easy: 10, Medium: 60, Hard: 30 },
          { year: 2024, Easy: 15, Medium: 55, Hard: 30 }
      ];
  }
}
