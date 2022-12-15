let { join } = require('path')
let { existsSync, readdirSync, readFileSync, writeFileSync } = require('fs')
let { pathToFileURL } = require ('url')
const { cwd } = require('process')
let beautify = require('js-beautify')

module.exports = {
  hydrate: {
    async copy (params) {
      
      const els = [];

      for (let shared_component of params.arc['shared-enhance-components-plugin']) {
      
        if(Array.isArray(shared_component)) {

          let pathToSharedElements = join(cwd(), 'node_modules', shared_component[0])
          
          let npm_package = shared_component[0]
          
          if(!existsSync(pathToSharedElements)) {
            pathToSharedElements = join(cwd(), 'node_modules', `@${shared_component[0]}`)
            npm_package = `@${shared_component[0]}`;
          }

          if (existsSync(pathToSharedElements)) {
            let elementsURL = pathToFileURL(join(pathToSharedElements, shared_component[1]));
            
            readdirSync(join(pathToSharedElements, shared_component[1])).forEach(async file => {
              const mod = await import(`${npm_package}/${shared_component[1]}/${file}`);
              let path = `${npm_package}/${shared_component[1]}/${file}`
              els.push({
                mod: mod.default.name,
                tag: mod.default.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
                import: `import ${mod} from '${path}'`
              })
            });
            
          } else {
           
            console.warn(
              `  shared-enhance-components-plugin: Cant find package ${shared_component[0]} or @${shared_component[0]}. Skipping.`,
            )
          }
        } else {

          // single index.js lib of components

          let pathToSharedElements = join(cwd(), 'node_modules', shared_component[0])
          
          if(!existsSync(pathToSharedElements)) {
            shared_component = `@${shared_component}`
          }

          try {
            const mod = await import(shared_component);
            const isDefaultExport = Object.prototype.hasOwnProperty.call(mod, 'default');

            for (const _mod of Object.keys(mod)) {
              els.push({
                mod: _mod,
                tag: _mod.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
                import: isDefaultExport ? 
                  `import ${_mod} from '${shared_component}'` :
                  `import { ${_mod} } from '${shared_component}/index.js'`
              })
            }
          } catch (e) {
            console.warn(
              `  shared-enhance-components-plugin: Cant find package ${shared_component[0]} or @${shared_component[0]}. Skipping.`,
            )
          }
        
        }

      }

      let pathToApp = join(cwd(), 'app')
      let existing_imports = []
      let existing_props = {default: {}}

      if(existsSync(join(pathToApp, 'elements.mjs'))) {
        let elementsFile = readFileSync(join(pathToApp, 'elements.mjs')).toString().split("\n")
        existing_imports = elementsFile.filter(line => line.startsWith('import') && !line.endsWith('//automatically inserted by shared-enhance-components-plugin'));
        existing_props = await import(join(pathToApp, 'elements.mjs'));
      } 
      
      const imports = els.map(el => el.import);

      let template = `
        ${existing_imports.map(imp => `${imp} \n`).join('')}
        ${imports.map(imp => `${imp} //automatically inserted by shared-enhance-components-plugin`).join('\n')}

        let elements = {
          ${Object.entries(existing_props.default).filter(el => els.filter(e => e.tag === el[0]).length === 0).map((el,idx) => `'${el[0]}': ${el[1].name}${idx < els.length - 1 ? ',' : ''}`)}
          ${els.map((el,idx) => `'${el.tag}': ${el.mod}${idx < els.length - 1 ? ',' : ''} //automatically inserted by shared-enhance-components-plugin`).join('\n')}
        }
  
        export default elements
      `
      writeFileSync(join(pathToApp, 'elements.mjs'), beautify(template, {indent_size: 2, brace_style: 'preserve-inline'}));
      
      console.log(
        `  shared-enhance-components-plugin: ${els.length} shared elements automatically configured in /app/elements.mjs`,
      )

    }
  }
}
