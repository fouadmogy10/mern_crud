import axios from "axios"

const API_URL ='/api/tickets/'

// createTicket

const createNote = async ({noteText,id},token)=>{
    const config ={
        headers :{
                    Authorization :`Bearer ${token}`
                }
}
   const response = await axios.post(API_URL+id+"/notes",{
    text:noteText
   },config)
   return response.data
}

// get note
const getNote = async (id,token)=>{
    const config ={
        headers :{
                    Authorization :`Bearer ${token}`
                }
}
   const response = await axios.get(API_URL+id+"/notes",config)
   return response.data
}

const NoteServices={
    createNote,getNote
} 
export default NoteServices