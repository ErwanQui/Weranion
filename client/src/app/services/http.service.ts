import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SnackBarService } from './snackBar.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders();

  /**
   *
   * @param http
   * @param snackBarService
   */
  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      console.log('u');
      this.updateToken(currentToken);
    }
  }

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
   * @param withoutErrorMessage
   */
  get<T>(endpoint: string, withoutErrorMessage: boolean = false): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.headers })
      .pipe(catchError(error => this.handleError(error, withoutErrorMessage)));
  }

  /**
   *
   * @param endpoint
   * @param body
   */
  create<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   *
   * @param endpoint
   * @param body
   */
  update<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers: this.headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   *
   * @param endpoint
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`,{ headers: this.headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   *
   * @param error
   * @param withoutErrorMessage
   */
  private handleError(error: HttpErrorResponse, withoutErrorMessage: boolean = false) {
    if (error.status === 0) {
      console.error('Erreur réseau :', error.error);
    } else {
      console.error(`Erreur ${error.status} :`, error.error);
    }
    if (!withoutErrorMessage) {
      this.snackBarService.failSnackBar({ message: error.error || error.message });
    }
    return throwError(() => new Error(error.message));
  }
}