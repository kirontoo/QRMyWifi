declare module 'dom-to-image-more' {
 import domToImage = require('dom-to-image');
 export = domToImage;
}

declare module "*.png" {
   const value: any;
   export = value;
}
