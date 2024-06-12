import { apiClient, setAuthHeader } from './base';

/// call api to login

export const login = async (emailOrPhoneNumber, password) => {
  try {
    console.log('Attempting to log in user...');
    const response = await apiClient.post('Account/login', {
      EmailOrPhoneNumber: emailOrPhoneNumber,
      Password: password
    });

    console.log('Response received:', response); // Thêm logging để kiểm tra toàn bộ response

    if (response.status === 200) {
      const { token, role } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); // Lưu role vào localStorage
      console.log('User logged in successfully. Token received:', token);
      console.log('Role received:', role); // Thêm logging để kiểm tra role
      setAuthHeader();
      return response.data;
    } else {
      console.error('Login failed:', response.data);
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};


export const fetchProtectedData = async () => {
  try {
    console.log('Fetching protected data...');
    setAuthHeader();
    const response = await apiClient.get('Account/users');
    console.log('Protected data fetched successfully:', response.data);
    return response.data.data; // Đảm bảo trả về đúng data
  } catch (error) {
    console.error('Error fetching protected data:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};



// API call to register
export const register = async (firstName, lastName, email, phoneNumber, password, roleId) => {
  console.log('Attempting to register user...');
  const response = await apiClient.post('Account/register', {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    PhoneNumber: phoneNumber,
    Password: password,
    RoleId: roleId // Thêm RoleId vào yêu cầu
  });
  console.log('User registered successfully:', response.data);
  return response.data;
};

// api hiển thị thông tin user cần update
export const fetchUserById = async (id) => {
  try {
    const response = await apiClient.get(`Account/users/${id}`);
    return response.data; // Đảm bảo rằng response.data chứa đối tượng người dùng
  } catch (error) {
    console.error('Error fetching user by id:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};



//API call to forgot password
export const forgotPassword = async (email) => {
  console.log('Attempting to send forgot password request...');
  const response = await apiClient.post('Account/forgot-password', { Email: email });
  console.log('Forgot password request successful:', response.data);
  return response.data;
};

// API call to update user
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

// API call to delete a user
export const deleteUserById = async (id) => {
  const response = await apiClient.delete(`Account/users/${id}`);
  return response.data;
};
