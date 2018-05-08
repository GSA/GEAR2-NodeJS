import React from 'react';
// import { Field } from 'redux-form';
import {URLField} from 'admin-on-rest';
import PropTypes from 'prop-types';

const AssocListNested = ({source, record = {}}) => (
  <span>
    <h3>NAME: {record.keyname}</h3>
    <ul>
      {
        record.fismaArtifacts.map((art, i) => (
          <li key={i}>
            {art.link}
          </li>)
        )
      }
    </ul>
  </span>
);

// AssocListNested.defaultProps = {
//   addField: true,
//   addLabel: true,
// }

AssocListNested.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default AssocListNested;
