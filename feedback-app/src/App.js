import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import feedbackData from './data/feedbacks';
import AboutPage from './pages/AboutPage';
import AboutIconLink from './components/AboutIconLink';
// import Card from './components/shared/Card';
// import Post from './components/Post';

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
          {/* <Route exact path="/post/:id/:name" element={<Post />} /> */}
          {/* <Route path="/posts/*" element={<Post />} /> */}
        </Routes>

        {/*
        ----------- JUST A DEMO OF NavLinks ----------
        <Card>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>{' '}
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </Card> 
        */}
      </div>
      <AboutIconLink />
    </Router>
  );
}

export default App;
