import React from 'react';
// import { Field } from 'redux-form';
import {ReferenceInput, SelectInput} from 'react-admin';
// import PropTypes from 'prop-types';

const AssocListNested = ({source, record = {}, label, reference}) => (
  <span>
    <h3>NAME: {record.keyname}</h3>
    <h5>...from {reference}</h5>
    <ul>
      {
        record.fismaArtifacts.map((art, i) => (
          <li key={i}>
            {art.link}
          </li>)
        )
      }
    </ul>
    <span>
      <ReferenceInput label="Artifacts" source="" reference={reference} allowEmpty>
        <SelectInput optionText="keyname" />
      </ReferenceInput>
    </span>

  </span>
);

// AssocListNested.defaultProps = {
//   addField: true,
//   addLabel: true,
// }

// AssocListNested.propTypes = {
//   reference: PropTypes.string.isRequried,
//   label: PropTypes.string,
//   record: PropTypes.object,
//   source: PropTypes.string.isRequired,
// };

export default AssocListNested;
