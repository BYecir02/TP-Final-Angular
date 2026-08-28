import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

function nonWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  return control.value?.trim() ? null : { whitespace: true };
}

@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  readonly citySubmitted = output<string>();

  readonly searchForm = new FormGroup({
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, nonWhitespaceValidator],
    }),
  });

  submit(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.citySubmitted.emit(this.searchForm.controls.city.value.trim());
  }
}
