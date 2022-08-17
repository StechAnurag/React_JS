import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import feedbackData from './data/feedbacks';
import AboutPage from './pages/AboutPage';
import AboutIconLink from './components/AboutIconLink';

function App() {
  const [feedbacks, setFeedbacks] = useState(feedbackData);

  const deleteFeedback = id => {
    const yes = window.confirm('Do you really want to delete it?');
    if (yes) {
      setFeedbacks(feedbacks.filter(item => item.id !== id));
    }
  };

  const addFeedback = newFeedback => {
    const newFeedbackId = new Date().getTime();
    newFeedback.id = newFeedbackId;
    // state is immutable, so don't change it directly make a shallow copy of it
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  return (
    <Router>
      <Header text={'FEEDBACK UI'} />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedbacks={feedbacks} />
                <FeedbackList feedbacks={feedbacks} handleDelete={deleteFeedback} />
              </>
            }
          ></Route>
          <Route exact path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <AboutIconLink />
    </Router>
  );
}

export default App;
