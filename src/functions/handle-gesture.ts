import { isSideMenuActive } from '../stores';

let touchstartX: number = 0;
let touchendX: number = 0;

export default function handleGesture(event: TouchEvent): void {

  if (event.type == 'touchstart') {
    touchstartX = event.changedTouches[0].screenX;
  } else if (event.type == 'touchend') {
    touchendX = event.changedTouches[0].screenX;

    if (touchendX < touchstartX) {
      isSideMenuActive.set(false);
    }
  }
}