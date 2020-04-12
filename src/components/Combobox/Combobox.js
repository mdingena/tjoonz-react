import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCombobox } from 'downshift';
import he from 'he';
import PropTypes from 'prop-types';
import styles from './Combobox.module.css';

const Combobox = ({ placeholder, onSelect, optionsSelector }) => {
  const options = useSelector(optionsSelector);

  const [items, setItems] = useState(options);

  const handleInputChange = ({ inputValue }) => {
    const filteredItems = options.filter(
      ({ text }) => text.toLowerCase().includes(inputValue.toLowerCase())
    );
    setItems(filteredItems);
  };

  const handleSelection = ({ selectedItem }) => onSelect(selectedItem);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps
  } = useCombobox({
    items,
    onInputValueChange: handleInputChange,
    onSelectedItemChange: handleSelection,
    itemToString: _ => ''
  });

  return (
    <div className={styles.root}>
      <div {...getComboboxProps()}>
        <input
          className={styles.input}
          placeholder={placeholder}
          aria-label={placeholder}
          {...getInputProps()}
        />
      </div>
      <div className={styles.list} {...getMenuProps()}>
        {isOpen && (
          items.map((item, index) => (
            <div
              key={item.id}
              className={highlightedIndex === index ? styles.highlighted : styles.item}
              {...getItemProps({ item, index })}
            >
              <span className={styles.text}>{he.decode(item.text)}</span>
              <span className={styles.count}>{item.count.toLocaleString()}</span>
            </div>
          )))}
      </div>
    </div>
  );
};

Combobox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  optionsSelector: PropTypes.func.isRequired
};

export default Combobox;
