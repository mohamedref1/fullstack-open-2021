import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddHealthCheckEntryForm from "./HealthCheckEntryForm";
import { DistributiveOmit, HealthCheckEntry } from "../types";

export type EntryWithoutId = DistributiveOmit<HealthCheckEntry, "id">;

interface Props {
  modalOpen: boolean;
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
  error?: string;
}

const AddHealthCheckEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new health check entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddHealthCheckEntryModal;
