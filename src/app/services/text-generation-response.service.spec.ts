import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AIGenerationService } from './text-generation-response.service';

fdescribe('AIGenerationService', () => {
  let service: AIGenerationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AIGenerationService]
    });

    service = TestBed.inject(AIGenerationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return generated content', () => {
    const prompt = 'Test prompt';
    const mockResponse = {
      output: {
        choices: [
          {
            finish_reason: 'stop',
            message: {
              role: 'assistant',
              content: '(mood) 😊\n\n这是一个测试的回复。'
            }
          }
        ]
      },
      usage: {
        total_tokens: 10,
        output_tokens: 5,
        input_tokens: 5
      },
      request_id: 'test-request-id'
    };

    service.generateContent(prompt).subscribe((content) => {
      expect(content).toBe(mockResponse.output.choices[0].message.content);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});

