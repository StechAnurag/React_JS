import Header from './components/Header';
import FeedbackItem from './components/FeedbackItem';

function App() {
  return (
    <>
      <Header text={'FEEDBACK UI'} />
      <div className="container">
        <h1>Feedback App</h1>
        <FeedbackItem />
      </div>
    </>
  );
}

export default App;
