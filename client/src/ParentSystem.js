
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput, SelectInput, ReferenceInput } from 'react-admin';
import { required } from './validators';

export const ParentSystemList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const ParentSystemTitle = ({ record }) => {
    return <span>ParentSystem {record ? `"${record.keyname}"` : ''}</span>;
};

export const ParentSystemEdit = (props) => (
    <Edit keyname={<ParentSystemTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" validate={required} />
            <LongTextInput source="description" />
            <TextInput source="url" />
            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organization"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const ParentSystemCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" validate={required} />
            <LongTextInput source="description" />
            <TextInput source="url" />
            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organization"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
