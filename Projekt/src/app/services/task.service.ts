import { Injectable } from '@angular/core';
import { TaskInterface } from '../interfaces/task.interface';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private localStorageKey = 'tasks';
  private tasks: TaskInterface[] = [];

  private getDataFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) this.tasks = JSON.parse(data);
  }

  private saveDataToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  }

  constructor() {
    this.getDataFromLocalStorage();
  }

  getTasks(): Observable<TaskInterface[]> {
    return of(this.tasks);
  }

  getSingleTask(ID: string): Observable<TaskInterface> {
    const task = this.tasks.find((task) => task.ID === ID);

    if (task) {
      return of(task);
    } else {
      throw new Error('Task not found');
    }
  }

  createTasks(task: TaskInterface): Observable<TaskInterface> {
    this.tasks.push(task);
    this.saveDataToLocalStorage();
    return of(task);
  }

  updateTask(task: TaskInterface): Observable<TaskInterface> {
    const taskToUpdate = this.tasks.find((t) => t.name === task.name);

    if (taskToUpdate) {
      taskToUpdate.name = task.name;
      taskToUpdate.description = task.description;
      taskToUpdate.priority = task.priority;
      taskToUpdate.estimatedTime = task.estimatedTime;
      taskToUpdate.state = task.state;
      taskToUpdate.addedDate = task.addedDate;
      taskToUpdate.startDate = task.startDate;
      taskToUpdate.endDate = task.endDate;
      taskToUpdate.assignedUser = task.assignedUser;
      this.saveDataToLocalStorage();
      return of(taskToUpdate);
    } else {
      return of();
    }
  }

  deleteTask(taskName: string): Observable<boolean> {
    const newTasksList = this.tasks.filter((t) => t.name !== taskName);

    if (newTasksList) {
      this.tasks = newTasksList;
      this.saveDataToLocalStorage();
      return of(true);
    } else {
      return of(false);
    }
  }
}
