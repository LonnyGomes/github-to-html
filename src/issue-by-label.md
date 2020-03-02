---
layout: issue.njk
pagination:
    data: collections.issuesByLabel
    size: 1
    alias: issue
permalink: 'label/{{ issue.label | slug}}/{{ issue.number }}/index.html'
---

{{ issue.body | safe }}
