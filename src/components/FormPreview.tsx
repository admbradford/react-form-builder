import React, { memo } from 'react';
import { useFormContext } from '../context/FormContext';

export const FormPreview: React.FC = memo(() => {
  const { state } = useFormContext();
  return (
    <div aria-label="Form Preview" role="region">
      <h2>{state.config.formTitle}</h2>
      <p>{state.config.formDescription}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        {state.fields.map((f) => (
          <div key={f.id}>
            <label>
              {f.label}
              {f.type === 'checkbox' ? (
                <input type="checkbox" defaultChecked={!!f.value} disabled />
              ) : f.type === 'number' ? (
                <input type="number" defaultValue={f.value} disabled />
              ) : (
                <input type="text" defaultValue={f.value} disabled />
              )}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
});