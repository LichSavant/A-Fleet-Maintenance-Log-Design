import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  CalendarClock,
  CircleDollarSign,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  MapPinned,
  Route,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';

export const metrics = [
  {
    label: 'Fleet Readiness',
    value: '94%',
    delta: '+3.2% this week',
    tone: 'success',
    icon: ShieldCheck,
  },
  {
    label: 'Active Vehicles',
    value: '128',
    delta: '11 in service',
    tone: 'neutral',
    icon: Truck,
  },
  {
    label: 'Open Work Orders',
    value: '24',
    delta: '6 high priority',
    tone: 'warning',
    icon: ClipboardCheck,
  },
  {
    label: 'Monthly Spend',
    value: '$84.7K',
    delta: '-8.5% vs forecast',
    tone: 'success',
    icon: BarChart3,
  },
];

export const quickActions = [
  { label: 'Schedule Service', icon: CalendarClock },
  { label: 'Create Work Order', icon: Wrench },
  { label: 'Dispatch Inspection', icon: ClipboardCheck },
  { label: 'Export Report', icon: BarChart3 },
];

export const fleetHealth = [
  { month: 'Jan', readiness: 88, utilization: 76, downtime: 14 },
  { month: 'Feb', readiness: 90, utilization: 78, downtime: 12 },
  { month: 'Mar', readiness: 91, utilization: 82, downtime: 10 },
  { month: 'Apr', readiness: 89, utilization: 80, downtime: 13 },
  { month: 'May', readiness: 93, utilization: 86, downtime: 8 },
  { month: 'Jun', readiness: 94, utilization: 88, downtime: 7 },
  { month: 'Jul', readiness: 95, utilization: 91, downtime: 6 },
];

export const costByCategory = [
  { name: 'Preventive', value: 34 },
  { name: 'Corrective', value: 26 },
  { name: 'Tires', value: 18 },
  { name: 'Compliance', value: 12 },
  { name: 'Other', value: 10 },
];

export const utilizationByDepot = [
  { depot: 'North', utilization: 92, service: 8 },
  { depot: 'West', utilization: 86, service: 11 },
  { depot: 'Central', utilization: 89, service: 9 },
  { depot: 'South', utilization: 81, service: 15 },
  { depot: 'Port', utilization: 94, service: 6 },
];

export const dashboardHeroVehicle = {
  id: 'FF-2048',
  name: 'Axiom Hauler 48',
  type: 'Class 8 Tractor',
  route: 'North Yard to Central Hub',
  driver: 'M. Ellis',
  status: 'Ready',
  health: 96,
  mileage: 184220,
  utilization: 91,
  nextService: 'Jul 12',
};

export const fleetStats = [
  { label: 'Total Miles', value: '2.84M', detail: '+12.4K this week', icon: MapPinned, tone: 'neutral' },
  { label: 'Avg Utilization', value: '88%', detail: '+4.1% from baseline', icon: Gauge, tone: 'success' },
  { label: 'Cost Per Mile', value: '$0.42', detail: '-$0.04 vs forecast', icon: CircleDollarSign, tone: 'success' },
  { label: 'Service Backlog', value: '24', detail: '6 priority holds', icon: Wrench, tone: 'warning' },
];

export const vehicleStatusDistribution = [
  { name: 'Ready', value: 94 },
  { name: 'In Service', value: 18 },
  { name: 'Inspection', value: 10 },
  { name: 'Critical', value: 6 },
];

export const monthlyMaintenanceCost = [
  { month: 'Jan', preventive: 42, corrective: 28, tires: 12 },
  { month: 'Feb', preventive: 38, corrective: 31, tires: 15 },
  { month: 'Mar', preventive: 46, corrective: 26, tires: 11 },
  { month: 'Apr', preventive: 44, corrective: 30, tires: 14 },
  { month: 'May', preventive: 49, corrective: 24, tires: 13 },
  { month: 'Jun', preventive: 51, corrective: 22, tires: 12 },
  { month: 'Jul', preventive: 47, corrective: 21, tires: 11 },
];

