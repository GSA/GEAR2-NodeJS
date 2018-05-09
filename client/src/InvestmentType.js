
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const InvestmentTypeList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const InvestmentTypeTitle = ({ record }) => {
    return <span>InvestmentType {record ? `"${record.keyname}"` : ''}</span>;
};

export const InvestmentTypeEdit = (props) => (
    <Edit keyname={<InvestmentTypeTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />            
        </SimpleForm>
    </Edit>
);

export const InvestmentTypeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />            
        </SimpleForm>
    </Create>
);
