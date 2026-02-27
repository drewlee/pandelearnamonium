interface FieldLabelProps {
  classNameOverride?: string;
  htmlFor: string;
  isRequired?: boolean;
  label: string;
}

/**
 * Helper component used for rendering a field label element.
 *
 * @param props - The component props.
 * @remarks
 * - `props.classNameOverride` - Optional class name. Overrides the default value.
 * - `props.htmlFor` - Value for the `for` attribute.
 * - `props.isRequired` - Whether the label corresponds to a required form field.
 * - `props.label` - Text content for the label element.
 * @returns JSX markup for the label element.
 */
export default function FieldLabel({
  classNameOverride = 'acf-form_label font-style_body-sm',
  htmlFor,
  isRequired = true,
  label,
}: FieldLabelProps): React.JSX.Element {
  return (
    <label className={classNameOverride} htmlFor={`contact_${htmlFor}`}>
      {label} {isRequired && <em>*</em>}
    </label>
  );
}
