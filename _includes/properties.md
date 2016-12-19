{% assign definitions = site.data.schemas.dictionary.definitions %}
{% assign spec = site.data.schemas[slug] %}

## Properties

This section presents a complete description of required, recommended, and optional properties for a {{ page.title }} descriptor.

{% if page.properties.required %}
### Required properties

**A {{ page.title }} descriptor `MUST` include the following properties.**

{% for property in page.properties.required %}
{% include property.md variable-property=property %}
{% endfor %}

{% endif %}

{% if page.properties.recommended %}
### Recommended properties

**A {{ page.title }} descriptor `SHOULD` include the following properties.**

{% for property in page.properties.recommended %}
{% include property.md variable-property=property %}
{% endfor %}

{% endif %}

{% if page.properties.optional %}
### Optional properties

**A {{ page.title }} descriptor `MAY` include the following properties.**

{% for property in page.properties.optional %}
{% include property.md variable-property=property %}
{% endfor %}

{% endif %}
