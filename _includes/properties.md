{% assign definitions = site.data.specs.properties.define %}
{% assign spec = site.data.specs[slug] %}

## Properties

This section presents a complete description of required, recommended, and optional properties for a {{ page.title }} descriptor.

{% if page.properties.required %}
### Required properties

**A {{ page.title }} descriptor `MUST` include the following properties.**

{% for prop in page.properties.required %}
- `{{ prop }}`: {{ definitions[prop].description }}
  {% if  definitions[prop].example %}
  ```
  # Example
  {{ definitions[prop].example }}
  ```
  {% endif %}
  {% if  definitions[prop].context %}
  {{ definitions[prop].context }}
  {% endif %}
{% endfor %}

{% endif %}

{% if page.properties.recommended %}
### Recommended properties

**A {{ page.title }} descriptor `SHOULD` include the following properties.**

{% for prop in page.properties.recommended %}
- `{{ prop }}`: {{ definitions[prop].description }}
  {% if  definitions[prop].example %}
  ```
  # Example
  {{ definitions[prop].example }}
  ```
  {% endif %}
  {% if  definitions[prop].context %}
  {{ definitions[prop].context }}
  {% endif %}
{% endfor %}

{% endif %}

{% if page.properties.optional %}
### Optional properties

**A {{ page.title }} descriptor `MAY` include the following properties.**

{% for prop in page.properties.optional %}
- `{{ prop }}`: {{ definitions[prop].description }}
  {% if  definitions[prop].example %}
  ```
  # Example
  {{ definitions[prop].example }}
  ```
  {% endif %}
  {% if  definitions[prop].context %}
  {{ definitions[prop].context }}
  {% endif %}
{% endfor %}

{% endif %}
