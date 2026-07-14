import {
  BarChart3,
  Bell,
  ClipboardList,
  History,
  LayoutDashboard,
  Route,
  Settings,
  Truck,
  UserCog,
  Users,
  Wrench,
} from 'lucide-react';

export const navItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard,
    title: 'Command Center',
    subtitle: 'Live maintenance visibility across every depot.',
  },
  {
    label: 'Vehicles',
    to: '/vehicles',
    icon: Truck,
    title: 'Vehicle Registry',
    subtitle: 'Asset health, location, and lifecycle signals.',
  },
  {
    label: 'Drivers',
    to: '/drivers',
    icon: Users,
    title: 'Driver Directory',
    subtitle: 'Driver assignment, status, and operational coverage.',
  },
  {
    label: 'Mileage Logs',
    to: '/mileage-logs',
    icon: Route,
    title: 'Mileage Logs',
    subtitle: 'Distance capture, utilization records, and asset activity.',
  },
  {
    label: 'Service Types',
    to: '/service-types',
    icon: Wrench,
    title: 'Service Types',
    subtitle: 'Standardized maintenance programs and labor profiles.',
  },
  {
    label: 'Maintenance History',
    to: '/maintenance-history',
    icon: History,
    title: 'Maintenance History',
    subtitle: 'Prioritize service work before downtime spreads.',
  },
  {
    label: 'Reports',
    to: '/reports',
    icon: BarChart3,
    title: 'Executive Reports',
    subtitle: 'Costs, readiness, and operational trend intelligence.',
  },
  {
    label: 'Reminders',
    to: '/reminders',
    icon: Bell,
    title: 'Reminder Console',
    subtitle: 'Compliance, warranty, and inspection commitments.',
  },
  {
    label: 'Users',
    to: '/users',
    icon: UserCog,
    title: 'User Management',
    subtitle: 'Access, roles, and command environment permissions.',
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: Settings,
    title: 'System Settings',
    subtitle: 'Fleet standards, account preferences, and workspace controls.',
  },
];

export const routeMeta = navItems.reduce(
  (items, item) => ({
    ...items,
    [item.to]: {
      breadcrumb: item.label,
      icon: item.icon,
      subtitle: item.subtitle,
      title: item.title,
    },
  }),
  {
    '/maintenance': {
      breadcrumb: 'Maintenance History',
      icon: ClipboardList,
      subtitle: 'Prioritize service work before downtime spreads.',
      title: 'Maintenance Control',
    },
  },
);

export function getRouteMeta(pathname) {
  if (pathname.startsWith('/vehicles/')) {
    return {
      breadcrumb: 'Vehicle Details',
      icon: Truck,
      subtitle: 'Asset identity, operating health, and maintenance intelligence.',
      title: 'Vehicle Details',
    };
  }

  return routeMeta[pathname] || routeMeta['/dashboard'];
}
