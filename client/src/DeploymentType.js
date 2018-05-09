
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const DeploymentTypeList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const DeploymentTypeTitle = ({ record }) => {
    return <span>DeploymentType {record ? `"${record.keyname}"` : ''}</span>;
};

export const DeploymentTypeEdit = (props) => (
    <Edit keyname={<DeploymentTypeTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
        </SimpleForm>
    </Edit>
);

export const DeploymentTypeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
        </SimpleForm>
    </Create>
);
