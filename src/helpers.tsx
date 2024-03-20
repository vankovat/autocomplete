export const debouce = (func: Function, timeout: number = 500) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
};

export const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {' '}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { fontWeight: 'bold' }
              : {}
          }
        >
          {part}
        </span>
      ))}{' '}
    </span>
  );
};

const BASE_URL = 'https://api.themoviedb.org/3';

// Using my own free API key, you can use it for testing
export const createFetchUrl = (path: string, params: Record<string, any>) => {
  const queryParams = new URLSearchParams({
    api_key: '03b8572954325680265531140190fd2a',
    ...params,
  });

  return `${BASE_URL}/${path}?${queryParams.toString()}`;
};
