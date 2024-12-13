import React, { useState, useCallback, memo } from 'react';
import { useFormContext } from '../context/FormContext';
import { BaseField } from '../fields/BaseField';

export const FormFields: React.FC = memo(() => {
  const { state, dispatch } = useFormContext();
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const { fields } = state;

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.setAttribute('aria-grabbed', 'true');
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.removeAttribute('aria-grabbed');
    setDragIndex(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (dragIndex === null) return;
    const newFields = [...fields];
    const [movedField] = newFields.splice(dragIndex, 1);
    newFields.splice(dropIndex, 0, movedField);

    // Simulate reorder by removing and re-adding:
    dispatch({ type: 'REMOVE_FIELD', id: movedField.id });
    dispatch({ type: 'ADD_FIELD', field: movedField });

    setDragIndex(null);
  }, [dragIndex, fields, dispatch]);

  const updateFieldProperty = (id: string, property: keyof BaseField, value: any) => {
    dispatch({ type: 'UPDATE_FIELD_PROPERTY', id, property, value });
  };

  return (
    <div
      role="list"
      aria-label="Form Fields"
      aria-describedby="form-fields-instructions"
    >
      <p id="form-fields-instructions" style={{ fontSize: '0.9em', color: '#666' }}>
        Drag and drop fields to reorder. Edit the properties below to customize your fields.
      </p>
      {fields.map((field: BaseField, index: number) => (
        <div
          key={field.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
          role="listitem"
          aria-label={`Field: ${field.label}`}
          aria-grabbed="false"
          style={{
            border: '1px solid #ccc',
            padding: '8px',
            marginBottom: '4px',
            background: '#fff'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
            <label>
              ID:
              <input
                type="text"
                value={field.id}
                onChange={(e) => updateFieldProperty(field.id, 'id', e.target.value)}
              />
            </label>
            <label>
              Label:
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateFieldProperty(field.id, 'label', e.target.value)}
              />
            </label>
            <label>
              Placeholder:
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => updateFieldProperty(field.id, 'placeholder', e.target.value)}
              />
            </label>
          </div>

          {/* Field Value Input */}
          {field.type === 'checkbox' ? (
            <label>
              Value:
              <input
                type="checkbox"
                checked={!!field.value}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', id: field.id, value: e.target.checked })}
              />
            </label>
          ) : field.type === 'number' ? (
            <label>
              Value:
              <input
                type="number"
                value={field.value}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', id: field.id, value: e.target.value })}
              />
            </label>
          ) : (
            <label>
              Value:
              <input
                type="text"
                value={field.value || ''}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', id: field.id, value: e.target.value })}
              />
            </label>
          )}

          <button onClick={() => dispatch({ type: 'REMOVE_FIELD', id: field.id })} aria-label={`Remove ${field.label}`}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
});