import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupScreenComponent } from './auth/signup-screen.component';
import { QuestionScreenComponent } from './question/question-screen.component';

import { QUESTION_ROUTES } from './question/question.routing';

const routes: Routes = [
  { path: '', component: QuestionScreenComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'signin', component: SigninScreenComponent },
  { path: 'signup', component: SignupScreenComponent },
  { path: 'questions', children: QUESTION_ROUTES },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
