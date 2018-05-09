import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const OmbSupportedGoalList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const OmbSupportedGoalTitle = ({ record }) => {
    return <span>OmbSupportedGoal {record ? `"${record.keyname}"` : ''}</span>;
};

export const OmbSupportedGoalEdit = (props) => (
    <Edit keyname={<OmbSupportedGoalTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
        </SimpleForm>
    </Edit>
);

export const OmbSupportedGoalCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
        </SimpleForm>
    </Create>
);
