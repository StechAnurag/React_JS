import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

function FeedbackForm({ handleAdd }) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const handleTextChange = e => {
    if (text === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage('Please write at least 10 characters');
    } else {
      // enable button only if the review has at least 10 characters
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      };
      handleAdd(newFeedback);
      setText('');
    }
  };

  return (
    <Card>
      <form onSubmit={handleFormSubmit}>
        <h2>How would you rate our service?</h2>
        <RatingSelect select={rating => setRating(rating)} />
        <div className="input-group">
          <input type="text" onChange={handleTextChange} placeholder="Write a review" value={text} />
          <Button version={'primary'} type="submit" isDisabled={btnDisabled}>
            Submit
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
