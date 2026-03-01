import { Component } from '@angular/core';
import { BotService } from '../services/bot.service';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: ChatMessage[] = [
    {
      text: "Hello! I'm your arithmetic bot 🤖 Ask me any basic math question like \"What is 5 + 3?\" or type \"help\" for examples.",
      sender: 'bot',
      timestamp: new Date()
    }
  ];
  userInput = '';

  constructor(private botService: BotService) {}

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text) return;

    this.messages.push({ text, sender: 'user', timestamp: new Date() });
    this.userInput = '';

    setTimeout(() => {
      const response = this.botService.getResponse(text);
      this.messages.push({ text: response, sender: 'bot', timestamp: new Date() });
    }, 300);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  formatText(text: string): string {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }
}