export const vehicles = [
  {
    id: 'FF-2048',
    name: 'Axiom Hauler 48',
    type: 'Class 8 Tractor',
    depot: 'North Yard',
    mileage: 184220,
    status: 'Ready',
    health: 96,
    nextService: 'Jul 12',
    vin: '7HGX2941FLX2048',
    driver: 'M. Ellis',
    utilization: 91,
    year: 2024,
    plate: 'FF 2048',
  },
  {
    id: 'FF-1182',
    name: 'Vanta Cargo 12',
    type: 'Box Truck',
    depot: 'Central Hub',
    mileage: 92380,
    status: 'In Service',
    health: 78,
    nextService: 'Today',
    vin: '9FRL1820QZB1182',
    driver: 'A. Novak',
    utilization: 84,
    year: 2022,
    plate: 'FF 1182',
  },
  {
    id: 'FF-0631',
    name: 'Forge Lift 31',
    type: 'Service Van',
    depot: 'West Yard',
    mileage: 64120,
    status: 'Inspection',
    health: 88,
    nextService: 'Jul 18',
    vin: '5TLM6319KZA0631',
    driver: 'S. Kim',
    utilization: 79,
    year: 2023,
    plate: 'FF 0631',
  },
  {
    id: 'FF-3990',
    name: 'Obsidian Tanker 90',
    type: 'Fuel Tanker',
    depot: 'Port Terminal',
    mileage: 211040,
    status: 'Critical',
    health: 62,
    nextService: 'Overdue',
    vin: '2QLT3990BKP3990',
    driver: 'P. Wright',
    utilization: 68,
    year: 2021,
    plate: 'FF 3990',
  },
];

export const vehicleMaintenanceRecords = [
  { id: 'MR-4418', vehicleId: 'FF-2048', service: 'PM-A inspection package', completed: 'Jun 28, 2026', odometer: '183,614 mi', cost: '$1,240', status: 'Completed' },
  { id: 'MR-4382', vehicleId: 'FF-2048', service: 'Steer axle alignment', completed: 'May 19, 2026', odometer: '179,882 mi', cost: '$680', status: 'Completed' },
  { id: 'MR-4276', vehicleId: 'FF-2048', service: 'Oil and filter service', completed: 'Apr 04, 2026', odometer: '173,201 mi', cost: '$920', status: 'Completed' },
  { id: 'MR-4401', vehicleId: 'FF-1182', service: 'Brake system inspection', completed: 'Jun 21, 2026', odometer: '91,404 mi', cost: '$1,860', status: 'Completed' },
  { id: 'MR-4350', vehicleId: 'FF-0631', service: 'ADAS calibration', completed: 'May 30, 2026', odometer: '62,910 mi', cost: '$740', status: 'Completed' },
  { id: 'MR-4392', vehicleId: 'FF-3990', service: 'Tank integrity inspection', completed: 'Jun 14, 2026', odometer: '209,664 mi', cost: '$2,940', status: 'Completed' },
];

export const vehicleMileageActivity = [
  { id: 'ML-6021', vehicleId: 'FF-2048', route: 'North - Central', driver: 'M. Ellis', miles: '486', logged: 'Jul 14, 2026', status: 'Completed' },
  { id: 'ML-6012', vehicleId: 'FF-2048', route: 'Central - North', driver: 'M. Ellis', miles: '472', logged: 'Jul 12, 2026', status: 'Completed' },
  { id: 'ML-5988', vehicleId: 'FF-2048', route: 'North Regional Loop', driver: 'M. Ellis', miles: '318', logged: 'Jul 09, 2026', status: 'Completed' },
  { id: 'ML-6018', vehicleId: 'FF-1182', route: 'Central - South', driver: 'A. Novak', miles: '214', logged: 'Jul 13, 2026', status: 'Completed' },
  { id: 'ML-6009', vehicleId: 'FF-0631', route: 'West Service Loop', driver: 'S. Kim', miles: '128', logged: 'Jul 12, 2026', status: 'Completed' },
  { id: 'ML-5998', vehicleId: 'FF-3990', route: 'Port Terminal', driver: 'P. Wright', miles: '302', logged: 'Jul 11, 2026', status: 'Completed' },
];

export const vehicleReminderRecords = [
  { id: 'RM-2048-1', vehicleId: 'FF-2048', title: 'PM-B service window', due: 'Jul 26, 2026', level: 'Normal' },
  { id: 'RM-2048-2', vehicleId: 'FF-2048', title: 'Registration review', due: 'Aug 09, 2026', level: 'Normal' },
  { id: 'RM-1182-1', vehicleId: 'FF-1182', title: 'Transmission fluid service', due: 'Today', level: 'High' },
  { id: 'RM-0631-1', vehicleId: 'FF-0631', title: 'Annual safety inspection', due: 'Jul 18, 2026', level: 'High' },
  { id: 'RM-3990-1', vehicleId: 'FF-3990', title: 'Brake pressure diagnostics', due: 'Overdue', level: 'Critical' },
];

