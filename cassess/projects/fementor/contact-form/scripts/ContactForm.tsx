import { useState, type FormEvent } from 'react';

interface FieldValueEntry {
  value: string;
  isValid: boolean;
}

type FieldValues = Record<string, FieldValueEntry>;

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

export default function ContactForm() {
  const [fieldValues, setFieldValues] = useState(fieldValuesDefault);
  const isValidFirstName = fieldValues.firstName.isValid;
  const isValidLastName = fieldValues.lastName.isValid;

  function handleInputChange(name: string, value: string) {
    const newFieldValues = structuredClone(fieldValues);

    newFieldValues[name].value = value.trim();
    setFieldValues(newFieldValues);
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    console.log(fieldValues);

    const newFieldValues = structuredClone(fieldValues);

    // Reset validation errors
    for (const key of Object.keys(newFieldValues)) {
      newFieldValues[key].isValid = true;
    }

    // Validation
    for (const key of Object.keys(newFieldValues)) {
      if (key === 'email') {
        // todo
      } else if (newFieldValues[key].value === '') {
        newFieldValues[key].isValid = false;
      }
    }

    setFieldValues(newFieldValues);
  }

  return (
    <form className="acf-form" action="post" noValidate onSubmit={handleFormSubmit}>
      <div className="acf-form_layout-inline">
        <div className="acf-form_input-container">
          <label className="acf-form_label font-style_body-sm" htmlFor="contact_first-name">
            First Name <em>*</em>
          </label>

          <input
            type="text"
            className={`acf-form_txt-input${!isValidFirstName ? ' invalid' : ''}`}
            id="contact_first-name"
            autoComplete="given-name"
            aria-describedby={!isValidFirstName ? 'contact_first-name_error' : undefined}
            aria-invalid={!isValidFirstName}
            required
            onChange={(evt) => handleInputChange('firstName', evt.target.value)}
          />

          {!isValidFirstName && (
            <p className="acf-form_error" id="contact_first-name_error">
              This field is required
            </p>
          )}
        </div>

        <div className="acf-form_input-container">
          <label className="acf-form_label font-style_body-sm" htmlFor="contact_last-name">
            Last Name <em>*</em>
          </label>

          <input
            type="text"
            className={`acf-form_txt-input${!isValidLastName ? ' invalid' : ''}`}
            id="contact_last-name"
            autoComplete="family-name"
            aria-describedby={!isValidLastName ? 'contact_last-name_error' : undefined}
            aria-invalid={!isValidLastName}
            required
            onChange={(evt) => handleInputChange('lastName', evt.target.value)}
          />

          {!isValidLastName && (
            <p className="acf-form_error" id="contact_last-name_error">
              This field is required
            </p>
          )}
        </div>
      </div>

      <div className="acf-form_input-container">
        <label className="acf-form_label font-style_body-sm" htmlFor="contact_email">
          Email Address <em>*</em>
        </label>

        <input
          type="text"
          className="acf-form_txt-input font-style_body-md"
          id="contact_email"
          autoComplete="email"
          aria-describedby={!fieldValues.email.isValid ? 'foo' : undefined}
          required
          onChange={(evt) => handleInputChange('email', evt.target.value)}
        />
        {!fieldValues.email.isValid && <p>Error!</p>}
      </div>

      <fieldset className="acf-form_input-container">
        <legend className="acf-form_radio-legend font-style_body-sm">
          Query Type <em>*</em>
        </legend>

        <div
          className="acf-form_layout-inline condensed"
          onChange={({ target }) => {
            if (target instanceof HTMLInputElement) {
              handleInputChange('queryType', target.value);
            }
          }}
        >
          <div className="acf-form_radio-container">
            <input
              type="radio"
              className="acf-form_radio"
              id="contact_query-inquiry"
              name="contact_query-type"
              value="inquiry"
            />

            <label
              htmlFor="contact_query-inquiry"
              className="acf-form_radio-label font-style_body-md"
            >
              General Inquiry
            </label>
          </div>

          <div className="acf-form_radio-container">
            <input
              type="radio"
              className="acf-form_radio"
              id="contact_query-support"
              name="contact_query-type"
              value="support"
            />

            <label
              htmlFor="contact_query-support"
              className="acf-form_radio-label font-style_body-md"
            >
              Support Request
            </label>
          </div>
        </div>
      </fieldset>

      <div className="acf-form_input-container">
        <label className="acf-form_label font-style_body-sm" htmlFor="contact_msg">
          Message <em>*</em>
        </label>

        <textarea
          className="acf-form_txt-input font-style_body-md"
          id="contact_msg"
          required
          onChange={(evt) => handleInputChange('message', evt.target.value)}
        ></textarea>
      </div>

      <div className="acf-form_input-container acf-form_consent inline">
        <input
          className="acf-form_checkbox"
          id="contact_consent"
          type="checkbox"
          required
          onChange={(evt) => handleInputChange('consented', evt.target.checked ? 'yes' : '')}
        />

        <label className="acf-form_label font-style_body-sm" htmlFor="contact_consent">
          I consent to being contacted by the team <em>*</em>
        </label>
      </div>

      <div className="acf-form_input-container">
        <button
          type="submit"
          className="acf-form_btn-submit acf-btn_primary font-style_body-md font-style_bold"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
