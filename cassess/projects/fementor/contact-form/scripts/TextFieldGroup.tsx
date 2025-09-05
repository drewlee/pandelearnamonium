import { type ChangeEvent, type FocusEvent, type JSX } from 'react';
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
  onInputBlur: (evt: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onValueChange: (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
}

/**
 * Helper component used for rendering a text field and its associated label and error.
 *
 * @param props - The component props.
 * @remarks
 * - `props.autocomplete` - Value for the `autocomplete` attribute.
 * - `props.errorMessage` - The associated error element's text content.
 * - `props.id` - ID attribute value to target the elements.
 * - `props.isMultiline` - Whether the text field is single line (`input`) or multiline (`textarea`).
 * - `props.isValidValue` - Whether the input's value is of valid format.
 * - `props.label` - Text content for the associated label element.
 * - `props.name` - Value for the `name` attribute.
 * - `props.onInputBlur` - Listener function for the input's `blur` event.
 * - `props.inValueChange` - Listener function for the input's `change` event.
 * - `props.value` - The input's `value` attribute.
 * @returns JSX markup for the text field.
 */
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
