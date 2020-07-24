import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class QuestionService {
	private questionUrl: string;

	constructor(private http: HttpClient){
		this.questionUrl = urljoin(environment.apiUrl, 'questions');
	}

    getQuestions(sort = '-createdAt'): Observable<Question[]> {
        return this.http.get(`${this.questionUrl}?sort=${sort}`)
            .pipe(
                map( res => {
                    return res as Question[]
                })
            );
    }

    getQuestion(id): Observable<Question> {
        const url = urljoin(this.questionUrl, id);
        return this.http.get(url)
            .pipe(
                map( res => {
                    console.log("aers")
                    console.log(res)
                    return res as Question
                })
            );
    }

    getToken() {
        const token = localStorage.getItem('token');
        return `?token=${token}`;
    }

    addQuestion(question: Question): Observable<any> {
        const body = JSON.stringify(question);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //const token = this.getToken();

        return this.http.post(this.questionUrl, body, { headers })
            .pipe(
                map( res => {
                    return res as Question
                    }),
                    catchError(this.handleError)
                );
    }

    addAnswer(answer: Answer): Observable<any> {
        const a = {
            description: answer.description,
            question: {
                _id: answer.question._id
            },
            user: "5f13d0310039ad21f82ca470",
        };
        const body = JSON.stringify(a);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const id_answer = answer.question._id.toString();
        const url = urljoin(this.questionUrl, id_answer, 'answers');
        return this.http.post(url, body, { headers })
            .pipe(
                map( res => {
                    return res as Question
                    }),
                    catchError(this.handleError)
                );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error ocurred : ', error.error.message);
        } else {
            console.error(
                error.error
            );
        }
        return throwError('Something bad happened; please try again later.');
    }
}

