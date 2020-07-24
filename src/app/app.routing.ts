import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen.component';
import { QuestionListComponent } from './question/question-list.component';

import { QUESTION_ROUTES } from './question/question.routing';

const routes: Routes = [
  { path: '', component: QuestionListComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninScreenComponent },
  { path: 'signup', component: SignupScreenComponent },
  { path: 'questions', children: QUESTION_ROUTES },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
