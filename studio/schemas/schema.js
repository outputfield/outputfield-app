// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import page from './documents/page';
import siteConfig from './documents/siteConfig';
import route from './documents/route';
import signupform from './documents/signupform.js'

// Object types
import emailsignup from './objects/emailsignup.js'
import artist from './objects/artist.js'
import textsection from './objects/textsection';
import portableText from './objects/portableText';
import field from './objects/field';
import checkbox from './objects/checkbox';
import imageWithTitle from './objects/imageWithTitle';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    page,
    siteConfig,
    route,
    signupform,
    emailsignup,
    artist,
    textsection,
    portableText,
    field,
    checkbox,
    imageWithTitle,
  ])
})
