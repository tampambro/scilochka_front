<script lang="ts">

</script>

<svg class="burger" width="40" height="40" viewBox="0 0 100 80">
  <rect width="100" height="20"></rect>
  <rect y="30" width="100" height="20"></rect>
  <rect class="blue-rect" y="60" width="100" height="20"></rect>
</svg>

<style>
  .burger {
    position: absolute;
    cursor: pointer;
  }

  rect {
    fill: var(--main-color-separate);
  }

  .blue-rect {
    fill: var(--main-blue);
  }
</style>