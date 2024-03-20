import { AutoComplete } from './AutoComplete';
import './App.css';
import { createFetchUrl } from './helpers';

function App() {
  // Loading data from movie database
  const loadOptions = async (value: string) => {
    const url = createFetchUrl(`search/movie`, { page: 1, query: value });
    const response = await fetch(url);
    const data = await response.json();

    return data.results
      .map((result: any) => result.title)
      .filter((option: string) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
  };

  // Console log the selected value for this example
  return (
    <div className='App'>
      <AutoComplete
        loadOptions={loadOptions}
        onSelect={(value: string) => {
          console.log('onSelect', value);
        }}
      />
    </div>
  );
}

export default App;
