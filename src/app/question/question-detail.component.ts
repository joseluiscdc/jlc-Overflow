import { Component } from '@angular/core';
import { Question } from './question.model';

@Component({
  selector: 'app-question-detail',
  styleUrls: ['./question-detail.component.css'],
  templateUrl: './question-detail.component.html',
})
export class QuestionDetailComponent {
    public question: Question = new Question(
      'Esta es una nueva pregunta sobre Android',
      'Miren, tengo una duda con una aplicación que estoy escribiendo para Android...',
      new Date(),
      'devicon-android-plain colored',
    );
}
