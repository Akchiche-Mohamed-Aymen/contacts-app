import { Button } from "@/components/ui/button"
import { Stack , Flex } from "@chakra-ui/react"
import { DataListItem, DataListRoot } from "@/components/ui/data-list"
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";

const Contact = ({contact , update , handleDelete}) => {
  return (
    <Stack gap="4" bgColor="#2c3f50" p="3" rounded="md" color="white">
      <DataListRoot size="lg" >
        <DataListItem  label="User Name : " value={contact.user} />
      </DataListRoot>
      <DataListRoot size="lg">
        <DataListItem label="Email : " value={contact.email} />
      </DataListRoot>
      <DataListRoot size="lg">
        <DataListItem label="Phone Number : " value={contact.phone} />
      </DataListRoot>
      <Flex justify="space-between">
          <Button bgColor = "red"  onClick = {()=> handleDelete(contact)}>
            <AiFillDelete />  
          </Button>
          <Button bgColor = "blue"  onClick = {()=>update(contact.id)}>
              <MdModeEditOutline />
          </Button>
      </Flex>
    </Stack>
  )
}

export default Contact;