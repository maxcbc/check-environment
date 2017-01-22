# Environment Checker

## Description

This is a node.js module that will check currently set environment variables against a pre-defined specification.

## Getting started

install using npm:
 - `npm i -S env-checker`

Add your `env.yaml` at the same level as your `package.json` and call this module at the top of the entrypoint to your app (i.e. `app.js` or `index.js`), like below;

```
const envCheck = require('check-environment')();
```

An example of a configuration file can be seen below;

```
---
NODE_ENV:
  required: true
  type: string
  format: "^(development|test|production)$"
  log: true
```

## Documentation

### Environment variable specification

Under the key of the name of the environment variable, an object with the following parameters:

| Param                  | Type          | Default | Description                                                                                   |
| ---------------------- | ------------- | ------- | --------------------------------------------------------------------------------------------- |
| **required**           | `boolean`     | false   | whether or not to auto-load the spec                                                          |
| **type**               | `string`      | "any"   | either 'boolean', 'string', 'number or 'any'                                                  |
| **format**             | `string`      | none    | a RegExp pattern string to use to validate the environment variable                           |
|                        | _or_ `object` | none    | specifying a RegExp pattern and modifiers in an object                                        |
| **format.pattern**     | `string`      | none    | a RegExp pattern string to use to validate the environment variable                           |
| **format.flags**       | `string`      | none    | a string containing a combination of: m, i, and/or g to use as part of the validation pattern |

### Module: (options (optional)) ⇒ `Checker`
Creates and returns an instance of a Checker passing in the user supplied configuration options
**Name**: none (module's sole export)
**Kind**: function (synchronous)

#### Parameters

| Param                    | Type      | Default | Description                                     |
| ------------------------ | --------- | ------- | ----------------------------------------------- |
| **options**              | `object`  |   n/a   | configuration object                            |
| **options.autoLoad**     | `boolean` |         | whether or not to auto-load the spec            |
| **options.specLocation** | `string`  |         | the location of the environment specification   |


**Returns**: an instance of Checker

### Checker

#### Property: specLocation
**Type**: `String`
**Description**: the location of the environment specification (Can be YAML or JSON)

#### Method: loadSpec() 
**Description**: Loads the specification and checks it's validity
**NOTES**: 
 - automatically run on instantiation if autoLoad is not set to true

#### Method: check() => `Object`
**Description**: Checks environment variables against
**Returns**: An object with keys equal to the names of set and valid environment variables, and their values converted to their specified type
**NOTE**:
 - Requires `loadSpec()` to have been run first
 - automatically run on instantiation if autoLoad is not set to true



