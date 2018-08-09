import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , CardActions, CreateButton, RefreshButton, Filter
  , DisabledInput, SimpleForm, TextInput
  , ReferenceInput, SelectInput, ReferenceField
  , required, maxLength, email } from 'react-admin';

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
        <TextInput label="Name" source="kn" />
      </Filter>
  );

  export const PocList = (props) => (
      <List {...props} actions={<ListActions />} title="POCs" filters={<KeynameFilter />} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="email" />
            <TextField source="phNum" />
            <ReferenceField source="risso"
              reference="user_locations" 
              label="RISSO"
              linkType={false}
            >
              <TextField source="keyname" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

const PocTitle = ({ record }) => {
    return <span>Poc {record ? `"${record.keyname}"` : ''}</span>;
};

export const PocEdit = (props) => (
    <Edit title="POC" keyname={<PocTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" label="Name" validate={[required(), maxLength(80)]} />
            <TextInput source="email" label="Email" validate={[required(), email()]} />
            <TextInput source="phNum" />
            <ReferenceInput label="RISSO (for FISMA use only)" source="risso"
              reference="user_locations" defaultValue= "24" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const PocCreate = (props) => (
    <Create title="POC" {...props}>
        <SimpleForm>
            <TextInput source="keyname" label="Name" validate={[required(), maxLength(80)]} />
            <TextInput source="email" validate={[required(), email()]} />
            <TextInput source="phNum" />
            <ReferenceInput label="RISSO (for FISMA use only)" source="risso"
              reference="user_locations" defaultValue= "24" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
