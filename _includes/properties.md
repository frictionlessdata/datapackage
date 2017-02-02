{% assign spec = site.data.schemas[page.slug] %}

## Properties

This section presents a complete description of *required* and *optional* properties for a {{ page.title }} descriptor.

### Required properties

**A {{ page.title }} descriptor `MUST` include the following properties.**

{% for required in spec.required %}

{% assign pkey = required %}
{% assign pvalue = spec.properties[required] %}
{% assign pdepth = '####' %}
{% include property.md %}

{% if pvalue.items %}

Each item in the {{ pvalue.title }} {{ pvalue.type }} is a **{{ pvalue.items.title }}**, which is an {{ pvalue.items.type }} with the following *required* properties:

{% for req in pvalue.items.required %}
- `{{ req }}`
{% endfor %}

A minimal example of {{ pvalue.items.title }} looks like:
```
{{ pvalue.items.examples[0] }}
```

All specified {{ pvalue.title }} properties are as follows:

{% for i in pvalue.items.properties %}
{% assign pkey = i[0] %}
{% assign pvalue = i[1] %}
{% assign pdepth = '#####' %}
{% include property.md %}

{% if pvalue.oneOf %}
{% for i in pvalue.oneOf %}
{% assign pkey = i.enum %}
{% assign pvalue = i %}
{% assign pdepth = '######' %}
{% include property.md %}
{% endfor %}
{% endif %}

{% endfor %}

{% elsif pvalue.oneOf %}

{% for i in pvalue.oneOf %}
{% assign pkey = i.enum %}
{% assign pvalue = i %}
{% assign pdepth = '#####' %}
{% include property.md %}
{% endfor %}

{% endif %}

{% endfor %}

{% if spec.properties.size > spec.required.size %}
### Optional properties

**A {{ page.title }} descriptor `SHOULD` include the following properties.**

{% for p in spec.properties %}

{% assign candidate = true %}
{% for req in spec.required %}
{% if p[0] == req %}
{% assign candidate = false %}
{% break %}
{% endif %}
{% endfor %}

{% if candidate %}
{% assign pkey = p[0]  %}
{% assign pvalue = p[1] %}
{% assign pdepth = '####' %}
{% include property.md %}

{% if pvalue.items %}

*Each item in the {{ pvalue.title }} {{ pvalue.type }} is a **{{ pvalue.items.title }}**, which is an {{ pvalue.items.type }} with the following specifications.*

{% for i in pvalue.items.properties %}
{% assign pkey = i[0] %}
{% assign pvalue = i[1] %}
{% assign pdepth = '#####' %}
{% include property.md %}
{% endfor %}

{% elsif p.oneOf %}

{% for i in pvalue.oneOf %}
{% assign pkey = i.enum %}
{% assign pvalue = i %}
{% assign pdepth = '#####' %}
{% include property.md %}
{% endfor %}

{% endif %}

{% endif %}

{% endfor %}

{% endif %}
