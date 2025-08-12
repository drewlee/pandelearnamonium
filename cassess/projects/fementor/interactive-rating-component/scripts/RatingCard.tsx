import { Fragment, useState } from 'react';

interface RatingCardParams {
  maxRating: number;
  ratingOptions: readonly number[];
  onRatingSubmit: (rating: number) => void;
}

export default function RatingCard({ maxRating, ratingOptions, onRatingSubmit }: RatingCardParams) {
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <section className="irc-card irc-card_rating">
      <span className="graphic_star irc-card_star-graphic" aria-hidden="true"></span>

      <h1 className="irc-card_heading font-style_heading">How did we do?</h1>

      <p className="irc-card_text font-style_body">
        Please let us know how we did with your support request. All feedback is appreciated to help
        us improve our offering!
      </p>

      <fieldset className="irc-card_rate-options">
        <legend className="visually-hidden">Rating</legend>

        {ratingOptions.map((value) => {
          const id = `rating_${value}`;

          return (
            <Fragment key={`input_${value}`}>
              <input
                type="radio"
                name="rating"
                id={id}
                className="visually-hidden styled-radio"
                aria-label={`Rate us ${value} out of ${maxRating}`}
                value={value}
                onInput={() => setSelectedRating(value)}
              />
              <label htmlFor={id} className="btn_secondary font-style_accent-2">
                <span>{value}</span>
              </label>
            </Fragment>
          );
        })}
      </fieldset>

      <button
        type="button"
        className="btn_primary font-style_accent-1"
        disabled={!selectedRating}
        onClick={() => onRatingSubmit(selectedRating)}
      >
        Submit
      </button>
    </section>
  );
}
