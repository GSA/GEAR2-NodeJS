import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , DisabledInput, LongTextInput, SimpleForm, TextInput, AutocompleteInput
  , SelectInput, ReferenceInput
  , required, maxLength } from 'react-admin';

import { ConfirmChoices } from './valuelists';

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
        <TextInput label="Investments Name" source="kn" />
      </Filter>
  );

export const InvestmentList  = (props) => (
    <List {...props} actions={<ListActions />} title="Investment Name" filters={<KeynameFilter />} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" label="Investment Name"/>
            <TextField source="description" label="Description"/>
            <EditButton />
        </Datagrid>
    </List>
);

const InvestmentTitle = ({ record }) => {
    return <span>Investment {record ? `"${record.keyname}"` : ''}</span>;
};

export const InvestmentEdit = (props) => (
    <Edit undoable={false} keyname={<InvestmentTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" label="Investment Name" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
              <SelectInput source="active" allowEmpty
                optionText="name" 
                choices={ ConfirmChoices }
              />
            <TextInput source="budgetYear" />
            <TextInput source="uii" />
            <ReferenceInput label="Primary Service Area" source="primaryServiceArea"
              reference="capabilities" allowEmpty>
              <AutocompleteInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Investment Type" source="objInvestmentTypeId"
              reference="investment_types"
              validate={required()}
            >
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organizations"
              perPage={ 1000000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 1" source="secServArea1"
              reference="capabilities"
              allowEmpty>
              <AutocompleteInput optionText="keyname" />
            </ReferenceInput>

			{/*             <ReferenceInput label="Service Area 2" source="secServArea2"
              reference="capabilities" allowEmpty>
              <AutocompleteInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 3" source="secServArea3"
              reference="capabilities" allowEmpty>
              <AutocompleteInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 4" source="secServArea4"
              reference="capabilities" allowEmpty>
              <AutocompleteInput optionText="keyname" />
            </ReferenceInput> */}

            <ReferenceInput label="POC" source="objPocId"
              reference="pocs"
              perPage={1000000}
              allowEmpty>
              <AutocompleteInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const InvestmentCreate = (props) => (
    <Create undoable={false} {...props}>
        <SimpleForm>
            <TextInput source="keyname" label="Investment Name" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
            <SelectInput source="active" allowEmpty
              optionText="name" 
              choices={ ConfirmChoices }
            />
            <TextInput source="budgetYear" />
            <TextInput source="uii" />
            <ReferenceInput label="Primary Service Area" source="primaryServiceArea"
              reference="capabilities" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Investment Type" source="objInvestmentTypeId"
              reference="investment_types"
              validate={required()}
            >
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organizations"
              perPage={1000000}
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

			{  /*  <ReferenceInput label="Service Area 1" source="secServArea1"
              reference="capabilities" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 2" source="secServArea2"
              reference="capabilities" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 3" source="secServArea3"
              reference="capabilities" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 4" source="secServArea4"
              reference="capabilities" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput> */}

            <ReferenceInput label="POC" source="objPocId"
              reference="pocs"
              perPage={1000000}
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
