import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import feedbackData from './data/feedbacks';
import AboutPage from './pages/AboutPage';

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
        <Route exact path="/">
          <FeedbackForm handleAdd={addFeedback} />
          <FeedbackStats feedbacks={feedbacks} />
          <FeedbackList feedbacks={feedbacks} handleDelete={deleteFeedback} />
        </Route>
        {/* Method 1: of rendering route 
        <Route exact path="/about">
          This is some test HTML, we can render a component as well
        </Route> 
        */}
        {/* Method 2: of rendering route */}
        <Route exact path="/about" component={AboutPage} />
      </div>
    </Router>
  );
}

export default App;
