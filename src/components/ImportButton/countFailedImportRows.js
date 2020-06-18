export default (csvValidationNotifications) => {
  const apiValidationErrors = csvValidationNotifications.filter(notification => notification['messageType'] === 'apiValidationError');

  if(apiValidationErrors){
    return apiValidationErrors.length;
  }

  return 0;
};
