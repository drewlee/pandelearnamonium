import { type ChangeEvent, type JSX } from 'react';
import FieldLabel from './FieldLabel.js';
import FieldError from './FieldError.js';

interface TextFieldProps {
  autocomplete?: string;
  errorMessage?: string;
  id: string;
  isMultiline?: boolean;
  isValidValue: boolean;
  label: string;
  name: string;
  onInputBlur: (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onValueChange: (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
}

export default function TextFieldGroup({
  autocomplete,
  errorMessage,
  id,
  isMultiline = false,
  isValidValue,
  label,
  name,
  onInputBlur,
  onValueChange,
  value,
}: TextFieldProps): JSX.Element {
  return (
    <div className="acf-form_input-container">
      <FieldLabel htmlFor={id} label={label} />

      {isMultiline ? (
        <textarea
          aria-describedby={!isValidValue ? `contact_${id}_error` : undefined}
          aria-invalid={!isValidValue}
          className={`acf-form_txt-input font-style_body-md${!isValidValue ? ' invalid' : ''}`}
          id={`contact_${id}`}
          name={name}
          onBlur={onInputBlur}
          onChange={onValueChange}
          required
          value={value}
        ></textarea>
      ) : (
        <input
          aria-describedby={!isValidValue ? `contact_${id}_error` : undefined}
          aria-invalid={!isValidValue}
          autoComplete={autocomplete}
          className={`acf-form_txt-input${!isValidValue ? ' invalid' : ''}`}
          id={`contact_${id}`}
          name={name}
          onBlur={onInputBlur}
          onChange={onValueChange}
          required
          type="text"
          value={value}
        />
      )}

      {!isValidValue && <FieldError id={id} message={errorMessage} />}
    </div>
  );
}
