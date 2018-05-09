
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'react-admin';

export const _blankList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const _blankTitle = ({ record }) => {
    return <span>_blank {record ? `"${record.keyname}"` : ''}</span>;
};

export const _blankEdit = (props) => (
    <Edit keyname={<_blankTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const _blankCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Create>
);
