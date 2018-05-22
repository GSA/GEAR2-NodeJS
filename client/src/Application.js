import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';

export const ApplicationList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const ApplicationTitle = ({ record }) => {
    return <span>Application {record ? `"${record.keyname}"` : ''}</span>;
};

export const ApplicationEdit = (props) => (
    <Edit keyname={<ApplicationTitle />} {...props}>
        <SimpleForm>
          <ReferenceInput label="applicationStatus" source="objApplicationStatusId" reference="applicationStatus">
            <SelectInput optionText="keyname" />
          </ReferenceInput>
          <ReferenceInput label="appHostingProvider" source="objAppHostingproviderId" reference="appHostingProvider">
            <SelectInput optionText="keyname" />
          </ReferenceInput>
          <DisabledInput source="id" />
          <TextInput source="keyname" />
          <LongTextInput source="description" />
          <TextInput source="displayName" />
          <TextInput source="applicationAlias" />
          <TextInput source="cloudIndicator" />
          <TextInput source="mobileAppIndicator" />
          <TextInput source="desktopIndicator" />
          <TextInput source="regionalClassification" />
          <TextInput source="applicationOrWebsite" />
          <TextInput source="numberOfUsers" />
          <TextInput source="generateRevenueIndicator" />
          <TextInput source="applicationNotes" />
          <TextInput source="tier" />
          <TextInput source="productionYear" />
          <TextInput source="retiredYear" />
          <TextInput source="url" />
          <TextInput source="timeNotes" />
          <TextInput source="cuiIndicator" />
          <TextInput source="uniqueIdentifierCode" />
          <TextInput source="referenceDocument" />

        </SimpleForm>
    </Edit>
);

export const ApplicationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <ReferenceInput label="applicationStatus" source="objApplicationStatusId" reference="applicationStatus">
            <SelectInput optionText="keyname" />
          </ReferenceInput>
          <TextInput source="keyname" />
          <LongTextInput source="description" />
          <TextInput source="displayName" />
          <TextInput source="applicationAlias" />
          <TextInput source="cloudIndicator" />
          <TextInput source="mobileAppIndicator" />
          <TextInput source="desktopIndicator" />
          <TextInput source="regionalClassification" />
          <TextInput source="applicationOrWebsite" />
          <TextInput source="numberOfUsers" />
          <TextInput source="generateRevenueIndicator" />
          <TextInput source="applicationNotes" />
          <TextInput source="tier" />
          <TextInput source="productionYear" />
          <TextInput source="retiredYear" />
          <TextInput source="url" />
          <TextInput source="timeNotes" />
          <TextInput source="cuiIndicator" />
          <TextInput source="uniqueIdentifierCode" />
          <TextInput source="referenceDocument" />

        </SimpleForm>
    </Create>
);