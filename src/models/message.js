const mongoose = require('mongoose');
const schema = mongoose.Schema;

const message = new schema({
    id : {type:Number, required:true},
    body : {type:String, required:true},
    sender : {type: String, required:true},
    summary : {type: String, required:false},
    recipient : {type: String, required:true},
    sent : {type:Boolean, default:false},
    time : {type: String, required:true}
    },
    {
    toJSON : {transform: function(doc, ret){
        delete ret._id;
        delete ret._v;
        return ret;
    }
    }
}
);

module.exports = mongoose.model('message', message);
