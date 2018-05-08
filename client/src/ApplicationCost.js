
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'admin-on-rest';

export const ApplicationCostList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="fy" />
            <TextField source="dme" />
            <TextField source="om" />
            <TextField source="total" />
            <TextField source="source" />
            <TextField source="comment" />
            <EditButton />
        </Datagrid>
    </List>
);

const ApplicationCostTitle = ({ record }) => {
    return <span>ApplicationCost {record ? `"${record.keyname}"` : ''}</span>;
};

export const ApplicationCostEdit = (props) => (
    <Edit keyname={<ApplicationCostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <TextField source="fy" />
            <TextField source="dme" />
            <TextField source="om" />
            <TextField source="total" />
            <TextField source="source" />
            <LongTextInput source="comment" />
        </SimpleForm>
    </Edit>
);

export const ApplicationCostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <TextField source="fy" />
            <TextField source="dme" />
            <TextField source="om" />
            <TextField source="total" />
            <TextField source="source" />
            <LongTextInput source="comment" />
          </SimpleForm>
    </Create>
);
