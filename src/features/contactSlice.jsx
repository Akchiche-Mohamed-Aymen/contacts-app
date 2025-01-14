import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { toaster } from "@/components/ui/toaster"
import Swal from 'sweetalert2'
const initialState = {
  contactsData: JSON.parse(localStorage.getItem("contacts")) || [],
  //
}
function saveContacts(contacts){
  localStorage.setItem("contacts", JSON.stringify(contacts));
}
function Toast(title , text , icon){
  Swal.fire({
    title,
    text,
    icon
  });
}
export const contactsSlice = createSlice({
  name: 'contactsData',
  initialState,
  reducers: {
    addContact: (state, action) => {
      const newContact = {...action.payload , id : uuidv4()}
      state.contactsData = [newContact , ...state.contactsData]
      Toast("SUCCESS", "New Contact Added" , "success")
      saveContacts(state.contactsData)
    },
    updateContact: (state, action) => {
      state.contactsData = state.contactsData.map(item =>{
        if(item.id !== action.payload.id )
           return item
        return action.payload
      })
      saveContacts(state.contactsData)
      Toast("SUCCESS", " Contact Updated" , "success")
     
    },
    deleteContact: (state, action) => {
          state.contactsData = state.contactsData.filter(item =>item.id !== action.payload.id )
          saveContacts(state.contactsData)
     },
      }
  });

// Action creators are generated for each case reducer function
export const { addContact, updateContact, deleteContact } = contactsSlice.actions

export default contactsSlice.reducer