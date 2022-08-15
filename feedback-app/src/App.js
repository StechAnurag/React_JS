import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import feedbackData from './data/feedbacks';

function App() {
  const [feedbacks, setFeedbacks] = useState(feedbackData);

  return (
    <>
      <Header text={'FEEDBACK UI'} />
      <div className="container">
        <h1>Feedback App</h1>
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </>
  );
}

export default App;
