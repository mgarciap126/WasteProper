import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IClient {
  id: number;
  name: string;
  contactEmail: string;
  revenue: number;
  startDate: string;
}

@Injectable({
  providedIn: 'root'
})

export class Client{
  private apiUrl = 'https://clients-example-api.fly.dev/clients';
  private groupId = '3';

  currentUser: IClient | null = null;

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('usuario_actual');
    if(stored){
      this.currentUser = JSON.parse(stored);
    }
  }

  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      'x-group-id': this.groupId,
      'Content-Type': 'application/json'
    });
  }

  getClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getClient(id: number): Observable<IClient>{
    return this.http.get<IClient>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  createClient(client: Partial<IClient>): Observable<IClient> {
    return this.http.post<IClient>(this.apiUrl, client, {
      headers: this.getHeaders()
    });
  }

  updateClient(id: number, client: Partial<IClient>): Observable<IClient> {
    return this.http.put<IClient>(`${this.apiUrl}/${id}`, client, {
      headers: this.getHeaders()
    });
  }

  deleteClient(id:number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  loginByEmail(email: string): Observable<IClient|null> {
    return new Observable(subscriber => {
      this.getClients().subscribe({
        next: clients => {
          const user = clients.find(c => c.contactEmail.toLowerCase() === email.toLowerCase());
          if(user) {
            this.currentUser = user;
            localStorage.setItem('usuario_actual', JSON.stringify(user));
            subscriber.next(user);
          } else{
            subscriber.next(null);
          }
          subscriber.complete();
        }, 
        error: err => subscriber.error(err)
      });
    });
  }

  logout() {
  const user = this.currentUser;
  if (user) {
    this.deleteClient(user.id).subscribe({
      next: () => {
        this.currentUser = null;
        localStorage.removeItem('usuario_actual');
      },
      error: err => {
        console.error('Error al eliminar el cliente:', err);
      }
    });
  } else {
    console.warn('No hay usuario actual para eliminar.');
    localStorage.removeItem('usuario_actual');
  }
}


  isLoggedIn(): boolean{
    return this.currentUser !== null;
  }
}
