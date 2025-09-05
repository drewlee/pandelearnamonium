import { type JSX } from 'react';

interface FieldLabelProps {
  classNameOverride?: string;
  htmlFor: string;
  isRequired?: boolean;
  label: string;
}

export default function FieldLabel({
  classNameOverride = 'acf-form_label font-style_body-sm',
  htmlFor,
  isRequired = true,
  label,
}: FieldLabelProps): JSX.Element {
  return (
    <label className={classNameOverride} htmlFor={`contact_${htmlFor}`}>
      {label} {isRequired && <em>*</em>}
    </label>
  );
}
