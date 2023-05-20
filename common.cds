using {User} from '@sap/cds/common';

aspect softDelete {
  deletedAt : Timestamp;
  deletedBy : User;
}
