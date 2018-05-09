import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const ReferenceDocumentList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const ReferenceDocumentTitle = ({ record }) => {
    return <span>ReferenceDocument {record ? `"${record.keyname}"` : ''}</span>;
};

export const ReferenceDocumentEdit = (props) => (
    <Edit keyname={<ReferenceDocumentTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
        </SimpleForm>
    </Edit>
);

export const ReferenceDocumentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
        </SimpleForm>
    </Create>
);
