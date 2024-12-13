# React Form Builder

A dynamic and extensible form builder library for React. This library allows you to create customizable forms with drag-and-drop capabilities, configurable options, live preview functionality, and custom actions.

---

## Features

- **Drag-and-Drop Interface**: Easily add, remove, and reorder fields.
- **Field Validation**: Custom validation for each field type.
- **Nested Fields**: Group fields into sections or tabs.
- **Theming**: Customizable themes for colors, fonts, and spacings.
- **Customizable Rendering**: Override default field rendering.
- **Dynamic Actions**: Add buttons for custom actions like "Save" or "Submit."
- **Auto-Save and Versioning**: Automatically save form progress and track versions.
- **Accessibility**: Fully WCAG 2.1 AA compliant with keyboard navigation.

---

## Usage

```jsx
import React from 'react';
import { FormBuilder } from 'react-form-builder';
import { FieldRegistry } from 'react-form-builder/fields';
import { ConfigRegistry, TitleConfigOption } from 'react-form-builder/config';
import { TextField } from 'react-form-builder/fields';

const fieldRegistry = new FieldRegistry();
fieldRegistry.registerField('text', TextField);

const configRegistry = new ConfigRegistry();
configRegistry.registerConfig('formTitle', new TitleConfigOption());

const initialState = {
  fields: [
    new TextField('First Name'),
    new TextField('Last Name'),
  ],
  config: {
    formTitle: 'My Awesome Form',
  },
};

const App = () => {
  const handleSave = (state) => {
    console.log('Saved State:', state);
  };

  const handleSubmit = (state) => {
    console.log('Form Submitted:', state);
  };

  return (
    <FormBuilder
      fieldRegistry={fieldRegistry}
      configRegistry={configRegistry}
      initialState={initialState}
      formActions={[
        { label: 'Save', onClick: handleSave },
        { label: 'Submit', onClick: handleSubmit },
      ]}
    />
  );
};

export default App;
```

## API Documentation

### FormBuilder

Props:
- fieldRegistry: `FieldRegistry`
- configRegistry: `ConfigRegistry`
- initialState: `{ fields: BaseField[], config: Record<string, string> }`
- formActions: `{ label: string, onClick: (state: FormBuilderState) => void }[]`

### `ConfigRegistry`

Manages configuration options dynamically. Use `registerConfig` to add new options.

```typescript
const configRegistry = new ConfigRegistry();
configRegistry.registerConfig('formTitle', TitleConfigOption);
```

### `FieldRegistry`

Manages field types dynamically. Use `registerField` to add new field types.

```typescript
const fieldRegistry = new FieldRegistry();
fieldRegistry.registerField('text', TextField);
```

## Extending

### Custom Configuration Option

1. Extend the `BaseConfigOption` class.
2. Define the `key`, `label`, `defaultValue`, and `validate` method.
3. Register it in the `ConfigRegistry`.

```typescript
// your-project/CustomConfigOption.ts
export class CustomConfigOption extends BaseConfigOption {
  key = 'formDescription';
  label = 'Form Description';
  defaultValue = '';

  validate(value: any): string | null {
    return null;
  }
}

// your-project/FormComponent.tsx
import CustomConfigOption from './CustomConfigOption.ts'

const App = () => {
  // Setup a basic form builder usage
  const configRegistry = new ConfigRegistry();
  configRegistry.registerConfig('fooBarCustom', new CustomConfigOption());
 //......
}

```

### Custom Form Field
1. Extend the `BaseConfigOption` class.
2. Setup a constructor and add addtional properties if needed
3. Register it in the `FieldRegistry`.

```typescript
// your-project/SuperCustomField.ts
export class SuperCustomField extends BaseField {
  something?: string;

  constructor(label: string, placeholder?: string) {
    super('text', label, placeholder);
    this.value = '';
    this.something = '';
  }

  validate(): string | null {
    if (!this.value || this.value.trim() === '') {
      return `${this.label} is required`;
    }
    return null;
  }
}

// your-project/FormComponent.tsx
import SuperCustomField from './SuperCustomField.ts'

const App = () => {
  // Setup a basic form builder usage
    const fieldRegistry = new FieldRegistry();
    fieldRegistry.registerField('superCustomField', SuperCustomField);
 //......
}

```

## Local Development 
Clone the repo and run
```
npm i
```

Running Development 
```
npm run dev
```

Example output is inside `example/main.tsx` for deeper configuration