import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , DisabledInput, LongTextInput, SimpleForm, TextInput
  , ReferenceInput, SelectInput
  , required, maxLength } from 'react-admin';


export const CapabilityList  = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="referenceNumber" />
            <EditButton />
        </Datagrid>
    </List>
);

const CapabilityTitle = ({ record }) => {
    return <span>Capability {record ? `"${record.keyname}"` : ''}</span>;
};

export const CapabilityEdit = (props) => (
    <Edit keyname={<CapabilityTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="referenceNumber" />

            <ReferenceInput label="Parent" source="parentId"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const CapabilityCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <TextInput source="referenceNumber" />

            <ReferenceInput label="Parent" source="parentId"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
