import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,
    LazyRoutingModule
  ],
  declarations: [AboutComponent]
})
export class LazyModule { }

// The `lazy-ngmodule-hot-loader` adds a HMR handler
// to every lazy loaded NgModule during a build.
// No need to manually handle changes in lazy modules.
