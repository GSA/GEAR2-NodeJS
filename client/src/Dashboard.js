import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Progress from './Progress';

export default () => (
  <Card>
    <CardHeader title="Welcome to the administration" />
    <CardContent>
      <Progress label="Forms" value="85" />
      <Progress label="Auth" value="85" />
      <Progress label="Aesthetics" value="85" />
    </CardContent>
  </Card>
);
