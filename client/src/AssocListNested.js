import React from 'react';
import { TextInput } from 'admin-on-rest';

export const NestedAssocList = ({ids, data, basePath}) => {
  return ( <TextInput /> )
}
NestedAssocList.defaultProps = {
  data: {},
  ids: [],
  basePath: '/',
};
