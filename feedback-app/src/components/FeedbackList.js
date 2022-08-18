import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackContext from '../context/FeedbackContext';
import Spinner from './shared/Spinner';

function FeedbackList() {
  const { feedbacks, isLoading } = useContext(FeedbackContext); // bringing feedbacks global state (App level state)

  if (!isLoading && (!feedbacks || feedbacks.length <= 0)) {
    return <p>No Feedbacks yet.</p>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedbacks.map(feedback => {
          return (
            <motion.div key={feedback.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FeedbackItem key={feedback.id} item={feedback} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default FeedbackList;
