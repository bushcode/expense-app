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
import { Icons } from "./Icons";

interface DeleteExpenseProps {
  openDialog: boolean;
  isDeleting: boolean;
  onDelete: () => void;
  toggleModal: () => void;
}

export default function DeleteExpense({
  openDialog,
  onDelete,
  isDeleting,
  toggleModal,
}: DeleteExpenseProps) {
  return (
    <>
      <AlertDialog open={openDialog} onOpenChange={toggleModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this expense?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 focus:ring-red-600"
              onClick={() => onDelete()}
            >
              {isDeleting ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
