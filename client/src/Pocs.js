// in src/posts.js
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput, BooleanInput } from 'admin-on-rest';

export const PocsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="email" />
            <TextField source="phNum" />
            <TextField source="risso" />
            <EditButton />
        </Datagrid>
    </List>
);

const PocsTitle = ({ record }) => {
    return <span>Pocs {record ? `"${record.keyname}"` : ''}</span>;
};

export const PocsEdit = (props) => (
    <Edit keyname={<PocsTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <TextInput source="email" />
            <TextInput source="phNum" />
            <BooleanInput source="risso" />
        </SimpleForm>
    </Edit>
);

export const PocsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <TextInput source="email" />
            <TextInput source="phNum" />
            <BooleanInput source="risso" />
        </SimpleForm>
    </Create>
);
