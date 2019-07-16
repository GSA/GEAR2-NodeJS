import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , SimpleForm, DisabledInput, LongTextInput, TextInput
  , ReferenceInput, SelectInput
  , required, maxLength } from 'react-admin';

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

  const KeynameFilter = props => (
      <Filter {...props}>
        <TextInput  label="Search" source="kn"  alwaysOn/>
      </Filter>
  );

export const CapabilityList  = (props) => (
    <List {...props} actions={<ListActions />} title="Business Capabilities" filters={<KeynameFilter />} bulkActionButtons={false} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" label="Capability Name" />
            <TextField source="referenceNumber" label="Reference Number"/>
            <EditButton />
        </Datagrid>
    </List>
);

const CapabilityTitle = ({ record }) => {
    return <span>Capability {record ? `"${record.keyname}"` : ''}</span>;
};

export const CapabilityEdit = (props) => (
    <Edit undoable={false} keyname={<CapabilityTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" label="Capability Name" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="referenceNumber" label="Reference Number"/>

            <ReferenceInput label="Parent" source="parentId"
              reference="capabilities" 
			  sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
		      allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const CapabilityCreate = (props) => (
    <Create undoable={false} {...props}>
        <SimpleForm>
            <TextInput source="keyname" label="Capability Name" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="referenceNumber" label="Reference Number"/>

            <ReferenceInput label="Parent" source="parentId"
              reference="capabilities" 
			  sort={{ field: 'keyname', order: 'ASC' }}
              perPage={ 1000000 }
			  allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
