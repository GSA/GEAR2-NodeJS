import React from 'react';
import { List, Edit, Create, ChipField, Datagrid, DateField, TextField, EditButton,
  BooleanInput, DateInput, DisabledInput, LongTextInput, ReferenceInput, SelectInput,
  SimpleForm, TextInput, ReferenceManyField, SingleFieldList, UrlField } from 'admin-on-rest';
import AssocListNested from './AssocListNested'

export const FismaList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <DateField source="createDtg" showTime />
            <DateField source="changeDtg" showTime />
            <EditButton />
        </Datagrid>
    </List>
);

const FismaTitle = ({ record }) => {
    return <span>Fisma {record ? `"${record.keyname}"` : ''}</span>;
};

export const FismaEdit = (props) => (
    <Edit keyname={<FismaTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <TextInput source="fismaSysId" />
            <TextInput source="fedCtrLocated" />
            <DateInput source="atoDate" />
            <BooleanInput source="interimAto" />
            <DateInput source="atoRenewalDate" />
            <DateInput source="inactiveDate" />
            <TextInput source="currentFyFismaAssessment" />
            <BooleanInput source="pii" />
            <BooleanInput source="cloudHosted" />
            <ReferenceInput label="CloudST" source="fscloudstId" reference="fsCloudSt" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
            <LongTextInput source="comments" />
        </SimpleForm>
    </Edit>
);

export const FismaCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="keyname" />
          <LongTextInput source="description" />
          <TextInput source="fismaSysId" />
          <TextInput source="fedCtrLocated" />
          <DateInput source="atoDate" />
          <BooleanInput source="interimAto" />
          <DateInput source="atoRenewalDate" />
          <DateInput source="inactiveDate" />
          <TextInput source="currentFyFismaAssessment" />
          <BooleanInput source="pii" />
          <BooleanInput source="cloudHosted" />
          <ReferenceInput label="CloudST" source="fscloudstId" reference="fsCloudSt" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>
          <LongTextInput source="comments" />
        </SimpleForm>
    </Create>
);
