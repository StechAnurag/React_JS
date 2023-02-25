import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import ticketReducer from '../redux/ticket/ticketSlice';
import noteReducer from '../redux/notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    note: noteReducer
  }
});
