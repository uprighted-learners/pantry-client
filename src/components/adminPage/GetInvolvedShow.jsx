import { 
    DateField, 
    EmailField, 
    Show, 
    SimpleShowLayout, 
    TextField 
} from 'react-admin';

import './AdminShow.css';

export const GetinvolvedShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="fullName" />
            <TextField source="phoneNumber" />
            <EmailField source="email" />
            <TextField source="message" />
            <TextField source="typeOfInquiry" />
            <DateField source="date" />
            <TextField source="id" />
        </SimpleShowLayout>
    </Show>
);