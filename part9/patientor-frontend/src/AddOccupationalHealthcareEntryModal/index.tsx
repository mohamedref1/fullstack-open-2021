import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddOccupationalHealthcareEntryEntryForm from "./AddOccupationalHealthcareEntryForm";
import { DistributiveOmit, OccupationalHealthcareEntry } from "../types";

export type EntryWithoutId = DistributiveOmit<OccupationalHealthcareEntry, "id">;

interface Props {
  modalOpen: boolean;
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
  error?: string;
}

const AddOccupationalHealthcareEntryEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new occupational healthcare entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddOccupationalHealthcareEntryEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddOccupationalHealthcareEntryEntryModal;
