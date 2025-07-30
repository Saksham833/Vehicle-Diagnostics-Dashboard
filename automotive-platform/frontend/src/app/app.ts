import { Component } from '@angular/core';
import { SearchPanel } from './components/search-panel/search-panel';
import { LogTable } from './components/log-table/log-table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';

interface LogEntry {
  timestamp: string;
  message: string;
  vehicleId: string;
  code: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, SearchPanel, LogTable],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  logs: LogEntry[] = [];
  hasSearched: boolean | undefined;

  constructor(private http: HttpClient) {}

  onSearch(filters: any) {
    let params = new HttpParams();
  
    if (filters.vehicleId) {
      params = params.set('vehicle', filters.vehicleId);
    }
    if (filters.code) {
      params = params.set('code', filters.code);
    }
    if (filters.from) {
      params = params.set('from', filters.from);
    }
    if (filters.to) {
      params = params.set('to', filters.to);
    }
  
    this.http.get<LogEntry[]>('http://localhost:3000/logs', { params }).subscribe(data => {
      this.logs = data;
      this.hasSearched = true;
    });
  }
  
  
}
