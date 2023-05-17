import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, User2 } from './user';
import jwt_decode from 'jwt-decode';

interface SignupResponse {
  token: string;
}
interface Body {
  name: string;
  email: string;
  password: string;
}
interface Body2 {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/products`);
  }

  signup(data: Body): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/signup`, data).pipe(
      tap((response: SignupResponse) => {
        localStorage.setItem('access_token', response.token);
      })
    );
  }

  login(data: Body2): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response: SignupResponse) => {
        localStorage.setItem('access_token', response.token);
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }
  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken?.role === 'admin';
    }
    return false;
  }
}
