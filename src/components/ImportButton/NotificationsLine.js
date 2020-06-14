import React from 'react';
import ImportValidationAlertLine from './ImportValidationAlertLine';

export default (props) => {
  const { csvValidationNotifications } = props;

  return (<>
    {!!csvValidationNotifications && csvValidationNotifications.length > 0 && (
      <ImportValidationAlertLine csvValidationNotifications={csvValidationNotifications}/>
    )}
  </>);
}
