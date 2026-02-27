import { useState } from 'react';
import AccordionTrigger from './AccordionTrigger.js';
import AccordionContent from './AccordionContent.js';

interface AccordionProps {
  content: Record<string, string | number>[];
}

/**
 * Component used to display the accordion.
 *
 * @param props - The component props.
 * @remarks
 * `props.content` - Text content for the accordion items.
 * @returns JSX markup for the accordion.
 */
export default function Accordion({ content }: AccordionProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Listener function for the accordion trigger `click` event.
   *
   * @param index - Numerical index corresponding to the clicked accordion trigger.
   */
  function handleTriggerClick(index: number): void {
    const newActiveIndex = index === activeIndex ? -1 : index;
    setActiveIndex(newActiveIndex);
  }

  return (
    <div className="faqa-accordion">
      {content.map(({ id, question, answer }, index) => {
        const isActiveIndex = index === activeIndex;

        return (
          <div className="faqa-accordion_item" key={id}>
            <AccordionTrigger
              content={question as string}
              index={index}
              isActiveIndex={isActiveIndex}
              onTriggerClick={handleTriggerClick}
            />

            <AccordionContent
              content={answer as string}
              index={index}
              isActiveIndex={isActiveIndex}
            />
          </div>
        );
      })}
    </div>
  );
}
