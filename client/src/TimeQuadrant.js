import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const TimeQuadrantList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const TimeQuadrantTitle = ({ record }) => {
    return <span>TimeQuadrant {record ? `"${record.keyname}"` : ''}</span>;
};

export const TimeQuadrantEdit = (props) => (
    <Edit keyname={<TimeQuadrantTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
        </SimpleForm>
    </Edit>
);

export const TimeQuadrantCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
        </SimpleForm>
    </Create>
);
