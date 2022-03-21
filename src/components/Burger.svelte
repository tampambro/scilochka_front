<script lang="ts">
  import { isSideMenuActive } from '../stores';

  function openSideMenu(): void {
    isSideMenuActive.set(true);
  }
</script>

<svg
  class="burger"
  width="40"
  height="40"
  viewBox="0 0 100 80"
  on:click={openSideMenu}
>
  <rect width="100" height="20"></rect>
  <rect y="30" width="100" height="20"></rect>
  <rect class="blue-rect" y="60" width="100" height="20"></rect>
</svg>

<style>
  .burger {
    position: fixed;
    cursor: pointer;
    z-index: 1;
  }

  .burger:hover .blue-rect {
    fill: var(--main-pink);
  }

  .burger:active rect {
    fill: var(--main-pink);
  }

  rect {
    fill: var(--main-color-separate);
  }

  .blue-rect {
    fill: var(--main-blue);
    transition: fill .3s;
  }

  @media (max-width: 545px) {
    rect {
      fill: var(--text-in-separate);
    }

    .blue-rect {
      display: none;
    }
  }
</style>