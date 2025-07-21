import { 
    Datagrid, 
    DateField, 
    EmailField, 
    List, 
    TextField,
    TextInput,
    ReferenceInput,
    FunctionField
} from 'react-admin';

import "./AdminDash.css";

const getInvolvedFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />
];

export const GetInvolvedList = () => (
    <List filters={getInvolvedFilters}>
        <Datagrid>
            <TextField source="fullName" />
            <TextField source="phoneNumber" />
            <EmailField source="email" />
            <FunctionField 
                label="Exerpt of Email" 
                render={(record) => `${record.message.substring(0, 20)}...`} 
            />
            <TextField source="typeOfInquiry" />
            <DateField source="date" />
            <TextField source="id" />
        </Datagrid>
    </List>
);
