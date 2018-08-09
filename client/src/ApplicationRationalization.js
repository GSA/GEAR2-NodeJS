import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , SimpleForm, TextInput, LongTextInput
  , CardActions, CreateButton, RefreshButton, Filter
  , ReferenceInput, SelectInput, ReferenceField
  , required, minValue, maxValue, choices } from 'react-admin';

import { timeValues } from './valuelists';
  
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
        <ReferenceInput source="objApplicationId" label="Application Name"
			  reference="applications"
			  sort={{ field: 'keyname', order: 'ASC' }}
			  perPage={ 1000000 }
			  allowEmpty>
			  <SelectInput optionText="keyname" />
			</ReferenceInput>
      </Filter>
  );

  export const ApplicationRationalizationList = (props) => (
      <List {...props} actions={<ListActions />} title="Application Rationalization" filters={<KeynameFilter />} >
        <Datagrid>
            <ReferenceField label="Application Name" source="objApplicationId" reference="applications">
                <TextField source="keyname" />
            </ReferenceField>
            <TextField source="fy" />
            <TextField source="timeVal" />
            <EditButton />
        </Datagrid>
    </List>
);

const ApplicationRationalizationTitle = ({ record }) => {
    return <span>Application Rationalization </span>;
};

export const ApplicationRationalizationEdit = (props) => (
    <Edit keyname={<ApplicationRationalizationTitle />} {...props}>
        <SimpleForm>
			<ReferenceInput source="objApplicationId" validate={required()}
			  label="Application Name"
			  reference="applications"
			  sort={{ field: 'keyname', order: 'ASC' }}
			  perPage={ 1000000 }
			  allowEmpty>
			  <SelectInput optionText="keyname" />
			</ReferenceInput>
			
			<TextInput source="fy" label="FY"  validate={[required(), minValue(1950, "must be after 1950"), maxValue(2050, "must be before 2050")]} />
			<TextInput source="timeVal" label="TIME Val" validate={[required(), choices(timeValues, "Must input a valid TIME value")]} />
			<LongTextInput source="comment" label="TIME Notes"  />

        </SimpleForm>
    </Edit>
);

export const ApplicationRationalizationCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
			<ReferenceInput source="objApplicationId" validate={required()} 
			  label="Application Name"
			  reference="applications"
			  sort={{ field: 'keyname', order: 'ASC' }}
			  perPage={ 1000000 }
			  allowEmpty>
			  <SelectInput optionText="keyname" />
			</ReferenceInput>
			
			<TextInput source="fy" label="FY"  validate={[required(), minValue(1950, "must be after 1950"), maxValue(2050, "must be before 2050")]} />
			<TextInput source="timeVal" label="TIME Val" validate={[required(), choices(timeValues, "Must input a valid TIME value")]} />
			<LongTextInput source="comment" label="TIME Notes"  />

        </SimpleForm>
    </Create>
);
