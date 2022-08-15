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

export default FeedbackList;
