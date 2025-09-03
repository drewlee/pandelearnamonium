interface TextFieldParams {
  autocomplete: string;
  errorMsg: string;
  fieldLabel: string;
  id: string;
  isValidValue: boolean;
  onValueChange: (name: string, value: string) => void;
  propName: string;
}

export default function TextField({
  autocomplete,
  id,
  isValidValue,
  errorMsg,
  fieldLabel,
  onValueChange,
  propName,
}: TextFieldParams) {
  return (
    <div className="acf-form_input-container">
      <label className="acf-form_label font-style_body-sm" htmlFor={`contact_${id}`}>
        {fieldLabel} <em>*</em>
      </label>

      <input
        type="text"
        className={`acf-form_txt-input${!isValidValue ? ' invalid' : ''}`}
        id={`contact_${id}`}
        autoComplete={autocomplete}
        aria-describedby={!isValidValue ? `contact_${id}_error` : undefined}
        aria-invalid={!isValidValue}
        required
        onChange={(evt) => onValueChange(propName, evt.target.value)}
      />

      {!isValidValue && (
        <p className="acf-form_error" id={`contact_${id}_error`}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}
