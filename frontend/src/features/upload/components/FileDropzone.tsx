import React, { useCallback, useState } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FileDropzone: React.FC<{ onFileSelect: (file: File) => void }> = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragActive ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        >
          <UploadCloud className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Drag & Drop your question paper</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Supports PDF, DOCX (Max 10MB)</p>
          <Button variant="secondary" onClick={() => document.getElementById('file-upload')?.click()}>Browse Files</Button>
          <input id="file-upload" type="file" className="hidden" accept=".pdf,.docx" onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFile(e.target.files[0]);
              onFileSelect(e.target.files[0]);
            }
          }} />
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg"><FileIcon className="w-6 h-6 text-primary" /></div>
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => { setSelectedFile(null); }}><X className="w-4 h-4" /></Button>
        </div>
      )}
    </div>
  );
};
