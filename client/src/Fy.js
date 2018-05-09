
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const FyList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const FyTitle = ({ record }) => {
    return <span>Fy {record ? `"${record.keyname}"` : ''}</span>;
};

export const FyEdit = (props) => (
    <Edit keyname={<FyTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
        </SimpleForm>
    </Edit>
);

export const FyCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
        </SimpleForm>
    </Create>
);
