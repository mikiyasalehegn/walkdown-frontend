import React, { useState, useEffect } from 'react';
import WeatherWidget from './WeatherWidget';
import ChecklistTable from './ChecklistTable';
import RemarksSection from './RemarksSection';
import { exportChecklistToPDF } from '../services/pdfService';
import { checklistData } from '../data/checklistData';
const ChecklistScreen = ({ position, shiftInfo, onLogout }) => {
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [checklistItems, setChecklistItems] = useState([]);
  useEffect(() => {
    // Initialize checklist items with the data for the current position
    const items = checklistData.filter(item => item.visibleTo.includes(position));
    setChecklistItems(items.map(item => ({ ...item, value: '' })));
  }, [position]);
  const handleSaveDraft = () => {
    // Save draft to localStorage
    const draft = {
      position,
      shiftInfo,
      items: checklistItems,
      remarks,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('openergyChecklistDraft', JSON.stringify(draft));
    alert('Draft saved successfully!');
  };
  const handleLoadDraft = () => {
    const savedDraft = localStorage.getItem('openergyChecklistDraft');
    if (!savedDraft) {
      alert('No saved draft found');
      return;
    }
    if (window.confirm('Load saved draft? This will overwrite current progress.')) {
      const draft = JSON.parse(savedDraft);
      setChecklistItems(draft.items);
      setRemarks(draft.remarks);
      alert('Draft loaded successfully!');
    }
  };
  const handleExportPDF = () => {
    exportChecklistToPDF(checklistItems, position, shiftInfo, remarks);
  };
  const handleSubmit = () => {
    // Validate all fields
    const isValid = validateChecklist();
    if (!isValid) {
      return;
    }
    setShowRemarks(true);
  };
  const validateChecklist = () => {
    let isValid = true;
    // Validation logic here (similar to the original)
    return isValid;
  };
  const handleFinalSubmit = () => {
    // Submit the checklist with remarks
    console.log('Checklist submitted with remarks:', remarks);
    alert('Checklist submitted successfully with your remarks!');
    setShowRemarks(false);
    // Reset or go to login?
  };
  const handleCancelRemarks = () => {
    setShowRemarks(false);
  };
  const updateItemValue = (index, value) => {
    const newItems = [...checklistItems];
    newItems[index].value = value;
    setChecklistItems(newItems);
  };
  const shiftNames = {
    morning: 'Morning Shift',
    evening: 'Evening Shift',
    night: 'Night Shift',
    weekend: 'Weekend Shift',
    'morning-12hr': 'Weekend Morning 12hr',
    'night-12hr': 'Weekend Night 12hr',
  };
  const fullShiftType = shiftInfo.shiftType === 'weekend' 
    ? `${shiftInfo.shiftType} (${shiftInfo.weekendShiftType})`
    : shiftInfo.shiftType;
  const formattedDate = new Date(shiftInfo.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <div className="container">
      <button className="logout-btn" onClick={onLogout}>Logout</button>
      <h1>WALKDOWN CHECKLIST</h1>
      <h2 id="checklist-header">
        {position === 'operator' ? 'Operator' : 'Shift Manager'} - {shiftNames[fullShiftType] || fullShiftType} - {formattedDate}
      </h2>
      <div className="timestamp" id="checklist-time">
        Last updated: {new Date().toLocaleString()}
      </div>
      <WeatherWidget />
      <ChecklistTable 
        items={checklistItems} 
        position={position}
        onUpdateItem={updateItemValue}
      />
      {showRemarks && (
        <RemarksSection 
          remarks={remarks}
          onRemarksChange={setRemarks}
          onSubmit={handleFinalSubmit}
          onCancel={handleCancelRemarks}
        />
      )}
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <button onClick={handleSaveDraft}>Save Draft</button>
        <button onClick={handleSubmit}>Submit Checklist</button>
        <button className="secondary" onClick={() => {}}>Update Timestamp</button>
        <div className="export-buttons">
          <button className="export-btn" onClick={handleExportPDF}>Export to PDF</button>
          <button className="export-btn" onClick={handleLoadDraft}>Load Draft</button>
        </div>
      </div>
    </div>
  );
};
export default ChecklistScreen;
