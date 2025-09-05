import { useEffect, useRef, useState, type JSX, type RefObject } from 'react';
import ContactForm from './ContactForm.js';

export default function App(): JSX.Element {
  const [isSubmitSuccess, setSubmitSuccess] = useState(false);
  const toastEl: RefObject<HTMLElement | null> = useRef(null);

  function handleFocusIn() {
    setSubmitSuccess(false);
  }

  useEffect(() => {
    if (isSubmitSuccess && toastEl.current) {
      toastEl.current.focus();
      document.addEventListener('focusin', handleFocusIn);

      return () => {
        document.removeEventListener('focusin', handleFocusIn);
      };
    }
  });

  return (
    <>
      {isSubmitSuccess && (
        <section className="acf-toast" ref={toastEl} tabIndex={-1}>
          <h2 className="acf-toast_heading font-style_body-md font-style_bold">Message Sent!</h2>
          <p className="acf-toast_body font-style_body-sm">
            Thanks for completing the form. We&apos;ll be in touch soon!
          </p>
        </section>
      )}

      <section className="acf-container">
        <h1 className="font-style_heading">Contact Us</h1>
        <ContactForm onSubmitSuccess={() => setSubmitSuccess(true)} />
      </section>
    </>
  );
}
