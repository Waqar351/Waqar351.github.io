export const contactContent = {
  heading: 'Contact',
  subtitle: 'Academic and professional contact information',

  introduction: [
    'For research collaborations, academic discussions, and professional inquiries, please use the contact details below.',
    'I am happy to connect regarding graph machine learning, spatio-temporal AI, visual analytics, and related research topics.',
  ],

  email: {
    label: 'Professional Email',
    sourceKey: 'siteConfig.email',
  },

  profiles: [
    { label: 'GitHub', socialKey: 'github' },
    { label: 'LinkedIn', socialKey: 'linkedin' },
    { label: 'Google Scholar', socialKey: 'googleScholar' },
    { label: 'ORCID', socialKey: 'orcid' },
  ],

  relatedRoutes: [
    { label: 'Research', path: '/research' },
    { label: 'Projects', path: '/projects' },
    { label: 'Publications', path: '/publications' },
    { label: 'CV', path: '/cv' },
  ],
}
