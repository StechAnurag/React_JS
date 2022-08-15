import { useState } from 'react';

function FeedbackItem() {
  const [rating, setRating] = useState(7);
  const [text, setText] = useState('This is a feedback.');

  const handleClick = () => {
    // setRating(10); // directly
    setText('Some super beautiful rating.');
    // Alternate way: in this way we have the access of the previous state value
    setRating(prev => {
      return prev + 1;
    });
  };

  return (
    <div className="card">
      <div className="num-display">{rating}</div>
      <div className="text-display">{text}</div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default FeedbackItem;
