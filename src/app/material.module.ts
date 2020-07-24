import { NgModule } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const modules = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatRadioModule,
  MatSnackBarModule
];

@NgModule({
  exports: modules,
  imports: modules,
})

export class MaterialModule {}
