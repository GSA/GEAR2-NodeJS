import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'react-admin';

export const StandardCategoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <TextField source="objStandardCategoryParentId" />
            <EditButton />
        </Datagrid>
    </List>
);

const StandardCategoryTitle = ({ record }) => {
    return <span>StandardCategory {record ? `"${record.keyname}"` : ''}</span>;
};

export const StandardCategoryEdit = (props) => (
    <Edit keyname={<StandardCategoryTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <TextInput source="objStandardCategoryParentId" />
        </SimpleForm>
    </Edit>
);

export const StandardCategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <TextInput source="objStandardCategoryParentId" />
        </SimpleForm>
    </Create>
);
