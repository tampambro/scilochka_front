<script lang="ts">
  import { onMount } from 'svelte';

  import type ScilochkaData from '../interfaces/scilochka_data';
  import type { timeCreation } from '../functions/time_formatting';
  import time_formatting from '../functions/time_formatting';
  import { get } from 'svelte/store';

  import { scilochkaCash } from '../stores';
  import { newScilochkaNumber } from '../stores';

  import Logo from './Logo.svelte';

  export let id: number;

  let data: ScilochkaData;
  let date: timeCreation;
  let isFetchEnd: boolean = false;

  function getScilochka(): void {
    fetch(`/api/scilochka/${id}`, {
      method: 'get',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then((response) => {
      if (response.status === 404) {
        throw new Error('404');
      } else {
        return response.json();
      }
    })
    .then((json) => {
      data = json;
      date = time_formatting(data.date);
      isFetchEnd = true;
    })
    .catch((err) => {
      data = fetchErrorHandler(err);
      isFetchEnd = true;
    });
  }

  function fetchErrorHandler(err: any): ScilochkaData {
    console.error(err.message);
    return data = {
      'content': '',
      'date': '',
      'id': 0,
      'title': err.message === '404' ? 'Такой сцылочки нет, сарян :p' : 'Что-то пошло не так =('
    }
  }

  onMount(() => {
    const cash: ScilochkaData = get(scilochkaCash);

    if (cash && !get(newScilochkaNumber)) {
      data = cash;
      date = time_formatting(cash.date);
      isFetchEnd = true;
      return;
    } else if (get(newScilochkaNumber)) {
      newScilochkaNumber.set(0);
    }

    getScilochka();
  });

</script>

<main class="overall-wrapper">

  <Logo />

  {#if isFetchEnd}
    {#if date}
      <p class="scilochka-date"><span>Создано: <br /></span>  { date?.date } <br /> { date?.time }</p>
    {/if}
    <div class="inner-wrapper">

      <h1 class="scilochka_header">{ data?.title }</h1>

      <hr />

      <p class="scilochka_content">{ data?.content }</p>

    </div>
  {/if}

</main>

<style>
  .scilochka_header {
    min-width: 150px;
    margin: 0;
    border-radius: 5px;
    transition: all .3s;
    display: inline-block;
    padding: 8px;
  }

  .scilochka_content {
    width: 100%;
    min-height: 150px;
    border-radius: 5px;
    transition: all .3s;
    overflow-y: hidden;
    padding: 8px;
  }

  .scilochka-date {
    font-size: 0.8em;
    text-align: end;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  @media (max-width: 545px) {
    .scilochka-date {
      color: var(--text-in-separate);
      font-size: 2.5vw;
    }

    .scilochka-date span {
      display: none;
      font-size: 2.6vw;
    }
  }

  @media (max-width: 420px) {
    .scilochka-date {
      font-size: 0.6rem;
    }
  }
</style>