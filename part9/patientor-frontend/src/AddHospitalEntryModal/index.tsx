import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { DistributiveOmit, HospitalEntry } from "../types";

export type EntryWithoutId = DistributiveOmit<HospitalEntry, "id">;

interface Props {
  modalOpen: boolean;
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
  error?: string;
}

const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new hospital entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddHospitalEntryModal;
