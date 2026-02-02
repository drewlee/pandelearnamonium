import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import SiteNavLinks from './SiteNavLinks.jsx';

interface SiteNavModalProps {
  onModalClose: () => void;
  triggerEl: HTMLButtonElement | null;
}

/**
 * Modal which displays the site navigation links on mobile screens.
 *
 * @param props - Component props.
 * @remarks
 * - `props.triggerEl` - Element which triggered the modal.
 * - `props.onModalClose` - Callback to run to dismiss the navigation modal.
 * @returns React JSX element.
 */
export default function SiteNavModal({
  onModalClose,
  triggerEl,
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

    const allSiblings = rootEl.parentElement?.children as HTMLElement[] | undefined;

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
          const el = document.getElementById('nh-nav-home-link');

          if (el) {
            requestAnimationFrame(() => el.focus());
          }
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
      {/* A11y compliant: used to capture delegated keyup events */}
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

        <SiteNavLinks isModal={true} />
      </div>
    </div>,
    document.body,
  );
}
