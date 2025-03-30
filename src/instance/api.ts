const API = {
    auth: {
        login: '/admin/login'
    },
    user: {
        getAllUsers: '/user/get-all-users',
        getUserById: "/user/get-user-by-id",
        updateUserById: '/user/update-user-by-id'
    },
    university: {
        getAllUniversity: "/universities",
        getUniversity: "/universities",
        createUniversity: "/universities",
        deleteUniversity: "/universities",
        updateUniversity: "/universities"
    },
    country: {
        getActiveCountries: '/active-countries'
    },
    video: {
        getALl: '/videos',
        getById: '/videos',
        create: '/videos'
    },
    successStory: {
        getAll: '/success-stories',
        getById: '/success-stories',
        create: '/success-stories',
        update: '/success-stories',
        delete: '/success-stories'
    },
    scholarship: {
        getAll: '/scholarships',
        getById: '/scholarships',
        create: '/scholarships',
        update: '/scholarships',
        delete: '/scholarships'
    },
    quiz: {
        all: '/quiz'
    }
}

export default API