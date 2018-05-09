import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const OmbSrmInfoList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const OmbSrmInfoTitle = ({ record }) => {
    return <span>OmbSrmInfo {record ? `"${record.keyname}"` : ''}</span>;
};

export const OmbSrmInfoEdit = (props) => (
    <Edit keyname={<OmbSrmInfoTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
        </SimpleForm>
    </Edit>
);

export const OmbSrmInfoCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
        </SimpleForm>
    </Create>
);
