import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , DateField
  , SimpleForm, DisabledInput, LongTextInput, TextInput, DateInput
  , ReferenceInput, SelectInput
  , SimpleFormIterator, ArrayInput
  , required, maxLength } from 'react-admin';

import { ConfirmChoices, FedOrContractor } from './valuelists';
import { formatDate, parseDate } from './formatters/DateTime';

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
      <TextInput label="FISMA System Name" source="kn" />
    </Filter>
);

export const FismaList = (props) => (
  <List {...props} actions={<ListActions />} title="FISMA Systems" filters={<KeynameFilter />} >
    <Datagrid>
      <TextField source="id" />
      <TextField source="keyname" label="FISMA System Name"/>
      <DateField source="createDtg" showTime label="Create Time"/>
      <DateField source="changeDtg" showTime label="Last Change Time"/>
      <EditButton />
    </Datagrid>
  </List>
);

const FismaTitle = ({ record }) => {
  return <span>FISMA {record ? `"${record.keyname}"` : ''}</span>;
};

export const FismaEdit = (props) => (
  <Edit undoable={false} title="FISMA System" keyname={<FismaTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="keyname" label="FISMA System Name" validate={[required(), maxLength(80)]} />
      <LongTextInput source="description" />
      <TextInput source="fismaSysId" label="FISMA System ID" />
      <SelectInput source="fedCtrLocated" allowEmpty
        optionText="name" label="Federal or Contractor Located"
        choices={ FedOrContractor }
      />
    <DateInput source="atoDate"
      format={formatDate} parse={parseDate} />
      <SelectInput source="interimAto" label="Interim ATO" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <DateInput source="atoRenewalDate"  label="ATO Renewal Date"
        format={formatDate} parse={parseDate} />
      <DateInput source="inactiveDate"
        format={formatDate} parse={parseDate} />
      <SelectInput source="currentFyFismaAssessment" label="Current FY FISMA Assessment"
        allowEmpty optionText="name"
        choices={ ConfirmChoices }
      />
      <SelectInput source="pii" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <SelectInput source="cloudHosted" label="Cloud Hosted" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <ReferenceInput label="Cloud Service Type" source="fscloudstId"
        reference="fscloudsts" allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <LongTextInput source="comments" />

      <ArrayInput source="fisma_artifacts" label="FISMA Artifacts">
        <SimpleFormIterator>
          <ReferenceInput label="Artifacts" source="id"
            reference="fisma_artifacts"
            sort={{ field: 'keyname', order: 'ASC' }}
            perPage={ 1000000 }
            allowEmpty
          >
            <SelectInput optionText="keyname" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>

{/* POC isso,issm,ao,so */}
      <ReferenceInput source="authorizingOfficialId" label="Authorizing Official"
        reference="pocs"
        validate={required()}
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
      >
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="systemOwnerId" label="System Owner"
        reference="pocs"
        validate={required()}
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
      >
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>

      <ArrayInput source="isso" label="ISSO">
        <SimpleFormIterator>
          <ReferenceInput label="" source="id"
            reference="pocs"
            sort={{ field: 'keyname', order: 'ASC' }}
            perPage={ 1000000 }
            allowEmpty
          >
            <SelectInput optionText="keyname" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="issm" label="ISSM">
        <SimpleFormIterator>
          <ReferenceInput label="" source="id"
            reference="pocs"
            sort={{ field: 'keyname', order: 'ASC' }}
            perPage={ 1000000 }
            allowEmpty
          >
            <SelectInput optionText="keyname" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="replacedby"
        label="Replaced By">
        <SimpleFormIterator>
          <ReferenceInput label="" source="id" reference="fismas" allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="technologies"
        label="Technologies">
        <SimpleFormIterator>
          <ReferenceInput label="" source="id" reference="technologies" 
          sort={{ field: 'keyname', order: 'ASC' }}
          perPage={ 1000000 }
		  allowEmpty>
            <SelectInput optionText="keyname" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
{/* RECENT ADDITIONS */}
      <ReferenceInput source="scImpactLevelId" label="FIPS 199"
        reference="sc_impact_levels"
        allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="ssoId" label="Responsible SSO"
        reference="organizations"
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
        allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="atoTypeId" label="ATO Type"
        reference="ato_types"
        allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="fscloudspId" label="Cloud Service Provider"
        reference="fscloudsps"
        allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>

    </SimpleForm>
  </Edit>
);

export const FismaCreate = (props) => (
  <Create undoable={false} title="FISMA System" {...props}>
    <SimpleForm>
      <TextInput source="keyname" label="FISMA System Name" validate={[required(), maxLength(80)]} />
      <LongTextInput source="description" />
      <TextInput source="fismaSysId" label="FISMA System ID"/>
      <SelectInput source="fedCtrLocated" allowEmpty
        optionText="name"  label="Federal or Contractor Located"
        choices={ FedOrContractor }
      />
      <DateInput source="atoDate" label="ATO Date"
        format={formatDate} parse={parseDate} />
      <SelectInput source="interimAto" label="Interim ATO" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <DateInput source="atoRenewalDate" label="ATO Renewal Date"
        format={formatDate} parse={parseDate} />
      <DateInput source="inactiveDate" label="Inactive Date"
        format={formatDate} parse={parseDate} />
      <SelectInput source="currentFyFismaAssessment" label="Current FY FISMA Assessment"
        allowEmpty optionText="name"
        choices={ ConfirmChoices }
      />
      <SelectInput source="pii" label="PII" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
       <ReferenceInput source="authorizingOfficialId"
        reference="pocs"
        label="Authorizing Official" 
        validate={required()}
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
      > 
        <SelectInput optionText="keyname" />
      </ReferenceInput> 
	  
	  {/*       <ReferenceInput source="systemOwnerId" label="System Owner"
        reference="pocs"
        validate={required()}
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
      >
        <SelectInput optionText="keyname" />
      </ReferenceInput> */}
	  
      <SelectInput source="cloudHosted" label="Cloud Hosted" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <ReferenceInput label="Cloud Service Type" source="fscloudstId"
        reference="fscloudsts" allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <LongTextInput source="comments" />

    </SimpleForm>
  </Create>
);