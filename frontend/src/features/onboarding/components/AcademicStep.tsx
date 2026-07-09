import React from 'react';
import { useForm } from 'react-hook-form';

interface AcademicData {
  department: string;
  course: string;
  semester: number;
  enrollmentYear: number;
}

export const AcademicStep: React.FC<{ onNext: (data: any) => void; initialData?: any }> = ({ onNext, initialData }) => {
  const { register, handleSubmit } = useForm<AcademicData>({
    defaultValues: initialData || {}
  });

  const onSubmit = (data: AcademicData) => {
    // Ensuring numbers are parsed
    const parsedData = {
      ...data,
      semester: Number(data.semester),
      enrollmentYear: Number(data.enrollmentYear)
    };
    onNext({ academicData: parsedData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Academic Setup</h2>
        <p className="text-muted-foreground">This helps us recommend the right question papers and study materials.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Department</label>
          <select 
            {...register('department')}
            className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Course</label>
          <select 
            {...register('course')}
            className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Course</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MCA">MCA</option>
            <option value="M.Sc">M.Sc</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Semester</label>
            <select 
              {...register('semester')}
              className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {[1,2,3,4,5,6,7,8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Enrollment Year</label>
            <select 
              {...register('enrollmentYear')}
              className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {[2020,2021,2022,2023,2024,2025,2026].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-border mt-8 gap-3">
        <button type="button" onClick={() => onNext({ skipped: true })} className="px-6 py-3 bg-muted/50 text-foreground font-semibold rounded-xl hover:bg-muted">
          Skip
        </button>
        <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl">
          Continue
        </button>
      </div>
    </form>
  );
};
