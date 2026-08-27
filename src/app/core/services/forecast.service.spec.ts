import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ForecastService } from './forecast.service';

describe('ForecastService', () => {
  let service: ForecastService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForecastService],
    });

    service = TestBed.inject(ForecastService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should map the OpenWeather response into five daily forecast entries', () => {
    const city = 'Paris';

    service.getForecast(city).subscribe((forecast) => {
      expect(forecast.length).toBeLessThanOrEqual(5);
      expect(forecast[0]).toEqual({
        date: '2025-01-01',
        temperature: 14,
        description: 'Nuageux',
        icon: '04d',
      });
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url.includes('/forecast') &&
        request.params.get('q') === city &&
        request.params.get('units') === 'metric' &&
        request.params.get('lang') === 'fr',
    );

    expect(req.request.method).toBe('GET');

    req.flush({
      list: [
        {
          dt_txt: '2025-01-01 00:00:00',
          main: { temp: 10 },
          weather: [{ description: 'Nuageux', icon: '04d' }],
        },
        {
          dt_txt: '2025-01-01 12:00:00',
          main: { temp: 18 },
          weather: [{ description: 'Nuageux', icon: '04d' }],
        },
        {
          dt_txt: '2025-01-02 00:00:00',
          main: { temp: 12 },
          weather: [{ description: 'Peu nuageux', icon: '02d' }],
        },
        {
          dt_txt: '2025-01-02 12:00:00',
          main: { temp: 15 },
          weather: [{ description: 'Peu nuageux', icon: '02d' }],
        },
        {
          dt_txt: '2025-01-03 00:00:00',
          main: { temp: 11 },
          weather: [{ description: 'Pluie légère', icon: '10d' }],
        },
        {
          dt_txt: '2025-01-03 12:00:00',
          main: { temp: 13 },
          weather: [{ description: 'Pluie légère', icon: '10d' }],
        },
      ],
    });
  });
});
