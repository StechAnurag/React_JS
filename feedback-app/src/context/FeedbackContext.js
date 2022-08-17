import { createContext, useState } from 'react';
// import feedbackData from '../data/feedbacks';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      rating: 9,
      text: 'Some very very beautiful feedback'
    }
  ]);

  const deleteFeedback = id => {
    const yes = window.confirm('Do you really want to delete it?');
    if (yes) {
      setFeedbacks(feedbacks.filter(item => item.id !== id));
    }
  };

  const addFeedback = newFeedback => {
    const newFeedbackId = new Date().getTime();
    newFeedback.id = newFeedbackId;
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, deleteFeedback }}>{children}</FeedbackContext.Provider>
  );
};

export default FeedbackContext;
