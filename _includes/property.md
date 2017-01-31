{{ pdepth }} `{{ pkey }}`

{{ pvalue.description }}

{% if pvalue.context %}
{{ pvalue.context }}
{% endif %}

{% if pvalue.examples %}
#### Examples
{% for example in pvalue.examples %}
```
{{ example }}
```
{% endfor %}
{% endif %}

{% if pvalue.notes %}
#### Implementation notes
<ul>
  {% for note in pvalue.notes %}
  <li>{{ note }}</li>
  {% endfor %}
</ul>
{% endif %}



