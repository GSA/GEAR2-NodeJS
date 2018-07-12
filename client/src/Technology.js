import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , SimpleForm, DisabledInput, LongTextInput, TextInput, NumberInput
  , ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput
  , required, maxLength } from 'react-admin';

import { ConfirmChoices } from './valuelists';
import { formatDate, parseDate } from './formatters/DateTime';

const ListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, push }) => (
    <CardActions>
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        }) }
        <CreateButton basePath={basePath} />
        <RefreshButton />
    </CardActions>
);

const KeynameFilter = props => (
    <Filter {...props}>
      <TextInput label="keyname" source="kn" />
    </Filter>
);

export const TechnologyList = (props) => (
    <List {...props} actions={<ListActions />}>
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
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <DateInput source="approvedStatusExpirationDate"
              parse={parseDate} format={formatDate} />
            <TextInput source="vendorStandardOrganization" />
            <SelectInput source="availableThroughMyview" label="Available through MyView" allowEmpty
              optionText="name" optionValue="name"
              choices={ ConfirmChoices }
            />
            <SelectInput source="goldImage" label="Gold Image" allowEmpty
              optionText="name" optionValue="name"
              choices={ ConfirmChoices }
            />
            <LongTextInput source="goldImageComment" />
            <LongTextInput source="comments" />

            <ReferenceInput label="Status" source="objTechnologyStatusId"
              reference="technologyStatus"
              validate={required()}
            >
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Deployment Type" source="objDeploymentTypeId"
              reference="deploymentType"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Standard Type" source="objStandardTypeId"
              reference="standardType"
              validate={required()}>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const TechnologyCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <DateInput source="approvedStatusExpirationDate"
              format={formatDate} parse={parseDate} />
            <TextInput source="vendorStandardOrganization" />
            <SelectInput source="availableThroughMyview" label="Available through MyView" allowEmpty
              optionText="name" optionValue="name"
              choices={ ConfirmChoices }
            />
            <SelectInput source="goldImage" label="Gold Image" allowEmpty
              optionText="name" optionValue="name"
              choices={ ConfirmChoices }
            />
            <LongTextInput source="goldImageComment" />
            <LongTextInput source="comments" />

            <ReferenceInput label="Status" source="objTechnologyStatusId"
              reference="technologyStatus"
              validate={required()}
            >
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Deployment Type" source="objDeploymentTypeId"
              reference="deploymentType"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Standard Type" source="objStandardTypeId"
              reference="standardType"
              validate={required()}>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
