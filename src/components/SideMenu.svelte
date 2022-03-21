<script lang="ts">
  import { link } from 'svelte-navigator';
  import { isSideMenuActive } from '../stores';
	import { clickOutside } from '../functions/click_outside';

  function closeMenu(): void {
    isSideMenuActive.set(false);
  }

  function linkHandler(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('side-menu_link')) {
      closeMenu()
    }
  }

</script>

<div
  class="side-menu_wrapper"
  class:active={$isSideMenuActive}
  use:clickOutside
  on:outclick={closeMenu}
  on:click={linkHandler}
>
  <nav class="side-menu_nav">
    <a class="side-menu_link underline-link" href="/create" use:link>Создать сцылочку</a>
    <a class="side-menu_link underline-link" href="/archive" use:link>Архив</a>
  </nav>

  <div class="help">
    <p class="help__header">Подсказки</p>
    <div class="help_action">
      <p class="help_action_title">Создание сцылочки:</p>
      <ul class="help_text">
        <li>заголовок обязателен для заполнения;</li>
        <li>лимит для заголовка - 200 символов;</li>
        <li>лимит для основной части - 5000 символов.</li>
      </ul>
    </div>
  </div>

  <footer class="side-menu-footer">
    <a href="mailto:scilochka@yandex.ru">e-mail</a>
    <a href="/about" use:link>О сайте</a>
  </footer>
</div>

<style>
  .side-menu_wrapper {
    z-index: 1;
    position: fixed;
    width: 300px;
    height: 100vh;
    background: var(--main-color-separate);
    color: var(--text-in-separate);
    top: 0;
    left: 0;
    padding: 8px 8px 0 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    left: -300px;
    transition: left .3s;
  }

  .side-menu_wrapper.active {
    left: 0;
  }

  .side-menu_wrapper a {
    color: var(--text-in-separate);
  }

  .side-menu_nav {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .side-menu_link {
    align-self: start;
    margin-bottom: 10px;
  }

  .side-menu_link:active {
    color: var(--main-pink);
  }

  .help_text {
    color: var(--main-pink);
    font-size: 0.7rem;
    padding-inline-start: 25px;
    list-style-type: square;
  }

  .side-menu-footer {
    border-top: 3px solid var(--main-blue);
    height: 50px;
    display: flex;
    padding: 8px 0 0 8px;
    width: calc(100% + 16px);
    margin-left: -8px;
  }

  .side-menu-footer a {
    margin-right: 30px;
    transition: color .3s;
  }

  .side-menu-footer a:hover {
    color: var(--main-pink);
  }

  .help__header {
    margin-bottom: 20px;
  }

  .help_action_title {
    font-size: 0.8rem;
  }
</style>