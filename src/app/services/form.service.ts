import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormService {
  validateEmail(email: string): boolean { return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email); }
}


