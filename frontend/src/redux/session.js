/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const thunkAuthenticate = createAsyncThunk(
  'session/authenticate', async () => {
    const req = await fetch('/api/auth/', {
      method: 'GET'
    });
    if (!req.ok) {
      throw new Error(`There was an error in the authentication process`)
    }
    const res = await req.json();
    return res;
  }
);


export const thunkLogin = createAsyncThunk(
  'session/login', async (credentials) => {
    const req = await fetch('/api/auth/login', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    });
    if (!req.ok) {
      throw new Error(`There was an error in the login process`)
    }
    const res = await req.json();
    return res;
  }
);

export const thunkSignup = createAsyncThunk(
  'session/signup', async (formData) => {
    const req = await fetch('/api/auth/signup', {
      method:'POST',
      headers: {'Content-type': 'application/json'},
      body: formData
    });
    if (!req.ok) {
      throw new Error(`There was an error in the signup process`)
    }
    const res = await req.json();
    return res;
  }
);


export const thunkLogout = createAsyncThunk(
  'session/logout', async () => {
    const req = await fetch('/api/auth/logout');
    if (!req.ok) {
      throw new Error(`There was an error in the logout process`)
    }
    const res = await req.json();
    return res;
  }
);


const initialSessionState = {
  user: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(thunkAuthenticate.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(thunkLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(thunkSignup.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(thunkLogout.fulfilled, (state, action) => {
      state.user = null;
    });
  }
});

export default sessionSlice;