import { lazy } from 'react';
import { authRoles } from 'app/auth';
const DashboardApp = lazy(() => import('./DashboardApp'));

const DashboardAppConfig = {
  settings: {
    layout: {
      config: {
        // scroll: 'content',
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: true,
        },
        leftSidePanel: {
          display: true,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.privilege,
  routes: [
    {
      path: '/apps/dashboards/analytics',
      element: <DashboardApp />,
    },
  ],
};

export default DashboardAppConfig;
