
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'react-admin';

export const FismaArtifactList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="link" />
            <EditButton />
        </Datagrid>
    </List>
);

const FismaArtifactTitle = ({ record }) => {
    return <span>FismaArtifact {record ? `"${record.keyname}"` : ''}</span>;
};

export const FismaArtifactEdit = (props) => (
    <Edit keyname={<FismaArtifactTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="link" />
        </SimpleForm>
    </Edit>
);

export const FismaArtifactCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="link" />
        </SimpleForm>
    </Create>
);
