# Minium @ RequireLX (Meetup 3)

## Resources

* [Slides](https://docs.google.com/presentation/d/17-zLbFSy10tYcb805PuQTF0UHxBmowyXfWyxk9n3cos)
* [Github repository](github.com/viltgroup/minium)
* [Some Quick start videos videos](https://www.youtube.com/user/miniumcan)

The bender painter example requires the HEAD version of minium (which now has support for CommonJS in Rhino). If you want to run it, you'll have to [build minium manually](https://github.com/viltgroup/minium/blob/master/README.md#build-minium), and inside `minium-app/target/minium-app`, edit `app.properties`:

<pre>
rhino.require.module.path = file:///<path for minium-require-lx-meetup3 scripts>/modules
</pre>

Also, check for full paths in those scripts :)

Any problem at all, please [report it](https://github.com/viltgroup/minium/issues/new), I'll be glad to help you!

