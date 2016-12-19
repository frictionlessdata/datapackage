## Profiles

Some extensions of {{ page.title }} may be formalised as a **profile**. A profile is a {{ page.title }} which extends the default specification towards more particular needs.

A profile is declared on the `profile` property. For the default {{ page.title }} descriptor, this `SHOULD` be present with a value of `default`, but if not, the absence of a `profile` is equivalent to setting `"profile": "default"`.

Custom profiles `MUST` have a `profile` property, where the value is a unique identifier for that profile. This unique identifier can be in one of two forms. It can be an `id` from the official [Data Package Schema Registry](http://schemas.frictionlessdata.io/registry.csv), or, a URI that points directly to a JSON Schema that validates the profile.

As part of the Frictionless Data project, we publish a number of {{ page.title }} profiles. See those profiles below.

{% for spec in site.specifications %}
{% for page in page.profiles %}
{% if spec.slug == page %}
<li><a href="/{{ spec.slug }}/">{{ spec.name }}</a></li>
{% endif %}
{% endfor %}
{% endfor %}
