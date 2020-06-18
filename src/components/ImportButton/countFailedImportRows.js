export default async (csvValidationNotifications) => {
  const apiValidationErrors = csvValidationNotifications.find(notification => notification['messageType'] === 'apiValidationError');

  if(apiValidationErrors){
    return apiValidationErrors.length;
  }
};
