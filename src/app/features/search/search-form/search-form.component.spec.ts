import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reject an empty form and show the required message', () => {
    component.submit();
    fixture.detectChanges();

    expect(component.searchForm.invalid).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Veuillez saisir une ville.');
  });

  it('should reject a city made only of spaces', () => {
    component.searchForm.controls.city.setValue('   ');
    component.submit();

    expect(component.searchForm.invalid).toBe(true);
  });

  it('should emit a trimmed valid city', () => {
    const citySubmitted = vi.fn();
    component.citySubmitted.subscribe(citySubmitted);
    component.searchForm.controls.city.setValue(' Paris ');

    component.submit();

    expect(citySubmitted).toHaveBeenCalledWith('Paris');
  });
});
