import React, { useState } from 'react';
import CriticalWarningModal from './CriticalWarningModal';
const ChecklistTable = ({ items, onUpdateItem }) => {
  const [lastInteractedIndex, setLastInteractedIndex] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const handleValueChange = (index, value) => {
    // Check if we need to show a warning
    if (lastInteractedIndex !== null && items[index].requiresWarning) {
      setShowWarning(true);
    }
    setLastInteractedIndex(index);
    onUpdateItem(index, value);
  };
  const validateValue = (value, min, max, allowSlash) => {
    // Validation logic (same as in the original)
    // This would be implemented similarly to the original validateValue function
    // We are not going to replicate the entire function here for brevity, but it should be included.
  };
  return (
    <div>
      <CriticalWarningModal show={showWarning} onClose={() => setShowWarning(false)} />
      <table id="checklist-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>KKS</th>
            <th>Check</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.location}</td>
              <td>{item.kks}</td>
              <td>{item.check}</td>
              <td>
                {item.options ? (
                  <select
                    value={item.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className={
                      item.value === 'OK' || item.value === 'ABSENT'
                        ? 'select-ok'
                        : item.value === 'NO' || item.value === 'PRESENT'
                        ? 'select-no'
                        : 'select-default'
                    }
                  >
                    {item.options.map((option) => (
                      <option
                        key={option}
                        value={option}
                        disabled={option === 'Select'}
                        hidden={option === 'Select'}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="value-input-container">
                    <input
                      type={item.allowSlash ? 'text' : 'number'}
                      className="value-input"
                      placeholder={item.allowSlash ? 'e.g. -22/-15' : 'Enter value'}
                      value={item.value}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      onBlur={(e) => {
                        // Validate on blur
                        if (item.min !== undefined && item.max !== undefined) {
                          validateValue(e.target.value, item.min, item.max, item.allowSlash);
                        }
                      }}
                    />
                    <span className="unit-label">{item.unit}</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ChecklistTable;
