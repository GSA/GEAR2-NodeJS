
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'react-admin';

export const ParentSystemCostList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="fy" />
            <TextField source="objParentSystemId" />
            <TextField source="source" />
            <EditButton />
        </Datagrid>
    </List>
);

const ParentSystemCostTitle = ({ record }) => {
    return <span>ParentSystemCost {record ? `"${record.keyname}"` : ''}</span>;
};

export const ParentSystemCostEdit = (props) => (
    <Edit keyname={<ParentSystemCostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="fy" />
            <DisabledInput source="objParentSystemId" />
            <TextInput source="dme" />
            <TextInput source="om" />
            <TextInput source="total" />
            <LongTextInput source="source" />
        </SimpleForm>
    </Edit>
);

export const ParentSystemCostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="fy" />
            <TextInput source="objParentSystemId" />
            <TextInput source="dme" />
            <TextInput source="om" />
            <TextInput source="total" />
            <LongTextInput source="source" />
        </SimpleForm>
    </Create>
);
