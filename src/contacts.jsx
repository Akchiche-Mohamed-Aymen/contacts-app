import Contact from "./Contact"
import { useSelector , useDispatch } from 'react-redux'
import { Stack , Flex  , Input , useDialog} from "@chakra-ui/react"
import { DataListItem, DataListRoot } from "@/components/ui/data-list"
import { Button } from "@/components/ui/button"
import ContactForm from "./ContactForm"
import { IoMdAdd } from "react-icons/io";
import {useState , useMemo} from 'react'
import { deleteContact } from './features/contactSlice'
import Swal from 'sweetalert2'

//=================================================
const Contacts = () => {
  const dialog = useDialog()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.contacts.contactsData)
  const [id , setId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const [search , setSearch] = useState("")
  const currentContacts = data.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(data.length / contactsPerPage);
   const update = (i)=>{
    setId(i)
    dialog.setOpen(true)
   }
   function handleDelete(contact){
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteContact(contact))
        Swal.fire({
          title: "Deleted!",
          text: "Contact has been deleted.",
          icon: "success"
        });
  }})}
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(currentPage)
  const appear = useMemo(()=>{
      if(search.length === 0)
        return currentContacts
      const s = search.toLowerCase()
      return data.filter(item => item.user.toLowerCase().includes(s) || item.email.toLowerCase().includes(s) || item.phone.toLowerCase().includes(s) )
  },[  search , currentPage])
  return (
    <Flex  gap="4" direction="column" mt="15">
        <Flex gap="4">
           {Array.from({ length: totalPages }, (_, index) => (
          <Button colorPalette="teal" variant="solid"
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
            </Button>
        ))
               
           }
        </Flex>
        <Input placeholder="Search Contact ..." width="400px" variant="outline" value = {search} onChange = {(e)=>setSearch(e.target.value)} />
        <DataListRoot orientation="vertical" divideY="1px">
          {search.length > 0 && appear.length == 0 && <h1 style={{fontSize : "30px" , textAlign : "center"}}>401 ... Contact Not Found</h1>}
        {appear.map(item =><Contact key = {item.id} contact = {item} update = {update} handleDelete = {handleDelete}  />)}
        </DataListRoot>
            
        <Button size="xl" onClick = {()=> dialog.setOpen(true)} bgColor="green" color="white">
            <IoMdAdd /> Add New Contact
        </Button>

        {dialog.open && <ContactForm dialog = {dialog} id = {id}/>}
    </Flex>
  )
}

export default Contacts
