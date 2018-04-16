// in src/posts.js
import React from 'react';
import { List, Edit, Create, ChipField, Datagrid, DateField, TextField, EditButton,
  BooleanInput, DateInput, DisabledInput, LongTextInput,
  SimpleForm, TextInput, ReferenceManyField, SingleFieldList, UrlField } from 'admin-on-rest';

export const FismaList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
              <ReferenceManyField label="Artifacts" reference="artifacts" target="fisma_id">
                  <SingleFieldList>
                      <UrlField source="keyname" />
                  </SingleFieldList>
              </ReferenceManyField>
            <TextField source="keyname" />
            <TextField source="description" />
            <DateField source="atoRenewalDate" />
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
          <LongTextInput source="comments" />
        </SimpleForm>
    </Create>
);
