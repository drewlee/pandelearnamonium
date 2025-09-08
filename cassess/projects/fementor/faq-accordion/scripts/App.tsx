import Accordion from './Accordion.js';
import FAQS from './content.js';

/**
 * Main application component.
 *
 * @returns JSX markup for the application.
 */
export default function App(): React.JSX.Element {
  return <Accordion content={FAQS} />;
}
