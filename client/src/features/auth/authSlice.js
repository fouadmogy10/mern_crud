import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import authServices from './authServices';


const user = JSON.parse(localStorage.getItem("user"))
const initialState = {
  user: user? user: null,
  isErorr:false,
  isSuccess:false,
  isLoading:false,
  message:"",
}


   export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authServices.register(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()
            return thunkAPI.rejectWithValue(message)

        }
      
    }
  )

   export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authServices.login(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()
            return thunkAPI.rejectWithValue(message)

        }
      
    }
  )
   export const logout = createAsyncThunk(
    'auth/logout',
    async (user, thunkAPI) => {
             await authServices.logout()
      
      
    }
  )

  


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   reset :(state)=>{
    state.user= null
    state.isErorr=false
    state.isSuccess=false
    state.isLoading=false
    state.message=""
   }

  },
  extraReducers:(builder)=>{
builder.addCase(register.pending,(state)=>{
    state.isLoading=true
})
builder.addCase(register.fulfilled,(state,action)=>{
    state.isLoading=false
    state.isSuccess=true
    state.user= action.payload
})
builder.addCase(register.rejected,(state,action)=>{
    state.isLoading=false
    state.isSuccess=false
    state.isErorr=true
    state.message=action.payload
    state.user= null
})
builder.addCase(login.pending,(state)=>{
    state.isLoading=true
})
builder.addCase(login.fulfilled,(state,action)=>{
    state.isLoading=false
    state.isSuccess=true
    state.user= action.payload
})
builder.addCase(login.rejected,(state,action)=>{
    state.isLoading=false
    state.isSuccess=false
    state.isErorr=true
    state.message=action.payload
    state.user= null
})
builder.addCase(logout.rejected,(state,action)=>{
    
    state.user= null
})
  }
})


export const { reset } = authSlice.actions

export default authSlice.reducer