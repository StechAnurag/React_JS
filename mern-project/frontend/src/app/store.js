import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import ticketReducer from '../redux/ticket/ticketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer
  }
});
