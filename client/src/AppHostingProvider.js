// in src/posts.js
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'admin-on-rest';

export const AppHostingList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const AppHostingTitle = ({ record }) => {
    return <span>AppHosting {record ? `"${record.keyname}"` : ''}</span>;
};

export const AppHostingEdit = (props) => (
    <Edit keyname={<AppHostingTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const AppHostingCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Create>
);
