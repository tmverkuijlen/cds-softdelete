To start using this package install it:

```
npm i ... (package isn't on npm yet)
```

Wire the plugin to the base app in your package.json:
```
{
  ...,
  "workspaces": [
    "cds-softdelete"
  ],
  ...
}
```

Add the aspect "softDelete" to an entity:
```
using { Currency, managed, sap } from '@sap/cds/common';
using { softDelete } from 'cds-softdelete/common';

entity Books : managed, softDelete { 
  key ID : Integer;
  title  : localized String(111);
  descr  : localized String(1111);
  author : Association to Authors;
  genre  : Association to Genres;
  stock  : Integer;
  price  : Decimal(9,2);
  currency : Currency;
}
```

The softDelete aspect follows the structure of the common managed aspect from @sap/cds:
* deletedAt
* deletedBy
