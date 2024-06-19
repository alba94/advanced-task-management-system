export enum StatusEnum {
  BACKLOG = 'Backlog',
  TODO = 'Todo',
  SELECTED = 'Selected',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done'
}

export enum StateEnum {
  ACTIVE = 'Active',
  NEW = 'New',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
  TEST = 'Test'
}

export const statusDisplay = {
  [StatusEnum.BACKLOG]: 'Backlog',
  [StatusEnum.TODO]: 'To do',
  [StatusEnum.SELECTED]: 'Selected for Development',
  [StatusEnum.IN_PROGRESS]: 'In progress',
  [StatusEnum.DONE]: 'Done'
};

export enum PriorityEnum {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export const PriorityColors = {
  [PriorityEnum.HIGH]: '#E9494A',
  [PriorityEnum.MEDIUM]: '#E97F33',
  [PriorityEnum.LOW]: '#2D8738',
};

export enum TypeEnum {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug',
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
