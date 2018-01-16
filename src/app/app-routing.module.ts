import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EnvironmentSpecificResolver} from "./core/services/environment-specific-resolver.service";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [  {
    path: '', component: WelcomeComponent,
    resolve: { envSpecific: EnvironmentSpecificResolver }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [EnvironmentSpecificResolver]
})
export class AppRoutingModule { }
