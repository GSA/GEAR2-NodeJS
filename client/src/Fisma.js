import React from 'react';
import { List, Edit, Create, Datagrid, DateField, TextField
  , EditButton, ArrayInput, DateInput, DisabledInput
  , LongTextInput, ReferenceInput, SelectInput, SimpleForm
  , SimpleFormIterator, TextInput
  , required, maxLength } from 'react-admin';

import { ConfirmChoices, FedOrContractor } from './valuelists';
import { dateFormatter, dateParser } from './formatters/DateTime';

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
      <TextInput source="keyname" validate={[required(), maxLength(80)]} />
      <LongTextInput source="description" />
      <TextInput source="fismaSysId" />
      <SelectInput source="fedCtrLocated" allowEmpty
        optionText="name" optionValue="name"
        choices={ FedOrContractor }
      />
    <DateInput source="atoDate"
      format={dateFormatter} parse={dateParser} />
      <SelectInput source="interimAto" label="Interim ATO" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <DateInput source="atoRenewalDate"
        format={dateFormatter} parse={dateParser} />
      <DateInput source="inactiveDate"
        format={dateFormatter} parse={dateParser} />
      <SelectInput source="currentFyFismaAssessment" label="Current FY FISMA Assessment"
        allowEmpty optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <SelectInput source="pii" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <SelectInput source="cloudHosted" label="Cloud Hosted" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <ReferenceInput label="Cloud Service Type" source="fscloudstId" reference="fsCloudSt" allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <LongTextInput source="comments" />
      <ArrayInput source="fismaArtifacts"  label="FISMA Artifacts">
        <SimpleFormIterator>
          <TextInput source="keyname" />
          <TextInput source="link" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="fisma_issm" label="ISSM">
        <SimpleFormIterator>
          <TextInput source="keyname" />
          <TextInput source="email" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="fisma_isso" label="ISSO">
        <SimpleFormIterator>
          <TextInput source="keyname" />
          <TextInput source="email" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="fisma_replacedby">
        <SimpleFormIterator>
          <TextInput source="keyname" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="technologies">
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
      <TextInput source="keyname" validate={[required(), maxLength(80)]} />
      <LongTextInput source="description" />
      <TextInput source="fismaSysId" label="FISMA System ID"/>
      <SelectInput source="fedCtrLocated" allowEmpty
        optionText="name" optionValue="name"
        choices={ FedOrContractor }
      />
      <DateInput source="atoDate" label="ATO Date"
        format={dateFormatter} parse={dateParser} />
      <SelectInput source="interimAto" label="Interim ATO" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <DateInput source="atoRenewalDate" label="ATO Renewal Date"
        format={dateFormatter} parse={dateParser} />
      <DateInput source="inactiveDate" label="Inactive Date"
        format={dateFormatter} parse={dateParser} />
      <SelectInput source="currentFyFismaAssessment" label="Current FY FISMA Assessment"
        allowEmpty optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <SelectInput source="pii" label="PII" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <ReferenceInput label="SO" source="obj_poc_so_Id"
        reference="poc" allowEmpty>
        <SelectInput optionText="keyname" />
      </ReferenceInput>
      <SelectInput source="cloudHosted" label="Cloud Hosted" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <ReferenceInput label="Cloud Service Type" source="fscloudstId" reference="fsCloudSt" allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <LongTextInput source="comments" />
      <ArrayInput source="fismaArtifacts"  label="FISMA Artifacts">
        <SimpleFormIterator>
          <TextInput source="keyname" />
          <TextInput source="link" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="fisma_issm" label="ISSM">
        <SimpleFormIterator>
          <TextInput source="keyname" />
          <TextInput source="email" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="fisma_isso" label="ISSO">
        <SimpleFormIterator>
          <TextInput source="keyname" />
          <TextInput source="email" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="fisma_replacedby">
        <SimpleFormIterator>
          <TextInput source="keyname" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="technologies">
        <SimpleFormIterator>
          <TextInput source="keyname" />
        </SimpleFormIterator>
      </ArrayInput>

    </SimpleForm>
  </Create>
);
