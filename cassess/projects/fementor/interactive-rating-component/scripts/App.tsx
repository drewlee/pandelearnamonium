import { useState } from 'react';
import RatingCard from './RatingCard.js';
import SuccessCard from './SuccessCard.js';

const MAX_RATING = 5;
const RATINGS = Object.freeze(new Array(MAX_RATING).fill(0).map((_, i) => i + 1));

export default function App() {
  const [rating, setRating] = useState(0);

  function onRatingSubmit(selectedRating: number): void {
    setRating(selectedRating);
  }

  return (
    <div className="irc-card_container">
      {!rating ? (
        <RatingCard
          ratingOptions={RATINGS}
          maxRating={MAX_RATING}
          onRatingSubmit={onRatingSubmit}
        />
      ) : (
        <SuccessCard maxRating={MAX_RATING} rating={rating} />
      )}
    </div>
  );
}
