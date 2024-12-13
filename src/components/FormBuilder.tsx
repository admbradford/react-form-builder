import React, { useEffect, useState, Suspense, useCallback } from 'react';
import { useFormContext, FormProvider } from '../context/FormContext'; // Single combined context
import {FormConfiguration} from './FormConfiguration';
import {FormFields} from './FormFields';
import {FormPreview} from './FormPreview';
import {AvailableFields} from './AvailableFields';
import { FieldRegistry } from '../fields/FieldRegistry';
import { ConfigRegistry } from '../config/ConfigRegistry';
import { BaseField } from '../fields/BaseField';

import '../styles/form-builder.css';

interface FormAction {
  label: string;
  onClick: (state: FormBuilderState) => void;
}

interface FormBuilderState {
  fields: BaseField[];
  config: Record<string, string>;
}

interface FormBuilderProps {
  fieldRegistry: FieldRegistry;
  configRegistry: ConfigRegistry;
  initialState?: FormBuilderState;
  formActions?: FormAction[];
}

const FormBuilderInner: React.FC<FormBuilderProps> = ({
  fieldRegistry,
  configRegistry,
  initialState = { fields: [], config: {} },
  formActions = [],
}) => {
  const { state, dispatch } = useFormContext();
  const { fields, config } = state;
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    // Load initial state (both fields and config) into the single form context
    dispatch({ type: 'LOAD_STATE', payload: { fields: initialState.fields, config: initialState.config } });
  }, [initialState, dispatch]);

  const getState = useCallback((): FormBuilderState => ({ fields, config }), [fields, config]);

  return (
    <div className="form-builder">
      <h2>Form Builder</h2>
      <div className="row">
      <div className="form-builder-config column">
        <div>
            {formActions.map((action, index) => (
            <button key={index} onClick={() => action.onClick(getState())}>
                {action.label}
            </button>
            ))}

            <button onClick={() => setPreviewVisible(!previewVisible)}>
            {previewVisible ? 'Hide' : 'Show'} Preview
            </button>
        </div>
        <FormConfiguration configRegistry={configRegistry} />
        <AvailableFields fieldRegistry={fieldRegistry} />
        <div className="form-builder-fields">
            <FormFields />
        </div>
      </div>
      <div className="form-builder-content column">
      {previewVisible && 
      <Suspense fallback={<div>Loading preview...</div>}>
        <div className="form-builder-preview row">
            <FormPreview />
        </div>
      </Suspense>
      }
      </div>
      </div>
    </div>
  );
};

export const FormBuilder: React.FC<FormBuilderProps> = (props) => {
  return (
    <FormProvider initialState={props.initialState || { fields: [], config: {} }}>
      <FormBuilderInner {...props} />
    </FormProvider>
  );
};