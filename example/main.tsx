import React from 'react'
import ReactDOM from 'react-dom/client'
import { FormBuilder, ConfigRegistry, FieldRegistry, DescriptionConfigOption, TitleConfigOption, TextField, CheckboxField } from '../src'  // Import library files directly (local relative path)
const App = () => {
  // Setup a basic form builder usage
  const configRegistry = new ConfigRegistry();
  configRegistry.registerConfig('formTitle', new TitleConfigOption());
  configRegistry.registerConfig('formDescription', new DescriptionConfigOption());
  const fieldRegistry = new FieldRegistry();
  fieldRegistry.registerField('text', TextField);
  fieldRegistry.registerField('checkbox', CheckboxField);

  const formActions = [
    {
      label: 'Save Form',
      onClick: (state) => {
        console.log(state);
      },
    },
  ];

  return <FormBuilder formActions={formActions} fieldRegistry={fieldRegistry} configRegistry={configRegistry} initialState={{ fields: [], config: {} }} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)