import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {
  const { feedbacks } = useContext(FeedbackContext);
  // Calculate average
  let average = feedbacks.reduce((acc, cur) => {
    return acc + cur.rating;
  }, 0);
  average = average / feedbacks.length;
  average = average.toFixed(1).replace(/[.,]0$/, ''); // replace the trailing 0 from 9.0 etc

  return (
    <div className="feedback-stats">
      <h4>{feedbacks.length} reviews</h4>
      <h4>Average rating : {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}

export default FeedbackStats;
