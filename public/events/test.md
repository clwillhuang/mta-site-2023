# Sample Markdown

### Steps

1. fork repository
2. in the settings, activate Github Pages using `/docs` as the source
3. start writing markdown content in the `pages` folder
    - use `?` suffix for local links to other pages eg `?page2`
    - use `docs/assets` to store assets
4. Serve `index.html` locally to display markdown dynamically while writing 

### Ready to build?

4. run `node utils/build.js` to generate html into `/docs` folder

### Custom domain?

5. under Github Pages settings, add custom url and enforce HTTPS


### Custom code!
```
.form input,
  .form textarea {
    border: solid var(--accent) 1px;
    border-radius: 5px;
    background-color: transparent;
    color: var(--accent);
  }
```

## Structure
 
- index.html
- assets
    - css
        - main.css
    - images
        - favicon.png
- pages
    - index.md
    - test.md
- utils
    - lib
        - checkbox.js
        - Marked.js
        - Highlight.js
    - build.js
    - dev.js
     
Layout:
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |