import { useCallback, useEffect, useRef, useState } from 'react';
import { debouce, getHighlightedText } from './helpers';
import './AutoComplete.css';

export const AutoComplete = (props: {
  loadOptions: (value: string) => Promise<string[]>;
  onSelect: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const handleClick = useCallback(
    (option: string) => {
      props.onSelect(option);
      setInputValue(option);
      setFilteredOptions([]);
      setShowOptions(false);
    },
    [props]
  );

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showOptions) {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedOptionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          scrollOptionIntoView(selectedOptionIndex - 1);
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelectedOptionIndex((prevIndex) =>
            Math.min(prevIndex + 1, filteredOptions.length - 1)
          );
          scrollOptionIntoView(selectedOptionIndex + 1);
        } else if (event.key === 'Enter') {
          if (selectedOptionIndex !== -1) {
            handleClick(filteredOptions[selectedOptionIndex]);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showOptions, filteredOptions, selectedOptionIndex, handleClick]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSelectedOptionIndex(-1);
    debounceFilter(value);
  };

  // Use debouce funtion for filtering options
  const debounceFilter = debouce(async (value: string) => {
    if (value === '') {
      setFilteredOptions([]);
      setShowOptions(false);
      return;
    }
    const result = await props.loadOptions(value);
    setFilteredOptions(result);
    setShowOptions(true);
  });

  const handleOptionClick = (option: string) => {
    handleClick(option);
    inputRef.current?.focus();
  };

  const handleOptionHover = (index: number) => {
    setSelectedOptionIndex(index);
  };

  // Handle scroll on keyboard navigation
  const scrollOptionIntoView = (index: number) => {
    if (optionsRef.current) {
      const options = optionsRef.current;
      const option = options.childNodes[index] as HTMLElement;
      if (option) {
        options.scrollTop = option.offsetTop - options.offsetHeight / 2;
      }
    }
  };

  return (
    <div className='autocomplete-container'>
      <input
        ref={inputRef}
        autoFocus
        type='text'
        value={inputValue}
        onChange={handleChange}
        placeholder='Search'
        className='autocomplete-input'
      />
      {showOptions && filteredOptions.length > 0 && inputValue !== '' && (
        <ul
          ref={optionsRef}
          className='autocomplete-options'
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => handleOptionHover(index)}
              className={
                index === selectedOptionIndex
                  ? 'autocomplete-option selected'
                  : 'autocomplete-option'
              }
            >
              {getHighlightedText(option, inputValue)}
            </li>
          ))}
        </ul>
      )}
      {showOptions && filteredOptions.length === 0 && (
        <ul className='autocomplete-options'>
          <li className='autocomplete-empty'>No results found.</li>
        </ul>
      )}
    </div>
  );
};
