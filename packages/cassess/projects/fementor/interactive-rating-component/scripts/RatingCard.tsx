import { useState } from 'react';

interface RatingCardProps {
  maxRating: number;
  ratingOptions: readonly number[];
  onRatingSubmit: (rating: number) => void;
}

/**
 * Component for selecting and submitting a rating.
 *
 * @param props - The component props.
 * @remarks
 * - `props.maxRating` - Maximum possible rating.
 * - `props.ratingOptions` - Rating numerical values.
 * - `props.onRatingSubmit` - Listener for the submit button `click` event.
 * @returns JSX markup for the rating component.
 */
export default function RatingCard({
  maxRating,
  ratingOptions,
  onRatingSubmit,
}: RatingCardProps): React.JSX.Element {
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <section className="irc-card irc-card_rating">
      <span className="graphic_star irc-card_star-graphic" role="presentation"></span>

      <h1 className="irc-card_heading font-style_heading">How did we do?</h1>

      <p className="irc-card_text font-style_body">
        Please let us know how we did with your support request. All feedback is appreciated to help
        us improve our offering!
      </p>

      <fieldset className="irc-card_rate-options">
        <legend className="visually-hidden">Rating</legend>

        <ul className="irc-card_rate-options-list">
          {ratingOptions.map((value) => {
            const id = `rating_${value}`;

            return (
              <li key={id}>
                <input
                  aria-label={`Rate us ${value} out of ${maxRating}`}
                  className="visually-hidden radio_styled"
                  id={id}
                  name="rating"
                  onInput={() => setSelectedRating(value)}
                  type="radio"
                  value={value}
                />

                <label className="btn_secondary font-style_accent-2" htmlFor={id}>
                  <span>{value}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <button
        className="btn_primary font-style_accent-1"
        disabled={!selectedRating}
        onClick={() => onRatingSubmit(selectedRating)}
        type="button"
      >
        Submit
      </button>
    </section>
  );
}
