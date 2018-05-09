
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const PortfolioList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const PortfolioTitle = ({ record }) => {
    return <span>Portfolio {record ? `"${record.keyname}"` : ''}</span>;
};

export const PortfolioEdit = (props) => (
    <Edit keyname={<PortfolioTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
        </SimpleForm>
    </Edit>
);

export const PortfolioCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
        </SimpleForm>
    </Create>
);
