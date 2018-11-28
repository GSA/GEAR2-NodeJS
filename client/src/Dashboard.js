import React from 'react';
import PropTypes from 'prop-types';

// const decodedJwt = decodeJwt(localStorage.jwt);
const content = {
  tstamp: `10 AUG 2018 MORNING`,
  pageTitle: `GEAR 2.0 Pre-Release Admin Portal`
}

function SimpleCard(props) {
  const { classes } = props;

  return (
    <div>
      <br/>
      <br/>
      {content.pageTitle}
      <br/>
      <br/>
      Warning: Official Use Only
      <br/>
      ***WARNING*** This is a U.S. General Services Administration Federal Government computer system that is "FOR OFFICIAL USE ONLY." This system is subject to monitoring. Individuals found performing unauthorized activities are subject to disciplinary action including criminal prosecution.
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SimpleCard;
