import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , SimpleForm, DisabledInput, LongTextInput, TextInput, DateInput
  , ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput
  , ArrayInput, SimpleFormIterator
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
    <List {...props} actions={<ListActions />} title="Technology" filters={<KeynameFilter />} >
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

            <ReferenceArrayInput source="poc" label="POCs"
              reference="poc"
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
            >
              <SelectArrayInput optionText="keyname" optionValue="id" />
            </ReferenceArrayInput>

            <ArrayInput source="referenceDocument"  label="Reference Documents">
              <SimpleFormIterator>
                <ReferenceInput label="Name" source="referenceDocument" reference="referenceDocument" allowEmpty>
                  <SelectInput optionText="keyname" optionValue="id" />
                </ReferenceInput>
              </SimpleFormIterator>
            </ArrayInput>

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
              <SelectInput optionText="keyname" value={1} />
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

            <ReferenceArrayInput source="poc" label="POCs"
              reference="poc"
              sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
            >
              <SelectArrayInput optionText="keyname" optionValue="id" />
            </ReferenceArrayInput>

        </SimpleForm>
    </Create>
);
