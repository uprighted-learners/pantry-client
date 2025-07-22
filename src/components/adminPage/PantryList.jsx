import { 
    Datagrid, 
    List, 
    TextField,
    TextInput,
    ReferenceInput
} from 'react-admin';

import "./AdminDash.css";

const pantryFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />
];

export const PantryList = () => (
    <List filters={pantryFilters}>
        <Datagrid> 
            <TextField source="id" />
            <TextField source="pantryName" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="zipCode" />
            <TextField source="hours" />
            <TextField source="requirements" />
            <TextField source="contact" /> 
            <TextField source="lat" /> 
            <TextField source="lng" /> 
        </Datagrid>
    </List>
);