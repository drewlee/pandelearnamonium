interface AccordionTriggerProps {
  content: string;
  index: number;
  isActiveIndex: boolean;
  onTriggerClick: (index: number) => void;
}

/**
 * Component used to display the trigger for the corresponding accordion item.
 *
 * @param props - The component props.
 * @remarks
 * - `props.content` - Text content to display for the accordion trigger.
 * - `props.index` - Numerical index corresponding to the accordion item.
 * - `props.isActiveIndex` - Numerical index of the active accordion item.
 * - `props.onTriggerClick` - Listener function for the trigger's `click` event.
 * @returns JSX markup for the accordion content.
 */
export default function AccordionTrigger({
  content,
  index,
  isActiveIndex,
  onTriggerClick,
}: AccordionTriggerProps): React.JSX.Element {
  return (
    <h2 className={`${isActiveIndex ? 'active ' : ''}faqa-accordion_trigger`}>
      <button
        aria-controls={`accordion-content_${index}`}
        aria-expanded={isActiveIndex}
        className="text-preset-2"
        id={`accordion-trigger_${index}`}
        onClick={() => onTriggerClick(index)}
        type="button"
      >
        <span className="faqa-accordion_trigger-text">{content}</span>
        <span className="faqa-accordion_trigger-icon" role="presentation"></span>
      </button>
    </h2>
  );
}
