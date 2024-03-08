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
  'session/login',
  async (credentials) => {
    const req = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!req.ok) {
      const res = await req.json();
      if (res.errors) {
        throw new Error(JSON.stringify(res.errors));
      } else {
        throw new Error(`There was an error in the login process`);
      }
    }
    const res = await req.json();
    return res;
  }
);

export const thunkSignup = createAsyncThunk(
  'session/signup', async (formData) => {
    const req = await fetch('/api/auth/signup', {
      method: 'POST',
      body: formData
    });
    if (!req.ok) {
      const res = await req.json();
      if (res.errors) {
        throw new Error(JSON.stringify(res.errors));
      } else {
        throw new Error(`There was an error in the signup process`);
      }
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
  user: null,
  errors: null
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
      state.errors = null; // Clear any previous errors
    })
    .addCase(thunkSignup.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(thunkLogout.fulfilled, (state) => {
      state.user = null;
    })
    .addCase(thunkLogin.rejected, (state, action) => {
      state.errors = action.error.message;
    })
    .addCase(thunkSignup.rejected, (state, action) => {
      state.errors = action.error.message;
    })
  }
});

export default sessionSlice;