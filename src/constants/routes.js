export const ROUTES = {
  HOME: '/',

  JOB: {
    LIST: '/jobs',
    POST: '/jobs/post',
    DETAIL: '/jobs/:code',
  },

  RESUME: {
    LIST: '/resume/list',
    POST: '/resumes/post',
    EDIT: '/resumes/:id/edit',
    READ: '/resumes/:id',

    READ_TEST: 'resumes/read',
    EDIT_TEST: 'resumes/edit',
  },

  PROFILE: {
    MY_PAGE: '/profile',
    EDIT: '/profile/edit',
    APPLICATIONS: '/profile/applications',
    COMPANY: '/company/:id',

    COMPANY_TEST: '/company_test',
  },

  USER: {
    REGISTER: '/auth/sign-up',
    LOGIN: '/auth/sign-in',
    SOCIALLOGIN: '/auth/oauth-response/:token/:userCode/:email/:name/:type/:expirationTime',
  },

  ADMIN: {
    ADMIN: '/admin',
    JOBS: '/admin/jobs',
    MEMBER: '/admin/members',
    STATISTICS: '/admin/statistics',
    MATCHING: '/admin/matching',
  },

  COMPANY: {
    COMPANY: '/company',
    APPLICATIONS: '/company/applications',
    JOBS: '/company/jobs',
    STATISTICS: '/company/statistics',
    PROFILE: '/company/profile',
    PROFILE_EDIT: '/company/profile/edit',
  }
};