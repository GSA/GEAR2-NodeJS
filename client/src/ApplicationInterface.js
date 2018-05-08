
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'admin-on-rest';

export const ApplicationInterfaceList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

const ApplicationInterfaceTitle = ({ record }) => {
    return <span>ApplicationInterface {record ? `"${record.keyname}"` : ''}</span>;
};

export const ApplicationInterfaceEdit = (props) => (
    <Edit keyname={<ApplicationInterfaceTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const ApplicationInterfaceCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);
