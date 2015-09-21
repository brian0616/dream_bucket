var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BucketSchema = new Schema({
    title: String,
    desc: String,
    image: String,
    done: {type: Boolean, default: false}, 
    _user: {type:  String, ref: 'User' },
    _tagged: {type: String, ref: 'User'}
});


mongoose.model('Bucket', BucketSchema);