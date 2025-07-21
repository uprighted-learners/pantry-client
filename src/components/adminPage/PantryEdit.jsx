import { Edit, SimpleForm, TextInput, TextField } from 'react-admin';

import './AdminEdit.css';

export const PantryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="pantryName" />
            <TextInput source="address" />
            <TextInput source="city" />
            <TextInput source="state" />
            <TextInput source="zipCode" />
            <TextInput source="hours" />
            <TextInput source="requirements" />
            <TextInput source="contact" />
            <TextField source="id" />
        </SimpleForm>
    </Edit>
);