import { apiClient } from './base';

export const CreateCustomer = async (objectId, objectName, taxCode, address, phoneNumber) => {
  console.log('Attempting to create customer...');
  const response = await apiClient.post('Customer/createCustomer', {
    ObjectId: objectId,
    ObjectName: objectName,
    TaxCode: taxCode,
    Address: address,
    PhoneNumber: phoneNumber,
    
  });
  console.log('Tạo mới Customer thành công:', response.data);
  return response.data;
};

export const getCustomer = async () => {
  try {
    const response = await apiClient.get('Customer/customer');
    return response.data;
  } catch (error) {
    console.error('Lỗi xảy ra khi hiển thị Customer:', error);
    throw error;
  }
};