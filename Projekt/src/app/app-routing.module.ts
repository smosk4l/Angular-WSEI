import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionalityFormComponent } from './components/functionality-form/functionality-form.component';

import { FunctionalityListComponent } from './components/functionality-list/functionality-list.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
const routes: Routes = [
  { path: '', component: UserProjectsComponent },
  { path: 'functionalities', component: FunctionalityListComponent },
  { path: 'functionalities/create', component: FunctionalityFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
