import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-log-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './log-table.html',
  styleUrls: ['./log-table.scss'],
})
export class LogTable {
  @Input() logs: any[] = [];
}
