import { useState } from 'react';

export default function Accordion({ content }: { content: Record<string, string>[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleTriggerClick(index: number): void {
    const newActiveIndex = index === activeIndex ? -1 : index;
    setActiveIndex(newActiveIndex);
  }

  return (
    <div className="faqa-accordion">
      {content.map(({ question, answer }, index) => {
        const isActiveIndex = index === activeIndex;

        return (
          <div className={`${isActiveIndex ? 'active ' : ''}faqa-accordion_item`} key={index}>
            <h2 className="faqa-accordion_trigger">
              <button
                className="text-preset-2"
                type="button"
                id={`accordion-trigger_${index}`}
                aria-expanded={isActiveIndex}
                aria-controls={`accordion-content_${index}`}
                onClick={() => handleTriggerClick(index)}
              >
                <span className="faqa-accordion_trigger-text">{question}</span>
                <span className="faqa-accordion_trigger-icon" role="presentation"></span>
              </button>
            </h2>

            <div
              className="faqa-accordion_content"
              id={`accordion-content_${index}`}
              role="region"
              aria-labelledby={`accordion-trigger_${index}`}
            >
              <p className="text-preset-3">{answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
