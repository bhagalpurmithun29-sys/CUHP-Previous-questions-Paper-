import React, { useCallback, useState } from 'react';
import { UploadCloud, FileType, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onFileParsed: (data: any[], fileName: string) => void;
  accept?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileParsed, accept = ".csv" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extremely basic native CSV parser for demonstration
  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) throw new Error('File is empty or missing headers');
    
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj: any, header, index) => {
        obj[header] = values[index]?.trim() || '';
        return obj;
      }, {});
    });
  };

  const processFile = async (file: File) => {
    setError(null);
    if (!file.name.endsWith('.csv')) {
      setError('Currently only .csv files are supported in this demo mode.');
      return;
    }

    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      onFileParsed(parsedData, file.name);
    } catch (err: any) {
      setError(`Failed to parse file: ${err.message}`);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-accent/30'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <UploadCloud className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Drag & Drop your file here</h3>
      <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
        Supports CSV files exported from the standard CUHP templates. Maximum file size 10MB.
      </p>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => document.getElementById('fileUpload')?.click()}>
          <FileType className="w-4 h-4 mr-2" /> Browse Files
        </Button>
        <input 
          type="file" 
          id="fileUpload" 
          className="hidden" 
          accept={accept} 
          onChange={(e) => e.target.files && processFile(e.target.files[0])} 
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-start text-sm">
          <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
