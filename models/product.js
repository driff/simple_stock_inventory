var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var productsSchema = new mongoose.Schema({
    name: String,
    details: String,
    quantity: SchemaTypes.Double,
    raw_material: Boolean,
    created_at: {type: Date, default: Date.now},
    last_updated: {type: Date, default: Date.now},

})

mongoose.model('Product', productsSchema);