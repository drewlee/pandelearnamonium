interface FieldErrorProps {
  id: string;
  message?: string;
}

/**
 * Helper component used for rendering a form validation error.
 *
 * @param props - The component props.
 * @remarks
 * - `props.id` - ID attribute value to target the element.
 * - `props.message` - The error element's text content.
 * @returns JSX markup for the form validation error.
 */
export default function FieldError({
  id,
  message = 'This field is required',
}: FieldErrorProps): React.JSX.Element {
  return (
    <p className="acf-form_error" id={`contact_${id}_error`}>
      {message}
    </p>
  );
}
