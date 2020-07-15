import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

const modules = [
  MatButtonModule,
];

@NgModule({
  exports: modules,
  imports: modules,
})

export class MaterialModule {}
