import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const CapabilityList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="referenceNumber" />
            <EditButton />
        </Datagrid>
    </List>
);

const CapabilityTitle = ({ record }) => {
    return <span>Capability {record ? `"${record.keyname}"` : ''}</span>;
};

export const CapabilityEdit = (props) => (
    <Edit keyname={<CapabilityTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <TextInput source="referenceNumber" />
            <TextInput source="parentId" />
        </SimpleForm>
    </Edit>
);

export const CapabilityCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <TextInput source="referenceNumber" />
            <TextInput source="parentId" />
        </SimpleForm>
    </Create>
);
