## Adding toc to all files in a directory and sub directories

Go into the directory that contains you local git project and type:

```js
doctoc .
```

## Update existing doctoc TOCs effortlessly

If you already have a TOC inserted by doctoc, it will automatically be updated by running the command (rather than inserting a duplicate toc). Doctoc locates the TOC by the <!-- START doctoc --> and <!-- END doctoc --> comments, so you can also move a generated TOC to any other portion of your document and it will be updated there.

## Adding toc to individual files

If you want to convert only specific files, do:

`doctoc /path/to/file [...]`

Examples

```js
doctoc README.md

doctoc CONTRIBUTING.md LICENSE.md
```
