import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const TechnologyStatusList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const TechnologyStatusTitle = ({ record }) => {
    return <span>TechnologyStatus {record ? `"${record.keyname}"` : ''}</span>;
};

export const TechnologyStatusEdit = (props) => (
    <Edit keyname={<TechnologyStatusTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
        </SimpleForm>
    </Edit>
);

export const TechnologyStatusCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
        </SimpleForm>
    </Create>
);
