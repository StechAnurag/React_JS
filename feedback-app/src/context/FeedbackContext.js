import { createContext, useState } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  // eslint-disable-next-line
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      rating: 9,
      text: 'Some very very beautiful feedback'
    }
  ]);
  return <FeedbackContext.Provider value={{ feedbacks }}>{children}</FeedbackContext.Provider>;
};

export default FeedbackContext;
