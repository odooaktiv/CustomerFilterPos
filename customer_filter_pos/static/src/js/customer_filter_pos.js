odoo.define('customer_filter_pos.customer_filter_pos', function (require) {

    var models = require('point_of_sale.models');
    var rpc = require('web.rpc');
    models.load_fields('res.partner','parent_id');

    var _super_posmodel = models.PosModel.prototype;

    models.PosModel = models.PosModel.extend({
        initialize: function (session, attributes) {
            var partner_model = _.find(this.models, function(model){
                return model.model === 'res.partner';
            });
            partner_model.domain.push(['parent_id','=',false]);
            return _super_posmodel.initialize.call(this, session, attributes);
        },
    });

    models.PosModel = models.PosModel.extend({

    load_new_partners: function(load_new_partners){
        var self = this;
        var def  = new $.Deferred();
        var fields = _.find(this.models,function(model){ return model.model === 'res.partner'; }).fields;
        var domain = [['customer','=',true],['write_date','>',this.db.get_partner_write_date()],['parent_id','=',false]];
        rpc.query({
                model: 'res.partner',
                method: 'search_read',
                args: [domain, fields],
            }, {
                timeout: 3000,
                shadow: true,
            })
            .then(function(partners){
                if (self.db.add_partners(partners)) {   // check if the partners we got were real updates
                    def.resolve();
                } else {
                    def.reject();
                }
            }, function(type,err){ def.reject(); });
        return def;  
    }
});
});
