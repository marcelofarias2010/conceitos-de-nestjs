import { RegexProtocol } from './regex-protocol';

export class OnlyLowercaseLetterRegex implements RegexProtocol {
  execute(str: string): string {
    return str.replace(/[^a-z]/g, '');
  }
}
