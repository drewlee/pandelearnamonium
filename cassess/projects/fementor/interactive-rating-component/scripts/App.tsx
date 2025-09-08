import { useState } from 'react';
import RatingCard from './RatingCard.js';
import SuccessCard from './SuccessCard.js';

const MAX_RATING = 5;
const RATINGS = Object.freeze(new Array(MAX_RATING).fill(0).map((_, i) => i + 1));

/**
 * Main application component.
 *
 * @returns JSX markup for the application.
 */
export default function App(): React.JSX.Element {
  const [rating, setRating] = useState(0);

  /**
   * Listener function for rating submission.
   *
   * @param selectedRating - Numerical rating selected by the user.
   */
  function onRatingSubmit(selectedRating: number): void {
    setRating(selectedRating);
  }

  return (
    <div className="irc-card_container">
      {!rating ? (
        <RatingCard
          maxRating={MAX_RATING}
          onRatingSubmit={onRatingSubmit}
          ratingOptions={RATINGS}
        />
      ) : (
        <SuccessCard maxRating={MAX_RATING} rating={rating} />
      )}
    </div>
  );
}