export const workOrders = [
  {
    id: 'WO-8821',
    asset: 'FF-3990',
    task: 'Brake pressure diagnostics',
    priority: 'Critical',
    owner: 'M. Ellis',
    due: 'Today',
    status: 'Open',
  },
  {
    id: 'WO-8814',
    asset: 'FF-1182',
    task: 'Transmission fluid service',
    priority: 'High',
    owner: 'A. Novak',
    due: 'Jul 07',
    status: 'In Progress',
  },
  {
    id: 'WO-8799',
    asset: 'FF-2048',
    task: 'PM-A inspection package',
    priority: 'Normal',
    owner: 'S. Kim',
    due: 'Jul 12',
    status: 'Scheduled',
  },
  {
    id: 'WO-8766',
    asset: 'FF-0631',
    task: 'ADAS camera calibration',
    priority: 'Normal',
    owner: 'P. Wright',
    due: 'Jul 18',
    status: 'Queued',
  },
];

export const mileageLogs = [
  {
    id: 'ML-6021',
    asset: 'FF-2048',
    driver: 'M. Ellis',
    route: 'North - Central',
    miles: '486',
    logged: 'Today',
    status: 'Completed',
  },
  {
    id: 'ML-6018',
    asset: 'FF-1182',
    driver: 'A. Novak',
    route: 'Central - South',
    miles: '214',
    logged: 'Yesterday',
    status: 'Ready',
  },
  {
    id: 'ML-6009',
    asset: 'FF-0631',
    driver: 'S. Kim',
    route: 'West Service Loop',
    miles: '128',
    logged: 'Jul 05',
    status: 'Scheduled',
  },
  {
    id: 'ML-5998',
    asset: 'FF-3990',
    driver: 'P. Wright',
    route: 'Port Terminal',
    miles: '302',
    logged: 'Jul 04',
    status: 'Inspection',
  },
];

export const reminders = [
  {
    title: 'DOT inspection window',
    asset: 'FF-3990',
    due: '2 hours',
    level: 'Critical',
    icon: AlertTriangle,
  },
  {
    title: 'Warranty review',
    asset: 'FF-1182',
    due: 'Tomorrow',
    level: 'High',
    icon: ShieldCheck,
  },
  {
    title: 'Tire rotation batch',
    asset: '12 assets',
    due: 'Jul 10',
    level: 'Normal',
    icon: Gauge,
  },
  {
    title: 'Driver defect reports',
    asset: 'North Yard',
    due: 'Jul 11',
    level: 'Normal',
    icon: Bell,
  },
];

export const activities = [
  {
    title: 'FF-2048 completed PM-A inspection',
    detail: 'Checklist passed with no exceptions.',
    time: '18 min ago',
    icon: CheckCircle2,
  },
  {
    title: 'New diagnostic alert on FF-3990',
    detail: 'Brake pressure variance exceeds threshold.',
    time: '41 min ago',
    icon: AlertTriangle,
  },
  {
    title: 'Route assignment updated',
    detail: 'Central Hub reassigned two assets to Port Terminal.',
    time: '1 hr ago',
    icon: Route,
  },
  {
    title: 'Utilization model refreshed',
    detail: 'Forecast improved by 4.1% for the next 7 days.',
    time: '2 hrs ago',
    icon: Activity,
  },
];

export const latestNotifications = [
  {
    title: 'Brake pressure alert',
    detail: 'FF-3990 exceeded diagnostic variance threshold.',
    time: '41 min ago',
    level: 'Critical',
    icon: AlertTriangle,
  },
  {
    title: 'Service slot confirmed',
    detail: 'FF-1182 transmission service moved to Bay 04.',
    time: '1 hr ago',
    level: 'High',
    icon: CalendarClock,
  },
  {
    title: 'Compliance package complete',
    detail: 'North Yard submitted all inspection documents.',
    time: '2 hrs ago',
    level: 'Normal',
    icon: ShieldCheck,
  },
];

export const reportHighlights = [
  { label: 'Preventive Compliance', value: '97%', detail: '+5% from last month' },
  { label: 'Mean Time to Repair', value: '5.8h', detail: '-1.1h from target' },
  { label: 'Cost Per Mile', value: '$0.42', detail: '-$0.04 vs baseline' },
];
