# `enhance-shared-components-plugin`

### setup 

```
npm install @hicksy/shared-enhance-components-plugin
```

Add to .arc file

```
@plugins
hicksy/shared-enhance-components-plugin

@shared-enhance-components-plugin
hicksy/enhance-csrf 'elements'
enhance/form-elements
```

### @shared-enhance-components-plugin pragma

You can either list the npm installed enhance component libraries by their name (excluding @ if it's a scoped package). 
This way supports component libraries that are all exported from an index.js / index.mjs file 

e.g. add the following elements to your project 
`npm install git+https://github.com/enhance-dev/form-elements.git`


Or you can supply a second argument for the directory name in which the individual components exists
This way supports modules that may include components in a secondary folder, as defaul exports within single files


### auto-updates the elements.mjs file

```
import CsrfForm from 'enhance-csrf/elements/CsrfForm.mjs' //automatically inserted by shared-enhance-components-plugin
import CsrfInput from 'enhance-csrf/elements/CsrfInput.mjs' //automatically inserted by shared-enhance-components-plugin
import { CheckBox } from '@enhance/form-elements/index.js' //automatically inserted by shared-enhance-components-plugin
import { FieldSet } from '@enhance/form-elements/index.js' //automatically inserted by shared-enhance-components-plugin
import { FormElement } from '@enhance/form-elements/index.js' //automatically inserted by shared-enhance-components-plugin
import { LinkElement } from '@enhance/form-elements/index.js' //automatically inserted by shared-enhance-components-plugin
import { PageContainer } from '@enhance/form-elements/index.js' //automatically inserted by shared-enhance-components-plugin
import { SubmitButton } from '@enhance/form-elements/index.js' //automatically inserted by shared-enhance-components-plugin
import { TextInput } from '@enhance/form-elements/index.js' //automatically inserted by shared-enhance-components-plugin

let elements = {

  'csrf-form': CsrfForm, //automatically inserted by shared-enhance-components-plugin
  'csrf-input': CsrfInput, //automatically inserted by shared-enhance-components-plugin
  'check-box': CheckBox, //automatically inserted by shared-enhance-components-plugin
  'field-set': FieldSet, //automatically inserted by shared-enhance-components-plugin
  'form-element': FormElement, //automatically inserted by shared-enhance-components-plugin
  'link-element': LinkElement, //automatically inserted by shared-enhance-components-plugin
  'page-container': PageContainer, //automatically inserted by shared-enhance-components-plugin
  'submit-button': SubmitButton, //automatically inserted by shared-enhance-components-plugin
  'text-input': TextInput //automatically inserted by shared-enhance-components-plugin
}

export default elements
```