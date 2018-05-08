
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'admin-on-rest';

export const OrganizationList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const OrganizationTitle = ({ record }) => {
    return <span>Organization {record ? `"${record.keyname}"` : ''}</span>;
};

export const OrganizationEdit = (props) => (
    <Edit keyname={<OrganizationTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const OrganizationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Create>
);
