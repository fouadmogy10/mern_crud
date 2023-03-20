import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import TicketServices from './TicketServices';


const initialState = {
    tickets: [],
    ticket: [],
    isErorr: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


export const createTicket = createAsyncThunk(
    'ticket/create',
    async (ticketData, thunkAPI) => {
        try {
            const token =thunkAPI.getState().auth.user.token
            return await TicketServices.createTicket(ticketData,token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }

    }
)
// get user tickets
export const getTickets = createAsyncThunk(
    'ticket/getAll',
    async (_, thunkAPI) => {
        try {
            const token =thunkAPI.getState().auth.user.token
            return await TicketServices.getTickets(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }

    }
)
export const getSingleTickets = createAsyncThunk(
    'ticket/getSingleTicket',
    async (ID, thunkAPI) => {
        try {
            const token =thunkAPI.getState().auth.user.token
            return await TicketServices.getSingleTickets(ID,token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }

    }
)
// close ticket
export const closeTickets = createAsyncThunk(
    'ticket/closeticket',
    async (ID, thunkAPI) => {
        try {
            const token =thunkAPI.getState().auth.user.token
            return await TicketServices.closeTickets(ID,token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }

    }
)





export const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        reset: (state) => {
            state.tickets = []
            state.ticket = []
            state.isErorr = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
        }

    },
    extraReducers: (builder) => {
        builder.addCase(createTicket.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(createTicket.fulfilled,(state)=>{
            state.isLoading=false
            state.isSuccess=true
        })
        builder.addCase(createTicket.rejected,(state,action)=>{
            state.isLoading=false
            state.isErorr=true
            state.message=action.payload 
        })

        // getTickets
        builder.addCase(getTickets.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(getTickets.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.tickets=action.payload
        })
        builder.addCase(getTickets.rejected,(state,action)=>{
            state.isLoading=false
            state.isErorr=true
            state.message=action.payload 
        })

        // getSingleTickets
        builder.addCase(getSingleTickets.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(getSingleTickets.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.ticket=action.payload
        })
        builder.addCase(getSingleTickets.rejected,(state,action)=>{
            state.isLoading=false
            state.isErorr=true
            state.message=action.payload 
        })
        // closeTickets

        builder.addCase(closeTickets.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(closeTickets.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.tickets.map(ticket=>ticket._id === action.payload._id? (ticket.status="closed") :ticket)
        })
        builder.addCase(closeTickets.rejected,(state,action)=>{
            state.isLoading=false
            state.isErorr=true
            state.message=action.payload 
        })

        
    } })


export const { reset } = ticketSlice.actions

export default ticketSlice.reducer