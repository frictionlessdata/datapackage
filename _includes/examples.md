## Examples

{% for example in page.examples %}
### Example {{ forloop.index }}
{% include {{ example }} %}
{% endfor %}
