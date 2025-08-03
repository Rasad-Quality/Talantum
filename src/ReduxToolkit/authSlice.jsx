import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { auth, provider } from "../Auth/Firebase";

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return { uid: userCredential.user.uid, email: userCredential.user.email };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { uid: userCredential.user.uid, email: userCredential.user.email };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signInWithGoogle = createAsyncThunk(
    'auth/signInWithGoogle',
    async (_, { rejectWithValue }) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            return { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export default authSlice.reducer;