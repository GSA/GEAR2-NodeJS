import React from 'react';
import { List, Edit, Create, Datagrid, DateField, TextField, EditButton,
  ArrayInput, BooleanInput, DateInput, DisabledInput, LongTextInput, ReferenceInput, SelectInput,
  SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

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

            <ArrayInput source="fismaArtifacts">
              <SimpleFormIterator>
                <TextInput source="keyname" />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="fisma_issm">
              <SimpleFormIterator>
                <TextInput source="keyname" />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="fisma_isso">
              <SimpleFormIterator>
                <TextInput source="keyname" />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="fisma_replacedby">
              <SimpleFormIterator>
                <TextInput source="keyname" />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="technologies  ">
              <SimpleFormIterator>
                <TextInput source="keyname" />
              </SimpleFormIterator>
            </ArrayInput>

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

          <ArrayInput source="fismaArtifacts">
            <SimpleFormIterator>
              <TextInput source="keyname" />
            </SimpleFormIterator>
          </ArrayInput>

        </SimpleForm>
    </Create>
);