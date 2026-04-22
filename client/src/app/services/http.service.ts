import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders();

  /**
   *
   * @param http
   */
  constructor(
    private http: HttpClient
  ) {}

  /**
   *
   * @param token
   */
  updateToken(token: string){
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  /**
   *
   * @param endpoint
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param endpoint
   * @param body
   */
  create<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param endpoint
   * @param body
   */
  update<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param endpoint
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`,{ headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Erreur réseau :', error.error);
    } else {
      console.error(`Erreur ${error.status} :`, error.error);
    }
    return throwError(() => new Error(error.message));
  }
}