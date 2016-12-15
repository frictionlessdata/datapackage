##### **`{{ property }}`**: {{ definitions[property].description }}

{% if definitions[property].examples %}
{% for example in definitions[property].examples %}
```
{{ example }}
```
{% endfor %}
{% endif %}
{% if  definitions[property].context %}
{{ definitions[property].context }}

{% endif %}
