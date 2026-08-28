import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ForecastPanelComponent } from './forecast-panel.component';
import { ForecastService } from '../../../core/services/forecast.service';

describe('ForecastPanelComponent', () => {
  let component: ForecastPanelComponent;
  let fixture: ComponentFixture<ForecastPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastPanelComponent],
      providers: [
        {
          provide: ForecastService,
          useValue: {
            getForecast: vi.fn().mockReturnValue(
              of([
                { date: '2025-01-01', temperature: 14, description: 'Nuageux', icon: '04d' },
                { date: '2025-01-02', temperature: 15, description: 'Peu nuageux', icon: '02d' },
              ]),
            ),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'Paris' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render forecast data for the selected city', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2025-01-01');
    expect(compiled.textContent).toContain('Nuageux');
  });
});
