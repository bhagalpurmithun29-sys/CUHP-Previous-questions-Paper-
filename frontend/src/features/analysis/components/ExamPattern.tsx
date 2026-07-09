import React from 'react';
import { ExamPattern as ExamPatternType } from '../hooks/usePaperAnalysis';

export const ExamPattern: React.FC<{ data: ExamPatternType[] }> = ({ data }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Exam Pattern</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Section</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Questions</th>
              <th className="px-4 py-3 rounded-tr-lg">Marks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{item.section}</td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3">{item.questionCount}</td>
                <td className="px-4 py-3 font-semibold text-primary">{item.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
