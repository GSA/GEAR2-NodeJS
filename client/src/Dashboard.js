import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import decodeJwt from 'jwt-decode';

// const decodedJwt = decodeJwt(localStorage.jwt);
const content = {
  tstamp: `10 AUG 2018 MORNING`,
  pageTitle: `GEAR 2.0 Pre-Release Admin Portal`,
  // user: decodedJwt.un,
}

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  warn: {
    marginTop: 1,
    lineHeight: 1.25,
  }
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {content.tstamp} | {content.user}
          </Typography>
          <Typography variant="headline" component="h2">
            {content.pageTitle}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" align="center">
            Warning: Official Use Only
          </Typography>
          <Typography className={classes.warn} variant="body2" align="center">
            ****WARNING*** This is a U.S. General Services Administration Federal Government computer system that is "FOR OFFICIAL USE ONLY." This system is subject to monitoring. Individuals found performing unauthorized activities are subject to disciplinary action including criminal prosecution.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
