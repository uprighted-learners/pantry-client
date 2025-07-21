import { useMediaQuery } from "@mui/material";
import { 
    BooleanField, 
    Datagrid, 
    TextField, 
    EmailField, 
    List, 
    SimpleList, 
    TextInput,
    ReferenceInput
} from 'react-admin';

import "./AdminDash.css";

const userFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />
];

export const UserList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={userFilters}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.email}
                    tertiaryText={(record) => record.zipCode}
                />
            ) : (
                <Datagrid>
                    <TextField source="fullName" />
                    <TextField source="zipCode" />
                    <EmailField source="email" />
                    <BooleanField source="isAdmin" />
                    <TextField source="id" />
                </Datagrid>
            )}
        </List> 
    );
};