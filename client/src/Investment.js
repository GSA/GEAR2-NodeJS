
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'react-admin';

export const InvestmentList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const InvestmentTitle = ({ record }) => {
    return <span>Investment {record ? `"${record.keyname}"` : ''}</span>;
};

export const InvestmentEdit = (props) => (
    <Edit keyname={<InvestmentTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
            <TextInput source="active" />
            <TextInput source="budgetYear" />
            <TextInput source="uii" />
            <TextInput source="objInvestmentTypeId" />
            <TextInput source="primaryServiceArea" />
            <TextInput source="secServArea1" />
            <TextInput source="secServArea2" />
            <TextInput source="secServArea3" />
            <TextInput source="secServArea4" />
            <TextInput source="objOrganizationId" />
            <TextInput source="objPocId" />
        </SimpleForm>
    </Edit>
);

export const InvestmentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
            <TextInput source="active" />
            <TextInput source="budgetYear" />
            <TextInput source="uii" />
            <TextInput source="objInvestmentTypeId" />
            <TextInput source="primaryServiceArea" />
            <TextInput source="secServArea1" />
            <TextInput source="secServArea2" />
            <TextInput source="secServArea3" />
            <TextInput source="secServArea4" />
            <TextInput source="objOrganizationId" />
            <TextInput source="objPocId" />
        </SimpleForm>
    </Create>
);
