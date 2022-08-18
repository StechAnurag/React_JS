import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  // Fetch the data from backend, on load of Feedback context
  useEffect(() => {
    fetchFeedback();
  }, []);

  // 0.) Fetch Data from backend
  const fetchFeedback = async () => {
    const response = await fetch('http://localhost:4000/feedbacks?_sort=id&_order=desc');
    const data = await response.json();
    setFeedbacks(data);
    setIsLoading(false);
  };

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
      value={{ feedbacks, addFeedback, deleteFeedback, editFeedback, feedbackEdit, updateFeedback, isLoading }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
