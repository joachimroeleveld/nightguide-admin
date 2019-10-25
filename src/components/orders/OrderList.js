import React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

function OrderList(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="billingDetails.name" />
        <TextField source="status" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  );
}

export default OrderList;
