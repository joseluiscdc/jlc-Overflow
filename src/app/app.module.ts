import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'ngx-moment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { AnswerFormComponent } from './answer/answer-form.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen.component';
import { MaterialModule } from './material.module';
import { QuestionDetailComponent } from './question/question-detail.component';
import { QuestionFormComponent } from './question/question-form.component';
import { QuestionListComponent } from './question/question-list.component';
import { QuestionScreenComponent } from './question/question-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { DeleteCtaComponent } from './message/deleteCta.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswerFormComponent,
    SigninScreenComponent,
    SignupScreenComponent,
    QuestionFormComponent,
    QuestionListComponent,
    QuestionScreenComponent,
    ProfileComponent,
    MessageComponent,
    DeleteCtaComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService],
})
export class AppModule { }
