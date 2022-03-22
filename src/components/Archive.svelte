<script lang="ts">
  import { onMount } from 'svelte';
  import { useNavigate } from 'svelte-navigator';
  import { get } from 'svelte/store'
  import type { NavigateFn } from 'svelte-navigator';

  import alertCall from '../functions/alert_call';
  import type ScilochkaData from '../interfaces/scilochka_data';
  import time_formatting, { timeCreation } from '../functions/time_formatting';

  import { archiveCash, scilochkaCash } from '../stores';
  import Logo from './Logo.svelte';

  const navigate: NavigateFn = useNavigate();
  let archive: ScilochkaData[] = [];

  function showScilochky(event: Event): void {
    const index: number = +(event.target as HTMLElement).dataset.index;
    const href: string = (event.target as HTMLElement).getAttribute('href');

    scilochkaCash.set(archive[index]);

    navigate(href);
  }

  function fetchArchive(): void {
    fetch('/api/archive', {
      method: 'get',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then((response) => response.json())
    .then((results) => {
      archive = results;
      archiveCash.set(results);
    })
    .catch((err) => {
      alertCall(err.message, false);
      archiveCash.set(archive);
      console.error(err);
    });
  }

  function getCreationTime(dateStr:string): string {
    const date: timeCreation = time_formatting(dateStr);
    return `${date.date} \n ${date.time}`
  }

  onMount(() => {
    const cash: ScilochkaData[] = get(archiveCash);

    if (cash.length) {
      archive = cash;
      return
    }

    fetchArchive();
  });
</script>

<main class="overall-wrapper">

  <Logo />

  <button class="common-btn" id="refresh-archive-btn" type="button" on:click={fetchArchive}>
    <span>Обновить</span>

    <div class="svg-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
      </svg>
    </div>
  </button>

  <div class="inner-wrapper">
    <h1>Архив сцылочек</h1>

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Заголовок</th>
          <th>Дата создания</th>
        </tr>
      </thead>

      <tbody>
        {#each archive as scilochka, index}
          <tr>
            <td>{ scilochka.id }</td>
            <td>
              <a
                class="tabel-link underline-link"
                href={ '/scilochka/' + scilochka.id }
                on:click|preventDefault={showScilochky}
                data-index={ index }
              >
                { scilochka.title }
              </a>
            </td>
            <td>{ getCreationTime(scilochka.date) }</td>

            <div class="tooltip">{ scilochka.content }</div>
          </tr>
        {/each}
      </tbody>
    </table>

  </div>
</main>

<style>
  a {
    font-weight: bold;
  }

  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border: 3px solid var(--main-color-separate);
  }

  thead {
    border-bottom: 3px solid var(--main-color-separate);
  }

  thead th:nth-child(1) {
    text-align: left;
    width: 15%;
  }

  thead th:nth-child(2) {
    width: 60%;
  }

  thead th:nth-child(3) {
    text-align: right;
    width: 25%;
  }

  tr {
    position: relative;
  }

  th, td {
    padding: 8px;
  }

  td:nth-child(3) {
    text-align: right;
  }

  tbody tr {
    transition: background .1s;
  }

  tbody tr:nth-child(even) {
    background: var(--transparent-blue);
  }

  tbody tr:hover {
    background: var(--transparent-pink);
  }

  tbody tr:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }

  .tooltip {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    max-width: 300px;
    max-height: 305px;
    overflow: hidden;
    transform: translate(0, -100%);
    background: var(--main-color-separate);
    color: var(--text-in-separate);
    padding: 8px;
    transition: opacity .5s;
    word-break: break-word;
  }

  #refresh-archive-btn {
    cursor: pointer;
    position: fixed;
    right: 8px;
    top: 8px;
  }

  #refresh-archive-btn span {
      display: inline;
    }

  #refresh-archive-btn .svg-wrap {
    display: none;
  }

  @media (max-width: 580px) {
    #refresh-archive-btn span {
      display: none;
    }

    #refresh-archive-btn .svg-wrap {
      display: flex;
    }
  }

  @media (max-width: 545px) {
    #refresh-archive-btn {
      background: transparent;
      border: none;
    }
  }

  @media (max-width: 470px) {
    table {
      font-size: 0.9rem;
    }

    thead th:nth-child(1) {
      width: 10%;
    }

    thead th:nth-child(2) {
      width: 60%;
    }

    thead th:nth-child(3) {
      width: 30%;
    }

    td:nth-child(3) {
      font-size: 3.3vw;
    }
  }
</style>