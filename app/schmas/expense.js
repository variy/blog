var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ScheMa = new Schema({
	date: Date,
	title: String,
	amount: Number,
	category: String,
	type: String,
	from: {
		type: ObjectId,
		ref: 'User'
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}

});

ScheMa.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now()
	}

	next();
});

ScheMa.statics = {
	fetch: function(cb){
		return this.find({})
			.sort('meta.updateAt')
			.then(cb);
	},
	findByUser: function(id, cb){
		return this.find({from: id})
			.then(cb);
	}
}

module.exports = ScheMa;