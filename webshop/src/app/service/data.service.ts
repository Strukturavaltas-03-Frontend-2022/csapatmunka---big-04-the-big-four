import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getAll(entityName:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${entityName}`);
  }

  get(id: number, entityName:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${entityName}/${id}`);
  }

  delete(id: number, entityName:string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}${entityName}/${id}`
    );
  }

  update(entity: any, entityName:string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}${entityName}/${entity.id}`,
      entity
    );
  }

  create(entity: any, entityName:string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}${entityName}`,
      entity
    );
  }
}


