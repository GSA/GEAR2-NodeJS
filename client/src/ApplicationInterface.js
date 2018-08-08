import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , DisabledInput, SimpleForm, TextInput
  , CardActions, CreateButton, RefreshButton, Filter
  , ReferenceInput, SelectInput
  , ArrayInput, SimpleFormIterator
  , required, maxLength } from 'react-admin';

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

  export const ApplicationInterfaceList = (props) => (
      <List {...props} actions={<ListActions />} title="Application Interfaces" filters={<KeynameFilter />} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <EditButton />
        </Datagrid>
    </List>
);

const ApplicationInterfaceTitle = ({ record }) => {
    return <span>ApplicationInterface {record ? `"${record.keyname}"` : ''}</span>;
};

export const ApplicationInterfaceEdit = (props) => (
    <Edit keyname={<ApplicationInterfaceTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />

    <ReferenceInput source="objApplicationId" label="Source Application"
          reference="applications"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>

    <ReferenceInput source="objApplicationId1" label="Destination Application"
          reference="applications"
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
          allowEmpty>
          <SelectInput optionText="keyname" />
        </ReferenceInput>

        <ArrayInput source="piis"
            label="PII">
            <SimpleFormIterator>
              <ReferenceInput label="" source="id" reference="pii_categories" allowEmpty>
                <SelectInput optionText="keyname" />
              </ReferenceInput>
            </SimpleFormIterator>
        </ArrayInput>

        </SimpleForm>
    </Edit>
);

export const ApplicationInterfaceCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
		    <ReferenceInput source="objApplicationId" label="Source Application"
		      reference="applications" validate={[required()]}
			  sort={{ field: 'keyname', order: 'ASC' }}
			  perPage={ 10000 }
			  allowEmpty>
			  <SelectInput optionText="keyname" />
			</ReferenceInput>				
			<ReferenceInput source="objApplicationId1" label="Destination Application"
			  reference="applications" validate={[required()]}
			  sort={{ field: 'keyname', order: 'ASC' }}
			  perPage={ 10000 }
			  allowEmpty>
			  <SelectInput optionText="keyname" />
			</ReferenceInput>

 </SimpleForm>
    </Create>
);
