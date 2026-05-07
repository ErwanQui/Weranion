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
   * @param params
   * @param withoutErrorMessage
   */
  get<T, S>(endpoint: string, params?: S, withoutErrorMessage: boolean = false): Observable<T> {
    const httpParams = { ...params };
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.headers, params: httpParams })
      .pipe(catchError(error => this.handleError(error, withoutErrorMessage)));
  }

  /**
   *
   * @param endpoint
   * @param body
   */
  create<T, S>(endpoint: string, body: S): Observable<T> {
    const httpBody = body;
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, httpBody, { headers: this.headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   *
   * @param endpoint
   * @param body
   */
  update<T, S>(endpoint: string, body: S): Observable<T> {
    const httpBody = body;
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, httpBody, { headers: this.headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  delete<T, S>(endpoint: string, params?: S): Observable<T> {
    const httpParams = { ...params };
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`,{ headers: this.headers, params: httpParams })
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