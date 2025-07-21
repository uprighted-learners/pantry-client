import { Show, SimpleShowLayout, TextField } from 'react-admin';

import './AdminShow.css';

export const PantryShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="pantryName" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="zipCode" />
            <TextField source="hours" />
            <TextField source="requirements" />
            <TextField source="contact" />
            <TextField source="id" />
        </SimpleShowLayout>
    </Show>
); 