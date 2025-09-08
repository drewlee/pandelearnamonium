import { useEffect, useRef, useState } from 'react';
import ContactForm from './ContactForm.jsx';

/**
 * The main application component.
 *
 * @returns JSX markup for the main application.
 */
export default function App(): React.JSX.Element {
  const [isSubmitSuccess, setSubmitSuccess] = useState(false);
  const toastEl: React.RefObject<HTMLElement | null> = useRef(null);

  /**
   * Listener function for the document `focusin` event. Used to remove
   * the success toast when the user starts interacting with the form again.
   */
  function handleDocFocusIn(): void {
    if (toastEl.current) {
      const el = toastEl.current;

      el.addEventListener('transitionend', () => setSubmitSuccess(false), {
        once: true,
      });
      el.classList.remove('active');
    }
  }

  /**
   * Listener function for the success toast `focusout` event. Used to remove the
   * `tabindex` attribute so that clicking the toast does not inadvertently remove it.
   *
   * @param evt - Focus event object.
   * @remarks
   * `evt.target` - The event's source element.
   */
  function handleToastFocusOut({ target }: FocusEvent): void {
    if (target instanceof HTMLElement) {
      target.removeAttribute('tabindex');
    }
  }

  useEffect(() => {
    // Focus on the success toast after it renders on screen. Used as a means
    // to provide an audible notification for assistive software users (a11y).
    if (isSubmitSuccess && toastEl.current) {
      const el = toastEl.current;

      requestAnimationFrame(() => el.classList.add('active'));
      el.focus();
      el.addEventListener('focusout', handleToastFocusOut, { once: true });
      document.addEventListener('focusin', handleDocFocusIn, { once: true });
    }
  });

  return (
    <>
      {/* Success Message Toast */}
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

        {/* Contact Form */}
        <ContactForm onSubmitSuccess={() => setSubmitSuccess(true)} />
      </section>
    </>
  );
}
