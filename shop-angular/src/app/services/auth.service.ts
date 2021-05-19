import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  getPassport() {
    return this.http.get(environment.serverUrl + '/status', { withCredentials: true });
  }

  login(username: string, password: string) {
    return this.http.post(environment.serverUrl + '/login', { username: username, password: password },
      {
        withCredentials: true,
        responseType: 'text', observe: 'response' as 'response'
      });
  }

  register(username: string, email: string, password: string) {
    return this.http.post(environment.serverUrl + '/users', { username: username, email: email, password: password },
      { responseType: 'text', observe: 'response' as 'response' });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
    return this.http.post(environment.serverUrl + '/logout',
      { withCredentials: true, responseType: 'text' });
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else return false;
  }
}
