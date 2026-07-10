import { RuleEngineService } from '../services/rule-engine.service';
import { QuestionPaper } from '../../../models/paper.model';

jest.mock('../../../models/paper.model');

describe('RuleEngineService', () => {
  let ruleEngine: RuleEngineService;

  beforeEach(() => {
    ruleEngine = new RuleEngineService();
  });

  it('should return empty array if no rules provided', async () => {
    const result = await ruleEngine.evaluateRules([]);
    expect(result).toEqual([]);
  });

  it('should build correct query for equals operator', async () => {
    QuestionPaper.find = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue([{ _id: '1' }, { _id: '2' }])
    });

    const result = await ruleEngine.evaluateRules([
      { field: 'subjectId', operator: 'equals', value: 'CS101' }
    ]);

    expect(QuestionPaper.find).toHaveBeenCalledWith({
      status: 'PUBLISHED',
      subjectId: 'CS101'
    });
    expect(result).toEqual(['1', '2']);
  });
});
