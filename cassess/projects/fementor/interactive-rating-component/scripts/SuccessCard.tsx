interface SuccessCardProps {
  maxRating: number;
  rating: number;
}

/**
 * Component for displaying a successful rating submission message.
 *
 * @param props - The component props.
 * @remarks
 * - `props.maxRating` - Maximum possible rating.
 * - `props.rating` - Numerical rating as selected by the user.
 * @returns JSX markup for the component.
 */
export default function SuccessCard({ maxRating, rating }: SuccessCardProps): React.JSX.Element {
  return (
    <section className="irc-card irc-card_success">
      <span className="graphic_payment irc-card_success-graphic" role="presentation"></span>

      <p className="irc-card_callout font-style_body">
        You selected {rating} out of {maxRating}
      </p>

      <h1 className="irc-card_heading font-style_heading">Thank you!</h1>

      <p className="irc-card_text irc-card_text-padded font-style_body">
        We appreciate you taking the time to give a rating. If you ever need more support, don’t
        hesitate to get in touch!
      </p>
    </section>
  );
}
