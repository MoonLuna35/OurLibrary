import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewEntry } from './new/new.component';

const routes: Routes = [
  {path: "home", component: HomeComponent, children: [
    {path: "new", component: NewEntry}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
