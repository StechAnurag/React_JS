import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';

function OAuth() {
  const navigation = useNavigate();
  const location = useLocation();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check if the user exists in DB
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // if the user does not exist then only, save in DB
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        });
        navigation('/');
      }
    } catch (err) {
      console.log(err);
      toast.error('Could not authorize with google');
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-in' ? 'In' : 'Up'} With</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="googleIcon" />
      </button>
    </div>
  );
}

export default OAuth;
