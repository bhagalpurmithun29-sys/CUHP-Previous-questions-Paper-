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

interface DeleteSemesterDialogProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  semester: any;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const DeleteSemesterDialog: React.FC<DeleteSemesterDialogProps> = ({
  isOpen, setIsOpen, semester, onConfirm, isDeleting
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong className="text-foreground">Semester {semester?.semesterNumber}</strong> for course <strong className="text-foreground">{semester?.courseId?.courseCode}</strong>. 
            <br/><br/>
            <span className="text-destructive font-medium">Warning:</span> You cannot delete a semester if it has active subjects linked to it.
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
            Delete Semester
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
