import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import SiteNavLinks from './SiteNavLinks.js';

interface SiteNavModalProps {
  onModalClose: () => void;
  triggerEl: HTMLButtonElement | null;
}

export default function SiteNavModal({
  triggerEl,
  onModalClose,
}: SiteNavModalProps): React.JSX.Element {
  const rootElRef: React.RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const rootEl = rootElRef.current;

    if (!rootEl) {
      return;
    }

    const dialogEl = rootEl.querySelector('[role=dialog]');

    if (dialogEl instanceof HTMLElement) {
      dialogEl.focus();
    }

    const allSiblings = rootEl.parentElement?.children;

    if (!allSiblings?.length) {
      return;
    }

    const siblings = [...allSiblings].filter((el) => el !== rootEl);
    siblings.forEach((el) => el.setAttribute('inert', ''));

    return () => {
      if (triggerEl instanceof HTMLButtonElement) {
        if (getComputedStyle(triggerEl).display !== 'none') {
          requestAnimationFrame(() => triggerEl.focus());
        } else {
          // TODO: set focus on closest focusable element in proximity
          console.log('Not visible');
        }
      }

      siblings.forEach((el) => el.removeAttribute('inert'));
    };
  }, [triggerEl]);

  function handleKeyUp(evt: React.KeyboardEvent): void {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      onModalClose();
    }
  }

  return createPortal(
    <div className="nh-nav-modal_curtain" ref={rootElRef}>
      {/* Used to capture delegated keyup events */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        aria-label="Site navigation"
        className="nh-nav-modal_container"
        onKeyUp={handleKeyUp}
        role="dialog"
        tabIndex={-1}
      >
        <button
          aria-label="Close site navigation"
          className="nh-nav-modal_btn-close"
          onClick={onModalClose}
          type="button"
        ></button>

        <SiteNavLinks />
      </div>
    </div>,
    document.body,
  );
}
