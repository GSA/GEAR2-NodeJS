import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class LinearDeterminate extends React.Component {

  render() {
    const { label, value } = this.props;
    return (
      <div>
        <h5>{label||'Progress'}</h5>
        <LinearProgress variant="determinate" value={Number(value)} />
      </div>
    );
  }
}

export default withStyles(styles)(LinearDeterminate);
