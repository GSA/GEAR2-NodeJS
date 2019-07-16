import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , SimpleForm, DisabledInput, LongTextInput, TextInput, DateInput
  , ReferenceInput, SelectInput
  , ArrayInput, SimpleFormIterator
  , required, maxLength } from 'react-admin';

import {extractScopes} from "./authProvider";

import { ConfirmChoices, TechnologyStatuses, TechnologyStatusesDisabled } from './valuelists';
import { formatDate, parseDate } from './formatters/DateTime';

const ListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, push }) => (
    <CardActions>
        {/* filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        }) */ }
        <CreateButton basePath={basePath} />
        <RefreshButton />
    </CardActions>
);

const getPermissions = () => {
    return extractScopes();
}

const KeynameFilter = props => (
    <Filter {...props}>
      <TextInput label="Search" source="kn" alwaysOn/>
    </Filter>
);

export const TechnologyList = (props) => (
    <List {...props} actions={<ListActions />} title="Technology" filters={<KeynameFilter />} bulkActionButtons={false} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" label="Technology Name"/>
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const TechnologyTitle = ({ record }) => {
    return <span>Technology {record ? `"${record.keyname}"` : ''}</span>;
};

export const TechnologyEdit = ( {permissions, ...props }) => (
    <div>
    <Edit undoable={false} keyname={<TechnologyTitle />} { ...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" label="Technology Name" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <DateInput source="approvedStatusExpirationDate"
               />
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
            <LongTextInput source="reference_documents" />
            <LongTextInput source="comments" />

            {getPermissions().split(',').includes('appTechStatus:GET') ?
                <SelectInput label="Status" source="objTechnologyStatusId"
                             optionText="name" optionValue="id"
                             choices= { TechnologyStatusesDisabled }
                             validate={required()}
                />
                :
                <SelectInput label="Status" source="objTechnologyStatusId"
                             optionText="name" optionValue="id"
                             choices= { TechnologyStatuses }
                             validate={required()}
                />
            }

            <ReferenceInput label="Deployment Type" source="objDeploymentTypeId"
              reference="deployment_types"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Standard Type" source="objStandardTypeId"
              reference="standard_types"
              validate={required()}>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ArrayInput source="pocs" label="POCs">
              <SimpleFormIterator>
                <ReferenceInput label="" source="id"
                  reference="pocs"
                  sort={{ field: 'keyname', order: 'ASC' }}
                  perPage={ 1000000 }
                  allowEmpty
                >
                  <SelectInput optionText="keyname" />
                </ReferenceInput>
              </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source="categories"
              label="Standard Categories">
              <SimpleFormIterator>
                <ReferenceInput label=""
                  source="id"
                  reference="standard_categories"
                  sort={{ field: 'keyname', order: 'ASC' }}
                  perPage={ 1000000 }
                  allowEmpty
                >
                  <SelectInput optionText="keyname" />
                </ReferenceInput>
              </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source="replaced_by"
              label="Replaced By">
              <SimpleFormIterator>
                <ReferenceInput label=""
                  source="id"
                  reference="technologyreplacedbys"
                  sort={{ field: 'keyname', order: 'ASC' }}
                  perPage={ 1000000 }
                  allowEmpty
                >
                  <SelectInput optionText="keyname" />
                </ReferenceInput>
              </SimpleFormIterator>
            </ArrayInput>


        </SimpleForm>
    </Edit>
    </div>
);

export const TechnologyCreate = (props) => (
    <Create undoable={false} {...props}>
        <SimpleForm defaultValue={{objTechnologyStatusId: 1}}>
            <TextInput source="keyname" label="Technology Name" validate={[required(), maxLength(80)]} />
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
            <LongTextInput source="reference_documents" />
            <LongTextInput source="comments" />

            {getPermissions().split(',').includes('appTechStatus:GET') ?
                <SelectInput label="Status" source="objTechnologyStatusId"
                             optionText="name" optionValue="id"
                             choices= { TechnologyStatusesDisabled }
                             validate={required()}
                />
                :
                <SelectInput label="Status" source="objTechnologyStatusId"
                             optionText="name" optionValue="id"
                             choices= { TechnologyStatuses }
                             validate={required()}
                />
            }

            <ReferenceInput label="Deployment Type" source="objDeploymentTypeId"
              reference="deployment_types"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Standard Type" source="objStandardTypeId"
              reference="standard_types"
              validate={required()}>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
