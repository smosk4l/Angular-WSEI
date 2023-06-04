import { UserInterface } from './user.interface';
import { ProjectInterface } from './project.interface';
import { WorkStatus } from '../enums/workStatus.enum';

export interface FunctionalityInterface {
  ID: string;
  name: string;
  description: string;
  priority: string;
  project: ProjectInterface;
  owner: UserInterface;
  status: WorkStatus;
  addedDate: Date;
  startDate?: Date;
  endDate?: Date;
  timeSpent?: number;
}
