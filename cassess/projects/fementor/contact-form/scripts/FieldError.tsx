import { type JSX } from 'react';

interface FieldErrorProps {
  id: string;
  message?: string;
}

export default function FieldError({
  id,
  message = 'This field is required',
}: FieldErrorProps): JSX.Element {
  return (
    <p className="acf-form_error" id={`contact_${id}_error`}>
      {message}
    </p>
  );
}
