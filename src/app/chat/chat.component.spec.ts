import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { BotService } from '../services/bot.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [FormsModule],
      providers: [BotService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial bot greeting message', () => {
    expect(component.messages.length).toBe(1);
    expect(component.messages[0].sender).toBe('bot');
  });

  it('should send a user message and receive a bot response', fakeAsync(() => {
    component.userInput = '5 + 3';
    component.sendMessage();
    expect(component.messages.length).toBe(2);
    expect(component.messages[1].sender).toBe('user');
    expect(component.messages[1].text).toBe('5 + 3');

    tick(300);
    expect(component.messages.length).toBe(3);
    expect(component.messages[2].sender).toBe('bot');
    expect(component.messages[2].text).toContain('8');
  }));

  it('should not send empty messages', () => {
    component.userInput = '  ';
    component.sendMessage();
    expect(component.messages.length).toBe(1);
  });

  it('should clear input after sending', () => {
    component.userInput = '2 + 2';
    component.sendMessage();
    expect(component.userInput).toBe('');
  });

  it('should send message on Enter key', fakeAsync(() => {
    component.userInput = '4 * 5';
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    tick(300);
    expect(component.messages.length).toBe(3);
  }));

  it('should format bold markdown text', () => {
    expect(component.formatText('Result is **42**')).toBe('Result is <strong>42</strong>');
  });

  it('should escape HTML to prevent XSS', () => {
    const result = component.formatText('<script>alert("xss")</script>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });
});
