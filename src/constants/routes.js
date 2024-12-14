export const ROUTES = {
  HOME: '/',

  JOB: {
    LIST: '/jobs',
    POST: '/jobs/post',
    DETAIL: '/jobs/:code',
    EDIT: 'jobs/edit/:code',
  },

  RESUME: {
    LIST: '/resumes/list',
    POST: '/resumes/post',
    EDIT: '/resumes/:resumeCode/edit',
    READ: '/resumes/:resumeCode',

    READ_TEST: 'resumes/read',
    EDIT_TEST: 'resumes/edit',
  },

  PROFILE: {
    SOCIAL_MY_PAGE: '/socialprofile',
    MY_PAGE: '/profile',
    EDIT: '/profile/edit',
    APPLICATIONS: '/profile/applications',
    COMPANY: '/company/:id',

    COMPANY_TEST: '/company_test',
  },

  USER: {
    REGISTER: '/auth/sign-up',
    LOGIN: '/auth/sign-in',
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