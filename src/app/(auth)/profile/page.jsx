"use client";
import { Button } from "@heroui/react";
import { updateUser } from "@/lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
  import { toast, ToastContainer, } from 'react-toastify';
import {
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

export default function ProfilePage() {
  const handleUpdataUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log('in the form data', userData);

    // alert("Form submitted successfully!");

    const resData = await updateUser({
      name: userData.name
    })

    toast.success("Form submitted successfully!")
    
    console.log('afer submit user profile', resData);
  };


  return (
    
    <Form className="w-full max-w-96" onSubmit={handleUpdataUser}>
      
      <Fieldset>
        <Fieldset.Legend>Profile Settings</Fieldset.Legend>
        <Description>Update your profile information.</Description>
        <FieldGroup>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>

        </FieldGroup>
        <Fieldset.Actions>
          <Button type="submit">
            <FloppyDisk />
            Save changes
          </Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </Fieldset.Actions>
      </Fieldset>
        <ToastContainer />
    </Form>
  );
}