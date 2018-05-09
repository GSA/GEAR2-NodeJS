
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'react-admin';

export const InvestmentCostList = (props) => (
    <List {...props}>
      <Datagrid>
        <TextField source="fy" />
        <TextField source="objInvestmentId" />
        <TextField source="dme" />
        <TextField source="om" />
        <TextField source="total" />
        <TextField source="source" />
        <EditButton />
      </Datagrid>
    </List>
);

const InvestmentCostTitle = ({ record }) => {
    return <span>InvestmentCost {record ? `"${record.keyname}"` : ''}</span>;
};

export const InvestmentCostEdit = (props) => (
    <Edit keyname={<InvestmentCostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="fy" />
            <DisabledInput source="objInvestmentId" />
            <TextInput source="dme" />
            <TextInput source="om" />
            <TextInput source="total" />
            <LongTextInput source="source" />
        </SimpleForm>
    </Edit>
);

export const InvestmentCostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="fy" />
          <TextInput source="objInvestmentId" />
          <TextInput source="dme" />
          <TextInput source="om" />
          <TextInput source="total" />
          <LongTextInput source="source" />
        </SimpleForm>
    </Create>
);
