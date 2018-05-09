import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput } from 'react-admin';

export const TechnologyList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const TechnologyTitle = ({ record }) => {
    return <span>Technology {record ? `"${record.keyname}"` : ''}</span>;
};

export const TechnologyEdit = (props) => (
    <Edit keyname={<TechnologyTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <TextInput source="approvedStatusExpirationDate" />
            <TextInput source="vendorStandardOrganization" />
            <TextInput source="availableThroughMyview" />
            <TextInput source="goldImage" />
            <LongTextInput source="goldImageComment" />
            <LongTextInput source="comments" />
            <TextInput source="objTechnologyStatusId" />
            <TextInput source="objDeploymentTypeId" />
            <TextInput source="objStandardTypeId" />
        </SimpleForm>
    </Edit>
);

export const TechnologyCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <TextInput source="approvedStatusExpirationDate" />
            <TextInput source="vendorStandardOrganization" />
            <TextInput source="availableThroughMyview" />
            <TextInput source="goldImage" />
            <LongTextInput source="goldImageComment" />
            <LongTextInput source="comments" />
            <TextInput source="objTechnologyStatusId" />
            <TextInput source="objDeploymentTypeId" />
            <TextInput source="objStandardTypeId" />
        </SimpleForm>
    </Create>
);
