---
layout: base.njk
title: Issues
pagination:
    data: issues
    size: 1
    alias: issue
permalink: 'issue/{{ issue.number }}/index.html'
---

<div class="issues-pagination">
{% if pagination.previousPageHref %}
<a class="nav-item prev-nav-arrow" href="{{ pagination.previousPageHref | url }}"> <span class="nav-arrow"><</span> Prev</a>
{% endif %}

{% if pagination.nextPageHref %}
<a class="nav-item next-nav-arrow" href="{{ pagination.nextPageHref | url }}" > Next <span class="nav-arrow">></span></a>
{% endif %}

</div>

# {{ issue.title }}

[GitHub URL]({{ issue.html_url }})

{{ issue.body | safe }}

{% for label in issue.labels %}

-   {{ label.name }}

{% endfor %}
