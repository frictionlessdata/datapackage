### `{{ property }}`

{{ definitions[property].description }}

{% if  definitions[property].context %}
{{ definitions[property].context }}
{% endif %}

{% if definitions[property].examples %}
#### Examples
{% for example in definitions[property].examples %}
```
{{ example }}
```
{% endfor %}
{% endif %}

{% if  definitions[property].notes %}
#### Implementation notes
<ul>
  {% for note in definitions[property].notes %}
  <li>{{ note }}</li>
  {% endfor %}
</ul>
{% endif %}
