import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton
  , DisabledInput, LongTextInput, SimpleForm, TextInput
  , SelectInput, ReferenceInput
  , required, maxLength } from 'react-admin';

import { ConfirmChoices } from './valuelists';

export const InvestmentList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="keyname" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const InvestmentTitle = ({ record }) => {
    return <span>Investment {record ? `"${record.keyname}"` : ''}</span>;
};

export const InvestmentEdit = (props) => (
    <Edit keyname={<InvestmentTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
              <SelectInput source="active" allowEmpty
                optionText="name" optionValue="name"
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
              perPage={ 1000000 }
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 1" source="secServArea1"
              reference="capabilities"
              allowEmpty>
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
            </ReferenceInput>

            <ReferenceInput label="POC" source="objPocId"
              reference="pocs"
              perPage={1000000}
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export const InvestmentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" validate={[required(), maxLength(80)]} />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
            <SelectInput source="active" allowEmpty
              optionText="name" optionValue="name"
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

            <ReferenceInput label="Service Area 1" source="secServArea1"
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
            </ReferenceInput>

            <ReferenceInput label="POC" source="objPocId"
              reference="pocs"
              perPage={1000000}
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
