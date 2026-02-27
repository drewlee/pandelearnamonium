import { useRef, useState } from 'react';
import SiteNavLinks from './SiteNavLinks.jsx';
import SiteNavModal from './SiteNavModal.jsx';

/**
 * Site navigation menu and mobile navigation trigger button.
 *
 * @returns React JSX element.
 */
export default function SiteNav(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const btnElRef: React.RefObject<HTMLButtonElement | null> = useRef(null);

  return (
    <>
      <button
        aria-label="Open site navigation menu"
        className="nh-navbar_btn-burger"
        onClick={() => setIsOpen(true)}
        ref={btnElRef}
        type="button"
      ></button>

      <SiteNavLinks />

      {isOpen && (
        <SiteNavModal onModalClose={() => setIsOpen(false)} triggerEl={btnElRef.current} />
      )}
    </>
  );
}
