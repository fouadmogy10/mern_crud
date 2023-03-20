import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import NoteServices from './noteServices';


const initialState = {
    notes: [],
    isErorr: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


export const createNote = createAsyncThunk(
    'note/create',
    async ({noteText,id}, thunkAPI) => {
        try {
            const token =thunkAPI.getState().auth.user.token
            return await NoteServices.createNote({noteText,id},token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }

    }
)
export const getNote = createAsyncThunk(
    'note/getAll',
    async (id, thunkAPI) => {
        try {
            const token =thunkAPI.getState().auth.user.token
            return await NoteServices.getNote(id,token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }

    }
)
// get user notes


export const notetSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        reset: (state) => {
            state.notes = []
            state.isErorr = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getNote.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(getNote.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.notes=action.payload
        })
        builder.addCase(getNote.rejected,(state,action)=>{
            state.isLoading=false
            state.isErorr=true
            state.message=action.payload 
        })

        builder.addCase(createNote.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(createNote.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.notes.push(action.payload)
        })
        builder.addCase(createNote.rejected,(state,action)=>{
            state.isLoading=false
            state.isErorr=true
            state.message=action.payload 
        })

        
    } })


export const { reset } = notetSlice.actions

export default notetSlice.reducer