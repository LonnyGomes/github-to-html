---
layout: base.njk
title: Issues
pagination:
    data: issues
    size: 1
    alias: issue
permalink: 'issue/{{ issue.number }}/index.html'
---

# {{ issue.title }}

[GitHub URL]({{ issue.html_url }})

{{ issue.body | safe }}

{% for label in issue.labels %}

-   {{ label.name }}

{% endfor %}
