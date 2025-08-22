import Accordion from './Accordion.js';
import FAQS from './accordion-content.js';

export default function App() {
  return (
    <section className="faqa-main_container">
      <div className="faqa-main_heading">
        <span className="faqa-icon_star" role="presentation"></span>
        <h1 className="text-preset-1">FAQs</h1>
      </div>

      <Accordion content={FAQS} />
    </section>
  );
}
