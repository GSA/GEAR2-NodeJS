
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'react-admin';

export const ApplicationRationalizationList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="fy" />
            <TextField source="timeVal" />
            <TextField source="comment" />
            <EditButton />
        </Datagrid>
    </List>
);

const ApplicationRationalizationTitle = ({ record }) => {
    return <span>ApplicationRationalization {record ? `"${record.keyname}"` : ''}</span>;
};

export const ApplicationRationalizationEdit = (props) => (
    <Edit keyname={<ApplicationRationalizationTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="fy" />
            <LongTextInput source="comment" />
        </SimpleForm>
    </Edit>
);

export const ApplicationRationalizationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="fy" />
            <LongTextInput source="comment" />
        </SimpleForm>
    </Create>
);
