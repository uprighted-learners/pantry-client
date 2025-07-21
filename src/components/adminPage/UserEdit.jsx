import {
    BooleanInput,
    Edit,
    SimpleForm,
    TextField, 
    TextInput
} from 'react-admin';

import "./AdminEdit.css";

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            {/* The 'id' field should typically be displayed as read-only, not editable */}
            <TextField source="id" />
            <TextInput source="fullName" />
            <TextInput source="zipCode" />
            <TextInput source="email" />
            <BooleanInput source="isAdmin" />

            {/*  ---FUTURE DATA HANDLING---
                If your User model has 'createdAt' and 'updatedAt' from timestamps: true,
                you might want to display them as read-only dates:
            */}
            {/* <DateField source="createdAt" showTime label="Created At" /> */}
            {/* <DateField source="updatedAt" showTime label="Last Updated" /> */}

            {/*
                Important: If you need to handle user passwords:
                - Do NOT include 'password' as a TextInput directly as it will show hashes.
                - Use a <PasswordInput source="password" label="New Password (optional)" />
                  and ensure your backend only updates the password if this field is provided and hashed.
                  You would typically not display the existing hashed password.
            */}
            
        </SimpleForm>
    </Edit>
);
