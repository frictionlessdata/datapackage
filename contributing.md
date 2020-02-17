## Frontmatter

Frontmatter is the metadata in pages. It is an essential "API" between content authors and the theme designers. Here you can find the frontmatter definations for main category of pages.

### Common for all pages

This frontmatter is common to all pages and maybe used in any of them. Every page MUST have a title. All other values are optional. 

```md
---
title: Data Package
tagline: # one sentence description
description: # an exerpt or description
image: /data-package-diagram.png
layout: product | job [| blog]
---
```

### Page titles

Our convention is that page titles are set in frontmatter not in markdown. This allows them to be styled different etc.

:white_check_mark: 

```md
---
title: My Page
---

This page is about X ...
```

:x: 

```md
# My Page

This page is about X
```

### Blog posts

```
---
category: case-studies | grantee-profiles | pilots | grantee-profiles-2019
date: # date of publication in yyyy-mm-dd format
author:
tags: 
---
```

When category == "case-studies" | "pilots"

```
interviewee: 
subject_context: 
```

When category == "grantee-profiles"

```
github: 
twitter:
website: 
```



### Jobs pages

```md
tagline:
pain:
context: (?)
hexagon:
```

### Product pages

```md
hexagon:
github: # list of github repos ...
```