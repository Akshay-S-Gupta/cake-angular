import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly baseUrl = 'http://localhost:3000'; // Changed to match json-server default port
  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> { return this.http.get<T>(`${this.baseUrl}${path}`); }
  post<T>(path: string, body: unknown): Observable<T> { return this.http.post<T>(`${this.baseUrl}${path}`, body); }
  put<T>(path: string, body: unknown): Observable<T> { return this.http.put<T>(`${this.baseUrl}${path}`, body); }
  delete<T>(path: string): Observable<T> { return this.http.delete<T>(`${this.baseUrl}${path}`); }
}


