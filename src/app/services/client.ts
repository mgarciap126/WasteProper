import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  getClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.apiUrl);
  }

  getClient(id: number): Observable<IClient>{
    return this.http.get<IClient>(`${this.apiUrl}/${id}`);
  }

  createClient(client: Partial<IClient>): Observable<IClient> {
    return this.http.post<IClient>(this.apiUrl, client);
  }

  updateClient(id: number, client: Partial<IClient>): Observable<IClient> {
    return this.http.put<IClient>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id:number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
