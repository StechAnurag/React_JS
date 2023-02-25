import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// get ticket notes
export const getTicketNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await noteService.getNotes(ticketId, token);
  } catch (err) {
    console.log(err);
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// create note
export const createNote = createAsyncThunk('notes/create', async ({ noteText, ticketId }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await noteService.createNote(noteText, ticketId, token);
  } catch (err) {
    console.log(err);
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const notesSlice = createSlice({
  initialState,
  name: 'note',
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getTicketNotes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTicketNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getTicketNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNote.pending, state => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log({ actionPayload: action.payload });
        state.notes.push(action.payload); // can't do this with simple redux, bcoz state is immutable, redux toolkit provides this feature to mutate state like this
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = notesSlice.actions;
export default notesSlice.reducer;
