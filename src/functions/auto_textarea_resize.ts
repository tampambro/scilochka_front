export default function autoTextareaResize(elemArr: NodeList): void {

  function onInput(): void {
    const scrollTop = window.pageYOffset;

    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';

    window.scrollTo(0, scrollTop);
  };

  elemArr.forEach((elem: Element) => {
    elem.addEventListener('input', onInput, false);
  });
}