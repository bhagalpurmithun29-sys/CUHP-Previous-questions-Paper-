import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from 'lucide-react';

interface DeleteSubjectDialogProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  subject: any;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const DeleteSubjectDialog: React.FC<DeleteSubjectDialogProps> = ({
  isOpen, setIsOpen, subject, onConfirm, isDeleting
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the subject <strong className="text-foreground">{subject?.subjectName} ({subject?.subjectCode})</strong>. 
            <br/><br/>
            <span className="text-destructive font-medium">Warning:</span> You cannot delete a subject if it has active Question Papers linked to it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => { e.preventDefault(); onConfirm(); }}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Delete Subject
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
