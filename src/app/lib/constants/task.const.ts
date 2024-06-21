import { PriorityEnum, StatusEnum, TypeEnum, UserRole } from '@lib/enums/task';

export const statusDisplay = {
  [StatusEnum.BACKLOG]: 'Backlog',
  [StatusEnum.TODO]: 'To do',
  [StatusEnum.IN_PROGRESS]: 'In progress',
  [StatusEnum.DONE]: 'Done',
};

export const PriorityColors = {
  [PriorityEnum.HIGH]: '#E9494A',
  [PriorityEnum.MEDIUM]: '#E97F33',
  [PriorityEnum.LOW]: '#2D8738',
};

export const navElements = [
  { title: 'Dashboard', link: '/dashboard', role: [UserRole.ADMIN, UserRole.USER] },
  { title: 'Boards', link: '/boards', role: [UserRole.USER, UserRole.ADMIN] },
  { title: 'Admin Route', link: '/admin', role: [UserRole.ADMIN] },
];

export const languageItems = [
  { code: 'en', name: 'EN' },
  { code: 'al', name: 'AL' },
];

export const statusTypesModel = [
  { name: TypeEnum.BUG, id: 1 },
  { name: TypeEnum.TASK, id: 2 },
  { name: TypeEnum.STORY, id: 3 },
];

export const priorityTypesModel = [
  { name: PriorityEnum.HIGH, id: 1 },
  { name: PriorityEnum.LOW, id: 2 },
  { name: PriorityEnum.MEDIUM, id: 3 },
];
