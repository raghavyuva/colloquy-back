const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const InvoiceSchema = mongoose.Schema({
    paymentIntent: [],
    issuedto:{
        type: ObjectId,
        ref: 'Userauth' 
    }
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Invoices', InvoiceSchema);