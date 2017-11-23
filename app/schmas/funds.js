var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var moment = require('moment');
var ScheMa = new Schema({
	// category: {
	// 	type: ObjectId,
	// 	ref: 'invest'
	// },
	category: String,
	createdDate: Date,
	finishedDate: Date,
	principal: Number,
	cycle: Number,
	yieldRate: Number,
	yield: Number,
	evalTotalAmont: Number,
	notes: String,
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
	findValid: function(opt, cb) {
		return this.find({
				from: opt.id
			}).sort({'finishDate': -1})
			.then(cb);
	}
}

module.exports = ScheMa;