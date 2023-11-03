import { useEffect } from 'react';
import reactLogo from './assets/react.svg';
import { computed, effect } from '@preact/signals-react';
import viteLogo from '/vite.svg';
import './App.css';
import NewComponent from './NewComponent';
import { count, list } from './signals/signals';
import jsonData from './data.json';

const loading = computed(() => {
  return !list.value.length;
});

function App() {
  function handleClick() {
    // update the signal(global useState value directly)
    count.value = ++count.value;
  }

  effect(() => {
    console.log('dependent signal has changed', count.value);
  });

  useEffect(() => {
    async function getNames(d: Record<string, string>[]) {
      const newPromise = new Promise<Record<string, string>[]>(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (resolve, reject) => {
          setTimeout(() => {
            resolve(d);
          }, 3000);
        }
      );

      const data = await newPromise;

      // update the list directly after the promise is resolved
      list.value = data;
    }

    getNames(jsonData);
  }, []);

  return (
    <>
      <p>{count.value}</p>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>count is {count.value}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <NewComponent />
      <div>loading - {JSON.stringify(loading.value)}</div>
      {loading.value ? <div>Loading</div> : <p>{JSON.stringify(list)}</p>}
    </>
  );
}

export default App;
