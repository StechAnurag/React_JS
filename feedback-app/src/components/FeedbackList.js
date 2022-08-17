import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';
import { motion, AnimatePresence } from 'framer-motion';

function FeedbackList({ feedbacks, handleDelete }) {
  // Conditional Rendering
  if (!feedbacks || feedbacks.length <= 0) {
    return <p>No Feedbacks yet.</p>;
  }

  // WITH ANIMATION
  return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedbacks.map(feedback => {
          return (
            <motion.div key={feedback.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FeedbackItem key={feedback.id} item={feedback} handleDelete={handleDelete} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  // WITHOUT ANIMATION

  // return (
  //   <div className="feedback-list">
  //     {feedbacks.map(feedback => {
  //       return <FeedbackItem key={feedback.id} item={feedback} handleDelete={handleDelete} />;
  //     })}
  //   </div>
  // );
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
