import { Component, OnInit } from '@angular/core';
import { FunctionalityInterface } from 'src/app/interfaces/functionality.interface';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TaskInterface } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  functionality!: FunctionalityInterface;
  functionalities: FunctionalityInterface[] = [];
  tasks: TaskInterface[] = [];
  functionalityID!: string;

  constructor(
    private route: ActivatedRoute,
    private functionalityService: FunctionalityService,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskService.getTasks().subscribe((taskList: TaskInterface[]) => {
      this.tasks = taskList;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.functionalityID = id;
        this.getSingleFunctionality(this.functionalityID);
      } else {
        this.functionalityID = '';
      }
    });
  }

  getSingleFunctionality(ID: string) {
    this.functionalityService
      .getSingleFunctionality(ID)
      .subscribe((functionality) => {
        this.functionality = functionality as FunctionalityInterface;
        this.functionalities.push(this.functionality);
      });
  }

  deleteTask(ID: string) {
    // Implementacja usuwania zadania
  }

  showTaskDetails(ID: string) {
    // Implementacja wyświetlania szczegółów zadania
  }

  addTask() {
    this.router.navigate(['/task/create']);
  }
}
