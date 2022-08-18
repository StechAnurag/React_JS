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

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  // 1.) Delete Feedback
  const deleteFeedback = id => {
    const yes = window.confirm('Do you really want to delete it?');
    if (yes) {
      setFeedbacks(feedbacks.filter(item => item.id !== id));
    }
  };

  // 2.) Add Feedback
  const addFeedback = newFeedback => {
    const newFeedbackId = new Date().getTime();
    newFeedback.id = newFeedbackId;
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  // 3.) Edit Feedback
  const editFeedback = item => {
    setFeedbackEdit({ item, edit: true });
  };

  // 4.) Update Feedback
  const updateFeedback = (id, updItem) => {
    setFeedbacks(feedbacks.map(item => (item.id === id ? { ...item, ...updItem } : item)));
    setFeedbackEdit({ item: {}, edit: false });
  };

  return (
    <FeedbackContext.Provider
      value={{ feedbacks, addFeedback, deleteFeedback, editFeedback, feedbackEdit, updateFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
