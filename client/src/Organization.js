import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , DisabledInput, LongTextInput, SimpleForm, TextInput
  , required, maxLength } from 'react-admin';


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
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="displayName" validate={[required(), maxLength(25)]} />
            <TextInput source="link" />
            <TextInput source="parentId" />
        </SimpleForm>
    </Edit>
);

export const OrganizationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="displayName" validate={[required(), maxLength(25)]} />
            <TextInput source="link" />
            <TextInput source="parentId" />
        </SimpleForm>
    </Create>
);
