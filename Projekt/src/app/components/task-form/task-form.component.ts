import { Component, OnInit } from '@angular/core';
import { TaskInterface } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { Priority } from 'src/app/enums/priority.enum';
import { WorkStatus } from 'src/app/enums/workStatus.enum';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { FunctionalityInterface } from 'src/app/interfaces/functionality.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  tasks: TaskInterface[] = [];
  taskForm!: FormGroup;
  workStatusValues = Object.values(WorkStatus);
  priorityValues = Object.values(Priority);
  functionalityList: FunctionalityInterface[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private functionalityService: FunctionalityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    const addedDateControl = new FormControl({
      value: currentDate,
      disabled: true,
    });

    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: [Priority.Low, Validators.required],
      projectName: ['', Validators.required],
      owner: ['', Validators.required],
      status: [WorkStatus.Todo, Validators.required],
      addedDate: addedDateControl,
      startDate: [''],
      endDate: [''],
      timeSpent: [''],
      functionality: ['', Validators.required],
    });

    this.taskService.getTasks().subscribe(
      (tasks: TaskInterface[]) => {
        this.tasks = tasks;
      },
      (error) => console.log(error)
    );

    this.functionalityService.getFunctionalities().subscribe(
      (functionalities: FunctionalityInterface[]) => {
        this.functionalityList = functionalities;
      },
      (error) => console.log(error)
    );
  }

  addTask() {
    const currentDate = new Date().toISOString().split('T')[0];
    const addedDateControl = new FormControl({
      value: currentDate,
      disabled: true,
    });

    const addedDateValue =
      addedDateControl.value !== null ? addedDateControl.value : currentDate;

    const selectedFunctionalityId = this.taskForm.value.functionality;

    const selectedFunctionality = this.functionalityList.find(
      (f) => f.ID === selectedFunctionalityId
    );

    if (!selectedFunctionality) {
      return; // Dodaj odpowiednie obsłużenie błędu, jeśli funkcjonalność nie zostanie znaleziona
    }

    const newTask: TaskInterface = {
      ID: Date.now().toString(),
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
      state: this.taskForm.value.status,
      addedDate: new Date(addedDateValue),
      startDate: this.taskForm.value.startDate,
      endDate: this.taskForm.value.endDate,
      assignedUser: this.taskForm.value.owner,
      functionalityID: selectedFunctionality.ID, // Przypisanie wartości selectedFunctionality.ID do pola functionalityID
      functionality: selectedFunctionality, // Przypisanie wybranej funkcjonalności do pola functionality
    };

    this.taskService.createTask(newTask).subscribe(
      (task: TaskInterface) => {
        console.log(task);
        this.router.navigateByUrl('/functionalities');
      },
      (error) => console.log(error)
    );
  }
}
