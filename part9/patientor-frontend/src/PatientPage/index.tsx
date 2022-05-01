import React from 'react';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Diagnosis, Entry as EntryType, Patient } from '../types';
import AddHospitalEntryModal from '../AddHospitalEntryModal';
import { apiBaseUrl } from '../constants';
import { addEntry, useStateValue } from '../state';
import Entry from './Entry';
import AddOccupationalHealthcareEntryEntryModal from '../AddOccupationalHealthcareEntryModal';
import AddHealthCheckEntryModal from '../AddHealthCheckEntry';

interface PatientPageProps {
  patient: Patient | null;
  diagnosis: {[code: string]: Diagnosis} | null;
}

type EntryWithoutId = Omit<EntryType, 'id'>;

const PatientPage = ({patient, diagnosis}: PatientPageProps) => {
  const [, dispatch] = useStateValue();
  const [healthModalOpen, setHealthModalOpen] = React.useState<boolean>(false);
  const [healthCheckModalOpen, sethealthCheckModalOpen] = React.useState<boolean>(false);
  const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openHealthModal = (): void => setHealthModalOpen(true);

  const closeHealthModal = (): void => {
    setHealthModalOpen(false);
    setError(undefined);
  };

  const openHealthCheckModal = (): void => sethealthCheckModalOpen(true);

  const closeHealthCheckModal = (): void => {
    sethealthCheckModalOpen(false);
    setError(undefined);
  };

  const openOccupationalModal = (): void => setOccupationalModalOpen(true);

  const closeOccupationalModal = (): void => {
    setOccupationalModalOpen(false);
    setError(undefined);
  };


  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!patient) {
      setError('patient id is not provided');
      return;
    }

    try {
      const { data: newEntry } = await axios.post<EntryType>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addEntry(patient.id, newEntry));
      closeHealthModal();
      closeHealthCheckModal();
      closeOccupationalModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return (
      <p>Patient not found</p>
    );
  }

  const Style = {
    border: '1px solid #000',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '5px'
  };

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: "1em", marginBottom: "0.5em", fontWeight: "bold" }}>
        {patient.name} {
        patient.gender === 'male' 
          ? <MaleIcon />
          : patient.gender === 'female' 
          ? <FemaleIcon />
          : <TransgenderIcon />
        }
      </Typography>
      {patient.ssn 
        ? <Typography variant="subtitle1" style={{ marginTop: "1em", marginBottom: "0.5em" }}>
            ssn: {patient.ssn}
          </Typography>

        : null}
      <Typography variant="subtitle1" style={{ marginTop: "1em", marginBottom: "0.5em" }}>
        occupation: {patient.occupation}
      </Typography>
      <Typography variant="h6" style={{ marginTop: "1em", marginBottom: "0.5em", fontWeight: "bold" }}>
        entries
      </Typography>

      <div>
        {patient.entries.map((entry) => (
          <div key={entry.id} style={Style}>
              <Entry 
                entry={entry} 
                diagnosis={diagnosis} 
            />
          </div>
        ))}
      </div>
      <AddHospitalEntryModal
        modalOpen={healthModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHealthModal}
      />
      <Button variant="contained" onClick={() => openHealthModal()}>
        Add New Hospital Entry
      </Button>

      <AddHealthCheckEntryModal
        modalOpen={healthCheckModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHealthCheckModal}
      />
      <Button variant="contained" onClick={() => openHealthCheckModal()}>
        Add New Health Check Entry
      </Button>


      <AddOccupationalHealthcareEntryEntryModal
        modalOpen={occupationalModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeOccupationalModal}
      />
      <Button variant="contained" onClick={() => openOccupationalModal()}>
        Add New Occupational Healthcare Entry
      </Button>

    </div>
  );
};

export default PatientPage;