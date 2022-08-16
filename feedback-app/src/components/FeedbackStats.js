import PropTypes from 'prop-types';

function FeedbackStats({ feedbacks }) {
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

FeedbackStats.propTypes = {
  feedbacks: PropTypes.array.isRequired
};

export default FeedbackStats;
