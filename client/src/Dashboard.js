import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Progress from './Progress';

export default () => (
  <Card>
    <CardHeader title="Welcome to the brand new GEAR admin" />
    <CardContent>
      Select an item in the menu on the left to get started.
    </CardContent>
  </Card>
);
