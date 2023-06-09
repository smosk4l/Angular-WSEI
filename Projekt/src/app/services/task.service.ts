import { Injectable } from '@angular/core';
import { TaskInterface } from '../interfaces/task.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private localStorageKey = 'tasks';
  private tasks: TaskInterface[] = [];

  constructor() {
    this.getDataFromLocalStorage();
  }

  private getDataFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) this.tasks = JSON.parse(data);
  }

  private saveDataToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
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

  createTask(task: TaskInterface): Observable<TaskInterface> {
    this.tasks.push(task);
    this.saveDataToLocalStorage();
    return of(task);
  }

  updateTask(task: TaskInterface): Observable<TaskInterface> {
    const taskToUpdate = this.tasks.find((t) => t.ID === task.ID);

    if (taskToUpdate) {
      taskToUpdate.name = task.name;
      taskToUpdate.description = task.description;
      taskToUpdate.priority = task.priority;
      taskToUpdate.state = task.state;
      taskToUpdate.addedDate = task.addedDate;
      taskToUpdate.startDate = task.startDate;
      taskToUpdate.endDate = task.endDate;
      taskToUpdate.assignedUser = task.assignedUser;
      taskToUpdate.functionalityID = task.functionalityID; // Aktualizacja pola functionalityID
      taskToUpdate.functionality = task.functionality; // Aktualizacja pola functionality
      this.saveDataToLocalStorage();
      return of(taskToUpdate);
    } else {
      throw new Error('Task not found');
    }
  }

  deleteTask(ID: string): Observable<boolean> {
    const index = this.tasks.findIndex((task) => task.ID === ID);

    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveDataToLocalStorage();
      return of(true);
    } else {
      return of(false);
    }
  }
}
