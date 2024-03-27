---
title: Language Support
---

Language support is a different concern to translation support. Language support deals with declaring the default language of a descriptor and the data it contains in the resources array. Language support makes no claim about the presence of translations when one or more languages are supported in a descriptor or in data. Via the introduction of a `languages` array to any descriptor, we can declare the default language, and any other languages that `SHOULD` be found in the descriptor and the data.

## Implementations

There are no known implementations of this pattern at present.

## Specification

Any Frictionless Data descriptor can declare the language configuration of its metadata and data with the `languages` array.

`languages` `MUST` be an array, and the first item in the array is the default (non-translated) language.

If no `languages` array is present, the default language is English (`en`), and therefore is equivalent to:

```
{
  "name": "my-package",
  "languages": ["en"]
}
```

The presence of a languages array does not ensure that the metadata or the data has translations for all supported languages.

The descriptor and data sources `MUST` be in the default language. The descriptor and data sources `MAY` have translations for the other languages in the array, using the same language code. `IF` a translation is not present, implementing code `MUST` fallback to the default language string.

Example usage of `languages`, implemented in the metadata of a descriptor:

```
{
  "name": "sun-package",
  "languages": ["es", "en"],
  "title": "Sol"
}

# which is equivalent to
{
  "name": "sun-package",
  "languages": ["es", "en"],
  "title": {
    "": "Sol",
    "en": "Sun"
  }
}
```

Example usage of `languages` implemented in the data described by a resource:

```
# resource descriptor
{
  "name": "solar-system",
  "data": [ "solar-system.csv" ]
  "fields": [
    ...
  ],
  "languages": ["es", "en", "he", "fr", "ar"]
}

# data source
# some languages have translations, some do not
# assumes a certain translation pattern, see the related section
id,name,name@fr,name@he,name@en
1,Sol,Soleil,שמש,Sun
2,Luna,Lune,ירח,Moon
```
