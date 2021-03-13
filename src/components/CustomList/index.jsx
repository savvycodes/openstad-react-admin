import React, { Fragment } from "react";
import { List, BulkDeleteButton } from "react-admin";

const ListBulkActionButtons = (props) => (
  <Fragment>
    <BulkDeleteButton undoable={false} {...props} />
  </Fragment>
);

export const CustomList = (props) => {
  return (
    <List
      {...props}
      bulkActionButtons={props.bulkActionButtons || <ListBulkActionButtons />}
    >
      {props.children}
    </List>
  );
};
