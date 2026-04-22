import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) {}

  updateToken(token: string){
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  create<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  update<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`,{ headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Erreur réseau :', error.error);
    } else {
      console.error(`Erreur ${error.status} :`, error.error);
    }
    return throwError(() => new Error(error.message));
  }
}