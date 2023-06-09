import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionalityInterface } from 'src/app/interfaces/functionality.interface';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { TaskInterface } from 'src/app/interfaces/task.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WorkStatus } from 'src/app/enums/workStatus.enum';
import { Priority } from 'src/app/enums/priority.enum';

@Component({
  selector: 'app-functionality-edit',
  templateUrl: './functionality-edit.component.html',
  styleUrls: ['./functionality-edit.component.scss'],
})
export class FunctionalityEditComponent implements OnInit {
  functionality: FunctionalityInterface | undefined;
  functionalityForm!: FormGroup;
  workStatusValues = Object.values(WorkStatus);
  priorityValues = Object.values(Priority);
  functionalityId!: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private functionalitiesService: FunctionalityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.functionalityId = id;
        this.loadFunctionality();
      } else {
        this.functionalityId = '';
      }
    });

    const currentDate = new Date().toISOString().split('T')[0];
    const addedDateControl = new FormControl({
      value: currentDate,
      disabled: true,
    });

    this.functionalityForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: [Priority.Low, Validators.required],
      status: [WorkStatus.Todo, Validators.required],
      addedDate: addedDateControl,
      startDate: [''],
      endDate: [''],
      timeSpent: [''],
    });
  }

  // List task, ktore naleza do tej funkcjonalnosci
  // 2. wszystkie funkcjonalnosci
  // 3. id funkcjonalnosci do ktorej przynaleza te taski w liscie
  // 4. dla kazdego obiekut z taskow sprawdz czy ktorys status jest doing
  // 5. jezeli jest to funkctionality.status = doingol

  loadFunctionality() {
    this.functionalitiesService
      .getSingleFunctionality(this.functionalityId)
      .subscribe(
        (functionality: FunctionalityInterface) => {
          this.functionality = functionality;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateFunctionalityStatus(taskStatus: string) {
    if (this.functionality) {
      if (taskStatus === 'doing') {
        this.functionality.status = WorkStatus.Doing;
      } else if (taskStatus === 'done') {
        this.functionality.status = WorkStatus.Done;
      } else {
        this.functionality.status = WorkStatus.Todo;
      }
    }
  }

  editFunctionality() {
    const taskStatus = this.functionalityForm.value.status;
    this.updateFunctionalityStatus(taskStatus);

    if (this.functionality) {
      this.functionality.name = this.functionalityForm.value.name;
      this.functionality.description = this.functionalityForm.value.description;
      this.functionality.priority = this.functionalityForm.value.priority;
      this.functionality.status = this.functionalityForm.value.status;
      this.functionality.addedDate = new Date(
        this.functionalityForm.value.addedDate
      );
      this.functionality.startDate = this.functionalityForm.value.startDate
        ? new Date(this.functionalityForm.value.startDate)
        : undefined;
      this.functionality.endDate = this.functionalityForm.value.endDate
        ? new Date(this.functionalityForm.value.endDate)
        : undefined;
      this.functionality.timeSpent = this.functionalityForm.value.timeSpent
        ? +this.functionalityForm.value.timeSpent
        : undefined;

      this.functionalitiesService
        .updateFunctionality(this.functionality)
        .subscribe(
          (functionality) => {
            console.log(functionality);
            this.router.navigate(['/functionalities']);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
