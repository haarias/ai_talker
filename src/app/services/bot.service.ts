import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  private readonly ARITHMETIC_PATTERN =
    /(-?\d+(?:\.\d+)?)\s*([\+\-\*\/x×÷])\s*(-?\d+(?:\.\d+)?)/i;
  private readonly MAX_DECIMAL_PLACES = 10;

  getResponse(userMessage: string): string {
    const trimmed = userMessage.trim();

    if (!trimmed) {
      return "Please type an arithmetic question, for example: \"What is 5 + 3?\"";
    }

    const match = trimmed.match(this.ARITHMETIC_PATTERN);
    if (match) {
      return this.calculate(parseFloat(match[1]), match[2], parseFloat(match[3]));
    }

    const lower = trimmed.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return "Hello! I'm your arithmetic bot 🤖 Ask me any basic math question like \"What is 12 × 4?\"";
    }
    if (lower.includes('help')) {
      return "I can solve basic arithmetic! Try asking:\n• \"What is 8 + 5?\"\n• \"Calculate 20 - 7\"\n• \"3 * 6\"\n• \"100 / 4\"";
    }
    if (lower.includes('bye') || lower.includes('goodbye')) {
      return "Goodbye! Come back if you need more math help! 👋";
    }

    return "I'm not sure what you mean. Try asking an arithmetic question like \"What is 9 + 6?\" or type \"help\" for examples.";
  }

  private calculate(a: number, operator: string, b: number): string {
    let result: number;
    let operatorSymbol: string;

    switch (operator) {
      case '+':
        result = a + b;
        operatorSymbol = '+';
        break;
      case '-':
        result = a - b;
        operatorSymbol = '-';
        break;
      case '*':
      case 'x':
      case '×':
        result = a * b;
        operatorSymbol = '×';
        break;
      case '/':
      case '÷':
        if (b === 0) {
          return "Division by zero is undefined! Please try a different calculation.";
        }
        result = a / b;
        operatorSymbol = '÷';
        break;
      default:
        return "I don't recognize that operator. I support +, -, *, and /.";
    }

    const formatted = Number.isInteger(result)
      ? result.toString()
      : parseFloat(result.toFixed(this.MAX_DECIMAL_PLACES)).toString();

    return `${a} ${operatorSymbol} ${b} = **${formatted}**`;
  }
}
