// in src/posts.js
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'admin-on-rest';

export const ArtifactsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="link" />
            <EditButton />
        </Datagrid>
    </List>
);

const ArtifactsTitle = ({ record }) => {
    return <span>Artifacts {record ? `"${record.keyname}"` : ''}</span>;
};

export const ArtifactsEdit = (props) => (
    <Edit keyname={<ArtifactsTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="link" />
        </SimpleForm>
    </Edit>
);

export const ArtifactsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="link" />
        </SimpleForm>
    </Create>
);
