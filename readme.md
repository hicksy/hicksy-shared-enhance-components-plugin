# `enhance-shared-components-plugin`

### setup 

```
npm install hicksy/shared-enhance-components-plugin
```

Add to .arc file

```
@plugins
hicksy/shared-enhance-components-plugin

@shared-enhance-components-plugin
enhance-csrf 'elements'
enhance/form-elements
```


### @shared-enhance-components-plugin pragma

You can either list the npm installed enhance component libraries by their name (excluding @ if it's a scoped package). 
This way supports component libraries that are all exported from an index.js / index.mjs file 


Or you can supply a second argument for the directory name in which the individual components exists
This way supports modules that may include components in a secondary folder, as defaul exports within single files

