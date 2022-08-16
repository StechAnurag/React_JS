import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import feedbackData from './data/feedbacks';

function App() {
  const [feedbacks, setFeedbacks] = useState(feedbackData);

  const deleteFeedback = id => {
    const yes = window.confirm('Do you really want to delete it?');
    if (yes) {
      setFeedbacks(feedbacks.filter(item => item.id !== id));
    }
  };

  return (
    <>
      <Header text={'FEEDBACK UI'} />
      <div className="container">
        <h1>Feedback App</h1>
        <FeedbackList feedbacks={feedbacks} handleDelete={deleteFeedback} />
      </div>
    </>
  );
}

export default App;
