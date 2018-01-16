import { Component } from '@angular/core';
import {EnvironmentSpecificService} from "./core/services/environment-specific.service";
import {EnvSpecific} from "./core/models/Env-specific";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
    console.log('AppComponent - constructor');
  }
}
