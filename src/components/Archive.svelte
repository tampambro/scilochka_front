<script lang="ts">
  import { onMount } from 'svelte';
  import { useNavigate } from 'svelte-navigator';
  import { get } from 'svelte/store'
  import type { NavigateFn } from 'svelte-navigator';

  import alertCall from '../functions/alert_call';
  import type ScilochkaData from '../interfaces/scilochka_data';
  import time_formatting, { timeCreation } from '../functions/time_formatting';

  import { archiveCash, scilochkaCash } from '../stores';

  const navigate: NavigateFn = useNavigate();
  let archive: ScilochkaData[] = [
    {
        "content": "test_content",
        "date": "Fri, 18 Mar 2022 13:24:29 GMT",
        "id": 1,
        "title": "test_title"
    },
    {
        "content": "as",
        "date": "Sat, 19 Mar 2022 00:53:19 GMT",
        "id": 2,
        "title": "asd"
    },
    {
        "content": "test 3",
        "date": "Fri, 18 Mar 2022 22:19:26 GMT",
        "id": 3,
        "title": "test 3"
    }
];

  function showScilochky(event): void {
    const index: number = +event.target.dataset.index;
    const href: string = event.target.getAttribute('href');

    scilochkaCash.set(archive[index]);

    navigate(href);
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
  });
</script>

<main class="overall-wrapper">

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
    max-height: 300px;
    overflow: hidden;
    transform: translate(0, -100%);
    background: var(--main-color-separate);
    color: var(--text-in-separate);
    padding: 8px;
    transition: opacity .5s;
  }
</style>