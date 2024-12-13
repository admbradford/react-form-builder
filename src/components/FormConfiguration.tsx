import React, { useMemo } from 'react';
import { useFormContext } from '../context/FormContext';
import { ConfigRegistry } from '../config/ConfigRegistry';

interface FormConfigurationProps {
  configRegistry: ConfigRegistry;
}

export const FormConfiguration: React.FC<FormConfigurationProps> = ({ configRegistry }) => {
  const { state, dispatch } = useFormContext();
  const { config } = state;

  // Retrieve all config options from the registry
  const configOptions = useMemo(() => {
    // Assuming configRegistry has a method getAllConfigs() returning an array of BaseConfigOption
    // If not, adjust this logic according to your actual registry API.
    return Object.values(configRegistry['configs'] || {});
  }, [configRegistry]);

  const handleChange = (key: string, value: string) => {
    dispatch({ type: 'UPDATE_CONFIG', key, value });
  };

  return (
    <section aria-labelledby="form-configuration-heading">
      <h2 id="form-configuration-heading">Form Configuration</h2>
      <p style={{ fontSize: '0.9em', color: '#666' }}>
        Adjust the form’s configuration settings below.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        {configOptions.map((option) => {
          const currentValue = config[option.key] ?? option.defaultValue;
          return (
            <div key={option.key} style={{ marginBottom: '1em' }}>
              <label htmlFor={`config-${option.key}`}>{option.label}</label>
              <input
                id={`config-${option.key}`}
                type="text"
                value={currentValue}
                onChange={(e) => handleChange(option.key, e.target.value)}
                style={{ marginLeft: '0.5em' }}
              />
            </div>
          );
        })}
      </form>
    </section>
  );
};