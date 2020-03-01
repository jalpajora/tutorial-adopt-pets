import React, { useState } from "react";

function useDropdown(
  label: string,
  defaultState: string,
  options: string[]
): [string, () => JSX.Element, (newState: string) => void] {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown = () => (
    <label htmlFor="breed">
      {label}
      <select
        id={id}
        value={state}
        onChange={e => setState(e.target.value)}
        onBlur={e => setState(e.target.value)}
        disabled={options.length === 0}
      >
        <option>All</option>
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
}

export default useDropdown;
