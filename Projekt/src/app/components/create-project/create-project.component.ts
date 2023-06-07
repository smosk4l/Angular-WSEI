import { ProjectInterface } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createProject() {
    if (this.projectForm.invalid) {
      return;
    }

    const project: ProjectInterface = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
      ID: Date.now().toString(),
    };

    this.projectService.createProject(project).subscribe(
      () => {
        console.log(project);
        this.projectForm.reset();
        this.projectService
          .getProjects()
          .subscribe((projects: ProjectInterface[]) => {
            console.log(projects);
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
