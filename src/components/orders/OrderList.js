import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  Filter,
  SelectInput,
} from 'react-admin';

const OrderListFilter = props => (
  <Filter {...props}>
    <SelectInput
      source="status"
      choices={[
        { id: 'pending', name: 'Pending' },
        { id: 'processing', name: 'Processing' },
        { id: 'completed', name: 'Completed' },
      ]}
    />
  </Filter>
);

function OrderList(props) {
  return (
    <List
      {...props}
      filters={<OrderListFilter />}
      filterDefaultValues={{ status: 'completed' }}
    >
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
