import { Button } from "@/components/ui/button"
import React from 'react'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
 } from "@/components/ui/dialog"
import { Text } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { DialogRootProvider} from "@chakra-ui/react"
import { addContact, updateContact } from './features/contactSlice'
import {  useDispatch , useSelector} from 'react-redux'

//=============================================
const Contact = ({id = null , dialog}) => {

  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts.contactsData)
  const [data , setData] = React.useState(id? contacts.find(item => item.id == id)  :{user : "" , email : "" , phone : ""} )
  
  const handleContact = ()=>{
    dialog.setOpen(false)
    id ?dispatch(updateContact(data)) :  dispatch(addContact(data))
    
  };
  return (
    <>
    <DialogRootProvider value={dialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{id ? "Update" : "Add New "} Contact</DialogTitle>
        </DialogHeader>
        <DialogBody>
            <Text textStyle="xl">User Name :</Text>
            <Input placeholder="Enter User Name" value={data.user}  onChange = {e => setData({...data , user:e.target.value})}  my="3"  />
            <Text textStyle="xl">Email :</Text>
            <Input placeholder="Enter Email" value = {data.email} onChange = {e => setData({...data , email:e.target.value})} my="3" />
            <Text textStyle="xl">Phone Number</Text>
            <Input placeholder="Enter Phone Number" value = {data.phone} onChange = {e => setData({...data , phone:e.target.value})} my="3" />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button  bgColor="red">Cancel</Button>
          </DialogActionTrigger>
          <Button bgColor="green" onClick = {handleContact}>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRootProvider>
  
    </>
  )
}

export default Contact;