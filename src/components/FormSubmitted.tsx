import { CheckCircle } from "@mui/icons-material";
import { Button } from "@mui/material";

export type FormSubmittedProps = {
  onReturn: () => void;
};

const FormSubmitted = ({ onReturn }: FormSubmittedProps) => {
  return (
    <div className="flex max-w-xs flex-col place-items-center gap-2">
      <CheckCircle color="success" fontSize="large" />
      <span>Student Successfully Added!</span>
      <Button onClick={onReturn}>Add Another</Button>
    </div>
  );
};

export default FormSubmitted;
