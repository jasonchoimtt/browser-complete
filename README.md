Browser Complete
================

[Work in Progress]

A browser web-extension that allows you to auto-complete in your text editor
the code that you are reading on your browser.

How it works
------------

```
                       Query                          Query
+-------------------+  <----  +--------------------+  <----  +-------------+
| Browser extension |         | Browser native app |         | Text editor |
+-------------------+  ---->  +--------------------+  ---->  +-------------+
                    Completions                    Completions
```

The contents of the auto-completion come from your active tab in your browser.
The extension will scan for all texts inside `<code>` and `<pre>` tags.

Status
------

Under development!

Setup
-----

1.  Install the browser extension.

    -   Firefox

2.  Install a text editor plugin:

    -   [vim](https://github.com/jasonchoimtt/vim-browser-complete)

3.  Follow the instructions of the text editor plugin to setup the browser
    native app.

License
-------

MIT License.
