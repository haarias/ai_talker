import { TestBed } from '@angular/core/testing';
import { BotService } from './bot.service';

describe('BotService', () => {
  let service: BotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers', () => {
    const response = service.getResponse('5 + 3');
    expect(response).toContain('8');
  });

  it('should subtract two numbers', () => {
    const response = service.getResponse('10 - 4');
    expect(response).toContain('6');
  });

  it('should multiply two numbers', () => {
    const response = service.getResponse('3 * 7');
    expect(response).toContain('21');
  });

  it('should divide two numbers', () => {
    const response = service.getResponse('20 / 4');
    expect(response).toContain('5');
  });

  it('should handle natural language arithmetic question', () => {
    const response = service.getResponse('What is 8 + 2?');
    expect(response).toContain('10');
  });

  it('should handle division by zero', () => {
    const response = service.getResponse('5 / 0');
    expect(response).toContain('zero');
  });

  it('should respond to greeting', () => {
    const response = service.getResponse('hello');
    expect(response.toLowerCase()).toContain('hello');
  });

  it('should respond to help request', () => {
    const response = service.getResponse('help');
    expect(response.toLowerCase()).toContain('arithmetic');
  });

  it('should handle empty input gracefully', () => {
    const response = service.getResponse('');
    expect(response).toBeTruthy();
  });

  it('should respond to unknown input', () => {
    const response = service.getResponse('what is the weather like?');
    expect(response).toBeTruthy();
  });
});
