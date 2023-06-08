import { Component, OnInit } from '@angular/core';
import { ProjectInterface } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss'],
})
export class UserProjectsComponent implements OnInit {
  projects: ProjectInterface[] = [];
  project!: ProjectInterface;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService
      .getProjects()
      .subscribe((project: ProjectInterface[]) => {
        this.projects = project;
      });
    this.project = this.projects[0];
  }
}
