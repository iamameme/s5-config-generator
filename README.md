S5-Config-Generator
=====================

You can generate configs via this app. 

## Installation

```
$ npm install 
$ npm start
```

## Settings

-/src/schema contains the schema models for all the views. To add to it, just add a file, import it in index.js, and add it to the schemaList array
-/src/views contains all the viewdefns which the application reads in 
-/react-jsonschema-form/ is the modified version of react-jsonschema-form for this app 