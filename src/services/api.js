import instance from "../utils/axios-customize";

export const callLogin = (userName, password) => {
    return instance.post('/api/login',
    {
        Username:userName, 
        Password:password
    })
}

// export const callRegister = (registerUsername, registerFullName, registerPassword, registerGender, registerLatitude, registerLongitude, registeravatarLink, registerEmail, registerLastLoginIP) => {
//     return instance.post('/api/register',
//     {
//         Username:registerUsername,
//         FullName:registerFullName,
//         Password:registerPassword,
//         Gender:registerGender,
//         Latitude:registerLatitude,
//         Longitude:registerLongitude,
//         avatarLink: registeravatarLink,
//         Email:registerEmail,
//         LastLoginIP:registerLastLoginIP
//     })
// }

export const callRegister = (registerUsername, registerFullName, registerPassword, registerGender, registerLatitude, registerLongitude, registeravatarLink, registerEmail, registerLastLoginIP) => {
    const payload = {
        Username:registerUsername,
        FullName:registerFullName,
        Password:registerPassword,
        Gender:registerGender,
        Latitude:registerLatitude,
        Longitude:registerLongitude,
        avatarLink: registeravatarLink,
        Email:registerEmail,
        LastLoginIP:registerLastLoginIP
    };

    console.log('Payload:', payload);

    return instance.post('/api/register', payload)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
            }
            throw error;
        });
};

export const callLogout = () => {
    return instance.post('/api/logout')
}

// export const logoutUser = async () => {
//     try {
//         await instance.post('/api/logout');
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         console.log('Logout successful');
//     } catch (error) {
//         console.error('Logout error:', error);
//         if (error.response) {
//             console.error('Response error:', error.response.data);
//         } else if (error.request) {
//             console.error('Request error:', error.request);
//         } else {
//             console.error('Error:', error.message);
//         }
//         throw error;
//     }
// };

export const callRefeshToken = () => {
    return instance.post('/refresh_token')
}

export const callforgotPassword = (email) => {
    return instance.post('/api/forgotPassword',
    {
        Email:email, 

    })
}

export const refreshAccessToken = async () => {
    try {
        const response = await instance.post('/refresh_token');
        const { access_token } = response.data;
        
        // Cập nhật access token mới vào local storage hoặc cookies
        localStorage.setItem('access_token', access_token);
        
        return response.data;
    } catch (error) {
        console.error('Refresh token error:', error);
        throw error;
    }
};

export const searchQueryAPI = (query) => {
    return instance.get(`/api/zonings/view?name=${encodeURIComponent(query)}`);
}