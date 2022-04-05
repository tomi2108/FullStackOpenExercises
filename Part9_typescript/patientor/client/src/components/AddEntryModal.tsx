import { Dialog, DialogContent, DialogTitle, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onSubmit, error, onClose }: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
