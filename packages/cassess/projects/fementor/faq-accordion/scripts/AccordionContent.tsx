import { useEffect, useRef } from 'react';

interface AccordionContentProps {
  content: string;
  index: number;
  isActiveIndex: boolean;
}

/**
 * Helper utility to get the CSS `style` attribute height for the specified element.
 *
 * @param el - HTML element.
 * @returns CSS height property value.
 */
function getStyleHeight(el: HTMLElement): string {
  return el.style.height;
}

/**
 * Helper utility to set the CSS `style` attribute height for the specified element.
 *
 * @param el - HTML element.
 * @param value - CSS height property value.
 */
function setStyleHeight(el: HTMLElement, value: string): void {
  el.style.setProperty('height', value);
}

/**
 * Component used to display the content for the corresponding accordion item.
 *
 * @param props - The component props.
 * @remarks
 * `props.content` - Text content to display for the accordion item.
 * `props.index` - Numerical index corresponding to the accordion item.
 * `props.isActiveIndex` - Numerical index of the active accordion item.
 * @returns JSX markup for the accordion content.
 */
export default function AccordionContent({
  content,
  index,
  isActiveIndex,
}: AccordionContentProps): React.JSX.Element {
  /** Reference the root HTML element. */
  const rootElRef: React.RefObject<HTMLDivElement | null> = useRef(null);

  /**
   * A `useEffect` handler which enables CSS expanding & collapsing
   * transition effects on the root HTML element.
   */
  function handleHeightTransition(): void {
    const rootEl = rootElRef.current;

    if (!rootEl) {
      return;
    }

    // Expand content for the active item.
    if (isActiveIndex) {
      // This condition prevents CSS transition effects on initial page load.
      if (getStyleHeight(rootEl) === '0px') {
        // Explicit height is required to trigger CSS transition.
        setStyleHeight(rootEl, `${rootEl.scrollHeight}px`);

        // After the transition, set the height back to `auto` to maintain responsiveness.
        rootEl.addEventListener('transitionend', () => setStyleHeight(rootEl, 'auto'), {
          once: true,
        });
      } else {
        // Just set height to `auto` on initial page load.
        setStyleHeight(rootEl, 'auto');
      }
    } else {
      // Collapse content for the inactive item.
      // This condition prevents CSS transition effects on initial page load.
      if (getStyleHeight(rootEl) === 'auto') {
        // Explicit height is required to trigger CSS transition.
        rootEl.style.setProperty('height', `${rootEl.scrollHeight}px`);
      }

      window.requestAnimationFrame(() => setStyleHeight(rootEl, '0px'));
    }
  }

  useEffect(handleHeightTransition, [isActiveIndex]);

  return (
    <div
      aria-labelledby={`accordion-trigger_${index}`}
      aria-hidden={!isActiveIndex}
      className={`faqa-accordion_content`}
      id={`accordion-content_${index}`}
      ref={rootElRef}
      role="region"
    >
      <div className="faqa-accordion_content-spacing">
        <p className="text-preset-3">{content}</p>
      </div>
    </div>
  );
}
