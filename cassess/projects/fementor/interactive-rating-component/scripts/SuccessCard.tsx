interface SuccessCardParams {
  maxRating: number;
  rating: number;
}

export default function SuccessCard({ maxRating, rating }: SuccessCardParams) {
  return (
    <section className="irc-card irc-card_success">
      <span className="graphic_payment irc-card_success-graphic" aria-hidden="true"></span>

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
