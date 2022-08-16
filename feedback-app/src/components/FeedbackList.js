import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';

function FeedbackList({ feedbacks }) {
  if (!feedbacks || feedbacks.length <= 0) {
    return <p>No Feedbacks yet.</p>;
  }
  return (
    <div className="feedback-list">
      {feedbacks.map(feedback => {
        return <FeedbackItem key={feedback.id} item={feedback} />;
      })}
    </div>
  );
}

// Adding the type checks of Array of which exact key and its type should be
FeedbackList.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    })
  )
};

export default FeedbackList;
