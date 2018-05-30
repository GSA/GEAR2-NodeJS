
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput, SelectInput, ReferenceInput } from 'react-admin';

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
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
            <TextInput source="active" />
            <TextInput source="budgetYear" />
            <TextInput source="uii" />
            <TextInput source="primaryServiceArea" />

          <ReferenceInput label="Investment Type" source="objInvestmentTypeId"
              reference="investmentType"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organization"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 1" source="secServArea1"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 2" source="secServArea2"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 3" source="secServArea3"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 4" source="secServArea4"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="POC" source="objPocId"
              reference="poc" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>


        </SimpleForm>
    </Edit>
);

export const InvestmentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="keyname" />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
            <TextInput source="active" />
            <TextInput source="budgetYear" />
            <TextInput source="uii" />
            <TextInput source="primaryServiceArea" />

            <ReferenceInput label="Investment Type" source="objInvestmentTypeId"
              reference="investmentType"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organization"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 1" source="secServArea1"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 2" source="secServArea2"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 3" source="secServArea3"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 4" source="secServArea4"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="POC" source="objPocId"
              reference="poc" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
