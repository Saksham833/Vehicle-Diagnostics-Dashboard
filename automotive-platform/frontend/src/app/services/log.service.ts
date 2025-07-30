import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiagnosticLog } from '../models/log.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogService {
  
  private baseUrl = 'http://localhost:3000/logs';
  constructor(private http: HttpClient) {}

  getLogs(filters: { vehicle?: string; code?: string; from?: string; to?: string }): Observable<DiagnosticLog[]> {
    let params = new HttpParams();
    if (filters.vehicle) params = params.set('vehicle', filters.vehicle);
    if (filters.code) params = params.set('code', filters.code);
    if (filters.from) params = params.set('from', filters.from);
    if (filters.to) params = params.set('to', filters.to);

    return this.http.get<DiagnosticLog[]>(this.baseUrl, { params });
  }
}
