#!/usr/bin/env node
'use strict';

const fs = require('fs');

const [,, ...args] = process.argv;

args.forEach(path => {
  const contents = fs.readFileSync(path, 'utf8');
  console.log(`# ${path}`);
  JSON.parse(contents)[0].t
    .map(obj => ({ 'name': obj.h.path, 'data': obj.h.data }))
    .map(obj => ({...obj, data: Buffer.from(obj.data, 'base64').toString()}))
    .map(obj => ({...obj, name: obj.name.replace(/^.+\//, '')}))
    .map(({name, data}) => `export ${name}='${data}'`)
    .forEach(el => console.log(el));
  console.log(`\n\n`);
})

