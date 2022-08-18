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
    const response = await fetch('/feedbacks?_sort=id&_order=desc');
    const data = await response.json();
    setFeedbacks(data);
    setIsLoading(false);
  };

  // 1.) Delete Feedback
  const deleteFeedback = async id => {
    const yes = window.confirm('Do you really want to delete it?');
    if (yes) {
      await fetch(`/feedbacks/${id}`, { method: 'DELETE' });
      setFeedbacks(feedbacks.filter(item => item.id !== id));
    }
  };

  // 2.) Add Feedback
  const addFeedback = async newFeedback => {
    const response = await fetch('/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    });
    const data = await response.json();
    setFeedbacks([data, ...feedbacks]);
  };

  // const addFeedback = newFeedback => {
  //   const newFeedbackId = new Date().getTime();
  //   newFeedback.id = newFeedbackId;
  //   setFeedbacks([newFeedback, ...feedbacks]);
  // };

  // 3.) Edit Feedback
  const editFeedback = item => {
    setFeedbackEdit({ item, edit: true });
  };

  // 4.) Update Feedback
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedbacks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    });
    const data = await response.json();
    setFeedbacks(feedbacks.map(item => (item.id === id ? { ...item, ...data } : item)));
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
