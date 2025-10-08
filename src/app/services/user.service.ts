import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export interface User { id?: number; firstName: string; email: string; }

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpService) {}
  login(payload: { email: string; password: string }): Observable<User> { return this.http.post<User>('/login', payload); }
  register(payload: { firstName: string; email: string; password: string }): Observable<User> { return this.http.post<User>('/users', payload); }
}


