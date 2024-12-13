import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { BaseField } from '../fields/BaseField';

interface FormState {
  fields: BaseField[];
  config: Record<string, any>;
}

type FormAction =
  | { type: 'ADD_FIELD'; field: BaseField; }
  | { type: 'UPDATE_FIELD'; id: string; value: any }
  | { type: 'UPDATE_FIELD_PROPERTY'; id: string; property: keyof BaseField; value: any }
  | { type: 'REMOVE_FIELD'; id: string }
  | { type: 'UPDATE_CONFIG'; key: string; value: any }
  | { type: 'LOAD_STATE'; payload: { config: Record<string, any>; fields: BaseField[] } };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'ADD_FIELD':
      return { ...state, fields: [...state.fields, action.field] };
    case 'UPDATE_FIELD':
      return {
        ...state,
        fields: state.fields.map(f => f.id === action.id ? { ...f, ...action.value } as BaseField : f)
      };
    case 'UPDATE_FIELD_PROPERTY': {
        return {
            ...state,
            fields: state.fields.map(f =>
            f.id === action.id ? { ...f, [action.property]: action.value } as BaseField : f
            )
        };
    }
    case 'REMOVE_FIELD':
      return {
        ...state,
        fields: state.fields.filter(f => f.id !== action.id)
      };
    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: { ...state.config, [action.key]: action.value }
      };
    case 'LOAD_STATE':
        return { config: { ...action.payload.config }, fields: action.payload.fields };
    default:
      return state;
  }
}

interface FormContextValue {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}

const FormContext = createContext<FormContextValue | null>(null);

interface FormProviderProps {
  initialState: FormState;
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export function useFormContext(): FormContextValue {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}