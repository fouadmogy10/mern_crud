import axios from "axios"

const API_URL ='/api/tickets/'

// createTicket

const createTicket = async (ticketData,token)=>{
    const config ={
        headers :{
                    Authorization :`Bearer ${token}`
                }
}
   const response = await axios.post(API_URL,ticketData,config)
   return response.data
}
const getTickets = async (token)=>{
    const config ={
        headers :{
                    Authorization :`Bearer ${token}`
                }
}
   const response = await axios.get(API_URL,config)
   return response.data
}

const getSingleTickets = async (ID,token)=>{
    const config ={
        headers :{
                    Authorization :`Bearer ${token}`
                }
}
   const response = await axios.get(API_URL+ID,config)
   return response.data
}

// close ticket
const closeTickets = async (ID,token)=>{
    const config ={
        headers :{
                    Authorization :`Bearer ${token}`
                }
}
   const response = await axios.put(API_URL+ID,{
    status:"closed"
   },config)
   return response.data
}



const TicketServices={
    closeTickets,createTicket,getTickets,getSingleTickets
} 
export default TicketServices