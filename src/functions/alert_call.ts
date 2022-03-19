import { alertMessage } from '../stores';
import { isGoodMessage } from '../stores';
import { isAlertActive } from '../stores';

export default function alertCall(message: string, isGood: boolean | undefined): void {
  alertMessage.set(message);
  isGoodMessage.set(isGood);
  isAlertActive.set(true);
}