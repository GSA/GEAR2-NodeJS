import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput,
  SimpleForm, TextInput } from 'react-admin';

export const OmbAssetInventoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="relatedPrograms" />
            <EditButton />
        </Datagrid>
    </List>
);

const OmbAssetInventoryTitle = ({ record }) => {
    return <span>OmbAssetInventory {record ? `"${record.id}"` : ''}</span>;
};

export const OmbAssetInventoryEdit = (props) => (
    <Edit keyname={<OmbAssetInventoryTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="relatedPrograms" />
            <TextInput source="gotsOrCots" />
            <TextInput source="majorTechRefreshDate" />
            <TextInput source="anticipatedRetirementDatel" />
            <TextInput source="dataCenter" />
            <TextInput source="contractedSupport" />
            <TextInput source="endOfSupportDate" />
            <TextInput source="ediCrossReference" />
            <TextInput source="applicationInterfaceCode" />
            <TextInput source="fdcciInformation" />
            <TextInput source="fedRampApprovedDate" />
            <TextInput source="riskManagement" />
            <TextInput source="objApplicationId" />
            <TextInput source="objPocId" />
        </SimpleForm>
    </Edit>
);

export const OmbAssetInventoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="relatedPrograms" />
            <TextInput source="gotsOrCots" />
            <TextInput source="majorTechRefreshDate" />
            <TextInput source="anticipatedRetirementDatel" />
            <TextInput source="dataCenter" />
            <TextInput source="contractedSupport" />
            <TextInput source="endOfSupportDate" />
            <TextInput source="ediCrossReference" />
            <TextInput source="applicationInterfaceCode" />
            <TextInput source="fdcciInformation" />
            <TextInput source="fedRampApprovedDate" />
            <TextInput source="riskManagement" />
            <TextInput source="objApplicationId" />
            <TextInput source="objPocId" />
        </SimpleForm>
    </Create>
);
