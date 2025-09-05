import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type RefObject,
} from 'react';
import FieldLabel from './FieldLabel.js';
import TextField from './TextFieldGroup.js';
import FieldError from './FieldError.js';
import { isValidEmail } from './utils.js';

interface FieldValueEntry {
  value: string;
  isValid: boolean;
}

type FieldValues = Record<string, FieldValueEntry>;

interface ContactFormProps {
  onSubmitSuccess: () => void;
}

const fieldValuesDefault: FieldValues = {
  firstName: {
    value: '',
    isValid: true,
  },
  lastName: {
    value: '',
    isValid: true,
  },
  email: {
    value: '',
    isValid: true,
  },
  queryType: {
    value: '',
    isValid: true,
  },
  message: {
    value: '',
    isValid: true,
  },
  consented: {
    value: '',
    isValid: true,
  },
};

/**
 * The contact form component.
 *
 * @param props - The component props.
 * @remarks
 * `props.onSubmitSuccess` - Callback to run on successful form submission.
 * @returns JSX markup for the contact form.
 */
export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const rootEl: RefObject<HTMLFormElement | null> = useRef(null);
  const isInvalidSubmit = useRef(false);
  const [fieldValues, setFieldValues] = useState(fieldValuesDefault);
  const isValidQuery = fieldValues.queryType.isValid;
  const isValidConsent = fieldValues.consented.isValid;

  useEffect(() => {
    // Sets focus on the first invalid input after form submission. Used as a means
    // to provide an audible notification for assistive software users (a11y).
    if (isInvalidSubmit.current && rootEl.current instanceof HTMLFormElement) {
      for (const el of rootEl.current.elements) {
        if (
          (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) &&
          el.name &&
          !fieldValues[el.name].isValid
        ) {
          el.focus();
          break;
        }
      }

      isInvalidSubmit.current = false;
    }
  }, [fieldValues]);

  /**
   * Listener function for the input `change` event. Used primarily
   * to store the values from the user's input.
   *
   * @param evt - Change event object.
   */
  function handleInputChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { target } = evt;

    if (target.name) {
      const { name, value } = target;
      const newFieldValues = structuredClone(fieldValues);
      let fieldValue = value;

      if (name === 'consented' && target instanceof HTMLInputElement) {
        fieldValue = target.checked ? 'yes' : '';
      }

      if (newFieldValues[name].value !== fieldValue) {
        newFieldValues[name].value = fieldValue;
        setFieldValues(newFieldValues);
      }
    }
  }

  /**
   * Listener function for the input `blur` event. Used primarily to strip
   * out extraneous whitespace from the user's input.
   *
   * @param evt - Focus event object.
   */
  function handleInputBlur(evt: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { target } = evt;

    if (target.name) {
      const { name, value } = target;
      const newFieldValues = structuredClone(fieldValues);
      const normalizedValue = value.trim();

      if (newFieldValues[name].value !== normalizedValue) {
        newFieldValues[name].value = normalizedValue;
        setFieldValues(newFieldValues);
      }
    }
  }

  /**
   * Listener function for the form `submit` event. Primarily used
   * for validating the user's input.
   *
   * @param evt - Form event object.
   */
  function handleFormSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    const newFieldValues = structuredClone(fieldValues);

    for (const key of Object.keys(newFieldValues)) {
      let isValid = true;

      // Normalize values for text fields
      newFieldValues[key].value = newFieldValues[key].value.trim();

      // Input value validation
      if (
        (key === 'email' && !isValidEmail(newFieldValues[key].value)) ||
        newFieldValues[key].value === ''
      ) {
        isValid = false;
      }

      newFieldValues[key].isValid = isValid;
    }

    setFieldValues(newFieldValues);

    // Return early if there are validation errors.
    if (Object.values(newFieldValues).some((entry) => !entry.isValid)) {
      isInvalidSubmit.current = true;
      return;
    }

    // Otherwise, reset the form after successful submission.
    if (evt.target instanceof HTMLFormElement) {
      for (const el of evt.target.elements) {
        if (el instanceof HTMLInputElement && el.checked) {
          el.checked = false;
        }
      }
      setFieldValues(fieldValuesDefault);
      onSubmitSuccess();
    }
  }

  return (
    <form
      action="./"
      className="acf-form"
      method="post"
      noValidate
      onSubmit={handleFormSubmit}
      ref={rootEl}
    >
      <div className="acf-form_layout-inline">
        <TextField
          autocomplete="given-name"
          id="first-name"
          isValidValue={fieldValues.firstName.isValid}
          label="First Name"
          name="firstName"
          onInputBlur={handleInputBlur}
          onValueChange={handleInputChange}
          value={fieldValues.firstName.value}
        />

        <TextField
          autocomplete="family-name"
          id="last-name"
          isValidValue={fieldValues.lastName.isValid}
          label="Last Name"
          name="lastName"
          onInputBlur={handleInputBlur}
          onValueChange={handleInputChange}
          value={fieldValues.lastName.value}
        />
      </div>

      <TextField
        autocomplete="email"
        errorMessage="Please enter a valid email address"
        id="email"
        isValidValue={fieldValues.email.isValid}
        label="Email Address"
        name="email"
        onInputBlur={handleInputBlur}
        onValueChange={handleInputChange}
        value={fieldValues.email.value}
      />

      <fieldset className="acf-form_input-container">
        <legend className="acf-form_radio-legend font-style_body-sm">
          Query Type <em>*</em>
        </legend>

        <div className="acf-form_layout-inline condensed">
          <div className="acf-form_radio-container">
            <input
              aria-describedby={!isValidQuery ? 'contact_query_error' : undefined}
              className="acf-form_radio"
              id="contact_query-inquiry"
              name="queryType"
              onChange={handleInputChange}
              required
              type="radio"
              value="inquiry"
            />

            <FieldLabel
              classNameOverride="acf-form_radio-label font-style_body-md"
              htmlFor="query-inquiry"
              isRequired={false}
              label="General Inquiry"
            />
          </div>

          <div className="acf-form_radio-container">
            <input
              aria-describedby={!isValidQuery ? 'contact_query_error' : undefined}
              className="acf-form_radio"
              id="contact_query-support"
              name="queryType"
              onChange={handleInputChange}
              required
              type="radio"
              value="support"
            />

            <FieldLabel
              classNameOverride="acf-form_radio-label font-style_body-md"
              htmlFor="query-support"
              isRequired={false}
              label="Support Request"
            />
          </div>
        </div>

        {!isValidQuery && <FieldError id="query" message="Please select a query type" />}
      </fieldset>

      <TextField
        id="message"
        isMultiline={true}
        isValidValue={fieldValues.message.isValid}
        label="Message"
        name="message"
        onInputBlur={handleInputBlur}
        onValueChange={handleInputChange}
        value={fieldValues.message.value}
      />

      <div className="acf-form_input-container acf-form_consent-container">
        <div className="acf-form_consent">
          <input
            aria-describedby={!isValidConsent ? 'contact_consent_error' : undefined}
            aria-invalid={!isValidConsent}
            className="acf-form_checkbox"
            id="contact_consent"
            name="consented"
            onChange={handleInputChange}
            required
            type="checkbox"
          />

          <FieldLabel htmlFor="consent" label="I consent to being contacted by the team" />
        </div>

        {!isValidConsent && (
          <FieldError
            id="consent"
            message="To submit this form, please consent to being contacted"
          />
        )}
      </div>

      <div className="acf-form_input-container">
        <button
          className="acf-form_btn-submit acf-btn_primary font-style_body-md font-style_bold"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
