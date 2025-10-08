import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';

export interface User { id?: number; firstName: string; email: string; password?: string; }

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpService) {}
  
  login(payload: { email: string; password: string }): Observable<User> {
    return this.http.get<User[]>('/users').pipe(
      map(users => {
        const user = users.find(u => u.email === payload.email && u.password === payload.password);
        if (user) {
          // Return user without password
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        throw new Error('Invalid credentials');
      }),
      catchError(error => throwError(() => error))
    );
  }
  
  register(payload: { firstName: string; email: string; password: string }): Observable<User> {
    return this.http.post<User>('/users', payload).pipe(
      map(user => {
        // Return user without password
        const { password, ...userWithoutPassword } = user as any;
        return userWithoutPassword;
      }),
      catchError(error => throwError(() => error))
    );
  }
}


