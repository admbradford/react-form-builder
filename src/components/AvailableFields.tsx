import React, { memo } from 'react';
import { FieldRegistry } from '../fields/FieldRegistry';
import { useFormContext } from '../context/FormContext';

interface AvailableFieldsProps {
  fieldRegistry: FieldRegistry;
}

export const AvailableFields: React.FC<AvailableFieldsProps> = memo(({ fieldRegistry }) => {
  const { dispatch } = useFormContext();
  const fieldTypes = fieldRegistry.getRegisteredTypes();

  return (
    <div aria-label="Available Fields" role="list">
      <h2>Available Fields</h2>
      <p style={{ fontSize: '0.9em', color: '#666' }}>
        Click a button to add a field to your form.
      </p>
      {fieldTypes.map((type) => (
        <button
          role="listitem"
          key={type}
          onClick={() => {
            const field = fieldRegistry.createField(type, `New ${type} field`);
            if (field) {
              dispatch({ type: 'ADD_FIELD', field });
            }
          }}
        >
          Add {type} field
        </button>
      ))}
    </div>
  );
});