import { QuestionDetailComponent } from './question-detail.component';
import { QuestionListComponent } from './question-list.component';

export const QUESTION_ROUTES = [
  { path: '', component: QuestionListComponent },
  { path: ':id', component: QuestionDetailComponent },
];
