import { apiClient } from './base';


// Call API to login
export const login = async (emailOrPhoneNumber, password) => {
  try {
    console.log('Attempting to log in user...');
    const response = await apiClient.post('/Account/login', {
      EmailOrPhoneNumber: emailOrPhoneNumber,
      Password: password
    });

    console.log('Response received:', response); // Thêm logging để kiểm tra toàn bộ response

    if (response.status === 200) {
      const { role, lastName, token} = response.data.data; // Đảm bảo lastName có trong phản hồi

      // Lưu role và lastName vào localStorage
      localStorage.setItem('role', role);
      localStorage.setItem('lastName', lastName);

      console.log('User logged in successfully.');
      console.log('Role received:', role); // Thêm logging để kiểm tra role
      console.log('Last Name received:', lastName); // Thêm logging để kiểm tra lastName
      console.log('Token received:', token);

      return response.data;
    } else {
      console.error('Login failed:', response.data);
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchProtectedData = async () => {
  try {
    console.log('Fetching protected data...');
    const response = await apiClient.get('/Account/users');
    console.log('Protected data fetched successfully:', response.data);
    return response.data.data; // Đảm bảo trả về đúng data
  } catch (error) {
    console.error('Error fetching protected data:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};


export const register = async (firstName, lastName, email, phoneNumber, password, roleId) => {
  console.log('Attempting to register user...');
  const response = await apiClient.post('Account/register', {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    PhoneNumber: phoneNumber,
    Password: password,
    RoleId: roleId // Add RoleId to the request
  });
  console.log('User registered successfully:', response.data);
  return response.data;
};

export const createUser = async (firstName, lastName, email, phoneNumber, password, roleId) => {
  console.log('Attempting to create user...');
  const response = await apiClient.post('Account/register', {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    PhoneNumber: phoneNumber,
    Password: password,
    RoleId: roleId // Add RoleId to the request
  });
  console.log('User created successfully:', response.data);
  return response.data;
};

export const fetchUserById = async (id) => {
  try {
    const response = await apiClient.get(`Account/users/${id}`);
    return response.data; // Ensure that response.data contains the user object
  } catch (error) {
    console.error('Error fetching user by id:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

export const forgotPassword = async (email) => {
  console.log('Attempting to send forgot password request...');
  const response = await apiClient.post('Account/forgot-password', { Email: email });
  console.log('Forgot password request successful:', response.data);
  return response.data;
};

export const updateUser = async (user) => {
  console.log('Attempting to update user...');
  const response = await apiClient.put(`Account/users/${user.id}`, user, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('User updated successfully:', response.data);
  return response.data;
};

export const deleteUserById = async (id) => {
  const response = await apiClient.delete(`Account/users/${id}`);
  return response.data;
};
