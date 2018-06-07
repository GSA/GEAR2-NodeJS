import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, DateInput, TextInput, SelectInput,
  ReferenceInput } from 'react-admin';

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
            <DateInput source="approvedStatusExpirationDate" />
            <TextInput source="vendorStandardOrganization" />
            <SelectInput source="availableThroughMyview" label="Available through MyView" allowEmpty
              optionText="name" optionValue="name"
              choices={[
                {id: 1, name: "TBD"},
                {id: 2, name: "Yes"},
                {id: 3, name: "No"},
              ]}
            />
            <SelectInput source="goldImage" label="Gold Image" allowEmpty
              optionText="name" optionValue="name"
              choices={[
                {id: 1, name: "TBD"},
                {id: 2, name: "Yes"},
                {id: 3, name: "No"},
              ]}
            />
            <LongTextInput source="goldImageComment" />
            <LongTextInput source="comments" />

            <ReferenceInput label="Status" source="objTechnologyStatusId"
              reference="technologyStatus" >
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Deployment Type" source="objDeploymentTypeId"
              reference="deploymentType"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Standard Type" source="objStandardTypeId"
              reference="standardType"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const TechnologyCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <DateInput source="approvedStatusExpirationDate" />
            <TextInput source="vendorStandardOrganization" />
            <SelectInput source="availableThroughMyview" label="Available through MyView" allowEmpty
              optionText="name" optionValue="name"
              choices={[
                {id: 1, name: "TBD"},
                {id: 2, name: "Yes"},
                {id: 3, name: "No"},
              ]}
            />
            <SelectInput source="goldImage" label="Gold Image" allowEmpty
              optionText="name" optionValue="name"
              choices={[
                {id: 1, name: "TBD"},
                {id: 2, name: "Yes"},
                {id: 3, name: "No"},
              ]}
            />
            <LongTextInput source="goldImageComment" />
            <LongTextInput source="comments" />

            <ReferenceInput label="Status" source="objTechnologyStatusId"
              reference="technologyStatus"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Deployment Type" source="objDeploymentTypeId"
              reference="deploymentType"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Standard Type" source="objStandardTypeId"
              reference="standardType"
              allowEmpty>
              <SelectInput optionText="keyName" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
