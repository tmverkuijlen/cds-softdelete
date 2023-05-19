using {User} from '@sap/cds/common';

aspect softDelete {
  deletedAt : Timestamp @cds.on.update: $now;
  deletedBy : User      @cds.on.update: $user;
}
