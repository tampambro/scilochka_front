<script lang="ts">
  import { alertMessage } from '../stores';
  import { isGoodMessage } from '../stores';
  import { isAlertActive } from '../stores';

  import { clickOutside } from '../functions/click_outside';

  function closedAlert(): void {
    isAlertActive.set(false);
  }
</script>

<div
  class="alert"
  class:active={$isAlertActive}
  on:click={closedAlert}
  on:outclick={closedAlert}
  use:clickOutside
>

  {#if $isGoodMessage === true}
    <div class="alert_success">

      <div class="alert_img-wrap">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.2 138.2">
          <circle class="path circle" fill="none" stroke-miterlimit="10" cx="69.1" cy="69.1" r="62.1"/>

          <polyline class="path check" fill="none" stroke-miterlimit="10" points="98.2,46.2 55.5,92.8 33.8,70.5 "/>
        </svg>
      </div>

      <p class="alert_text">{ $alertMessage }</p>
    </div>
  {:else if $isGoodMessage === false}
    <div class="alert_fail">

      <div class="alert_img-wrap">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.2 138.2">
          <circle class="path circle" fill="none" stroke-miterlimit="10" cx="69.1" cy="69.1" r="62.1"/>

          <line class="path line" fill="none" stroke-miterlimit="10" x1="38.4" y1="41.9" x2="99.8" y2="96.3"/>

          <line class="path line" fill="none" stroke-miterlimit="10" x1="99.8" y1="42" x2="38.4" y2="96.2"/>
        </svg>
      </div>

      <p class="alert_text">{ $alertMessage }</p>
    </div>
  {:else if $isGoodMessage === undefined}
    <div class="alert_warning">

      <div class="alert_img-wrap">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.2 138.2">
          <circle class="path circle" fill="none" stroke-miterlimit="10" cx="69.1" cy="69.1" r="62.1"/>

          <line class="path line exclamation" fill="none" stroke-miterlimit="10" x1="69.1" y1="42" x2="69.1" y2="76.3"/>

          <line class="path line exclamation" fill="none" stroke-miterlimit="10" x1="69.1" y1="86.3" x2="69.1" y2="96.3"/>
        </svg>
      </div>

      <p class="alert_text">{ $alertMessage }</p>
    </div>
  {/if}

</div>

<style>
  .alert {
    cursor: pointer;
    width: 300px;
    position: fixed;
    bottom: 50px;
    right: -300px;
    padding: 20px;
    background: var(--main-color-separate);
    transition: right .3s;
  }

  .alert.active {
    right: 0px;
  }

  .alert > div {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .alert_text {
    color: var(--text-in-separate);
    -webkit-animation: fade .3s linear;
    animation: fade .3s linear;
  }

  .alert_img-wrap {
    min-width: 60px;
    min-height: 60px;
    margin-right: 20px;
  }

  .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }

  .path.circle {
    stroke: var(--text-in-separate);
    stroke-width: 10px;
    -webkit-animation: dash 2s linear;
    animation: dash 2s linear;
  }

  .path.check {
    stroke: var(--text-in-separate);
    stroke-width: 10px;
    stroke-dashoffset: -100;
    -webkit-animation:
      dash-check .9s .35s ease-in-out forwards
      green-signal 2s 1s ease-in infinite;;
    animation:
      dash-check .9s .35s ease-in-out forwards,
      green-signal 2s 1s ease-in infinite;
  }

  .path.line {
    stroke: var(--text-in-separate);
    stroke-width: 10px;
    stroke-dashoffset: 1000;
    -webkit-animation:
      dash .9s .35s ease-in-out forwards,
      red-signal 2s 1s ease-in infinite;
    animation:
      dash .9s .35s ease-in-out forwards
      red-signal 2s 1s ease-in infinite;
  }

  .path.line.exclamation {
    -webkit-animation:
      dash .9s .35s ease-in-out forwards,
      yellow-signal 2s 1s ease-in infinite;
    animation:
      dash .9s .35s ease-in-out forwards
      yellow-signal 2s 1s ease-in infinite;
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }

  @keyframes green-signal {
    0% {
      stroke: var(--text-in-separate);
    }

    50% {
      stroke: var(--success-green);
    }

    100% {
      stroke: var(--text-in-separate);
    }
  }

  @keyframes red-signal {
    0% {
      stroke: var(--text-in-separate);
    }

    50% {
      stroke: var(--fail-red);
    }

    100% {
      stroke: var(--text-in-separate);
    }
  }

  @keyframes yellow-signal {
    0% {
      stroke: var(--text-in-separate);
    }

    50% {
      stroke: var(--warning-yellow);
    }

    100% {
      stroke: var(--text-in-separate);
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>