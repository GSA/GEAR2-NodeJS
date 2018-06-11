/* jshint indent: 2 */
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  LongTextInput, SimpleForm, TextInput, SelectInput, ReferenceInput } from 'react-admin';
import { required } from './validators';

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
            <TextInput source="keyname" validate={required} />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
              <SelectInput source="active" allowEmpty
                optionText="name" optionValue="name"
                choices={[
                  {id: 1, name: "TBD"},
                  {id: 2, name: "Yes"},
                  {id: 3, name: "No"},
                ]}
              />
            <TextInput source="budgetYear" />
            <TextInput source="uii" />
            <ReferenceInput label="Primary Service Area" source="primaryServiceArea"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

          <ReferenceInput label="Investment Type" source="objInvestmentTypeId"
              reference="investmentType"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organization"
              perPage={100000000}
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Service Area 1" source="secServArea1"
              reference="capability"
              allowEmpty>
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
              reference="poc"
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
            <TextInput source="keyname" validate={required} />
            <LongTextInput source="description" />
            <LongTextInput source="comments" />
            <SelectInput source="active" allowEmpty
              optionText="name" optionValue="name"
              choices={[
                {id: 1, name: "TBD"},
                {id: 2, name: "Yes"},
                {id: 3, name: "No"},
              ]}
            />
            <TextInput source="budgetYear" />
            <TextInput source="uii" />
            <ReferenceInput label="Primary Service Area" source="primaryServiceArea"
              reference="capability" allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Investment Type" source="objInvestmentTypeId"
              reference="investmentType"
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

            <ReferenceInput label="Organization" source="objOrganizationId"
              reference="organization"
              perPage={1000000}
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
              reference="poc"
              perPage={1000000}
              allowEmpty>
              <SelectInput optionText="keyname" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);
