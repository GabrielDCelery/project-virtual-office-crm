const { Model } = require('objection');
const Password = require('objection-password')(12);

class Users extends Password(Model) {
    static get tableName() {
        return 'users';
    }

    static get STATUSES() {
        return {
            INACTIVE: 0,
            ACTIVE: 1,
            SUSPENDED: 2
        };
    }
    
    async $beforeInsert(context) {
        await super.$beforeInsert(context);

        const date = new Date().toISOString();

        this.created_at = date;
        this.updated_at = date;
    }

    async $beforeUpdate(context) {
        await super.$beforeInsert(context);

        this.updated_at = new Date().toISOString();
    }
}

module.exports = Users;