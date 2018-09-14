import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EagerRoutingModule } from './eager-routing.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    EagerRoutingModule
  ],
  exports:[
    AdminComponent
  ],
  declarations: [AdminComponent]
})
export class EagerModule { }

// we should NOT self-accept eagerly loaded modules
// module["hot"].accept();
