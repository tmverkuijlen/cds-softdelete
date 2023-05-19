const cds = require('@sap/cds');

const propertyIsFiltered = (req, property) => {
    const where = req.query?.SELECT?.where ?? [];

    for (let filter of where) {
        if (filter.ref?.includes(property)) {
            return true;
        }
    }

    return false;
}

cds.once('served', () => {
    for (let srv of cds.services) {
        const softDeleteEntities = [];

        for (let entity of srv.entities) {
            if (entity.includes.includes('softDelete')) {
                softDeleteEntities.push(entity);
            }
        }

        srv.before('READ', softDeleteEntities, async (req) => {
            // if there is an filter applied with deleted at, do not apply default filter
            if (!propertyIsFiltered(req, 'deletedAt')) {
                req.query.where({ deletedAt: null });
            }
        });

        srv.on('DELETE', softDeleteEntities, async (req) => {
            await UPDATE.entity(req.target).data({ deletedBy: req.user.id }).where(req.data);
        });

        // Shift on handler to first position, because otherwise it won't  be called
        srv._handlers.on.unshift(srv._handlers.on.pop());
    }
});