import { QuestionPaper as Paper } from '../../../models/paper.model';
import { SmartRule } from '../../../interfaces/library.interface';

export class RuleEngineService {
  async evaluateRules(rules: SmartRule[]): Promise<string[]> {
    if (!rules || rules.length === 0) return [];

    const query: any = { status: 'PUBLISHED' };

    rules.forEach(rule => {
      switch (rule.operator) {
        case 'equals':
          query[rule.field] = rule.value;
          break;
        case 'contains':
          query[rule.field] = { $regex: rule.value, $options: 'i' };
          break;
        case 'gt':
          query[rule.field] = { ...query[rule.field], $gt: rule.value };
          break;
        case 'lt':
          query[rule.field] = { ...query[rule.field], $lt: rule.value };
          break;
        case 'in':
          query[rule.field] = { $in: Array.isArray(rule.value) ? rule.value : [rule.value] };
          break;
      }
    });

    const papers = await Paper.find(query).select('_id');
    return papers.map(p => p._id.toString());
  }
}
