import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { EnvironmentSpecificService } from './services/environment-specific.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    EnvironmentSpecificService
  ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
