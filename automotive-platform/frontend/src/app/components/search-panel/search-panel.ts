import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-panel.html',
  styleUrls: ['./search-panel.scss'],
})
export class SearchPanel {
  @Output() search = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      vehicleId: [''],
      code: [''],
      from: [''],
      to: [''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.search.emit(this.form.value);
    }
  }

  onClear() {
    this.form.reset();        
    this.search.emit();            
  }
}
