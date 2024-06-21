import { PriorityEnum, StatusEnum, TypeEnum } from '@lib/enums/task';

export interface Task {
  id: string | null;
  title: string | null;
  description: string | null;
  priority: PriorityEnum | null;
  status: StatusEnum | null;
  type: TypeEnum | null;
  startDate?: string | null;
  dueDate?: string | null;
  assignedTo?: number | null;
  // assignedBy: number | null;
  comments: TaskComment[];
  // attachments: [];
}

export interface TaskComment {
  id?: number | null;
  comment: string | null;
  commentedBy: number | null;
  commentedAt: string | null;
}

export interface FilterParams {

}
