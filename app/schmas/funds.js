var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ScheMa = new Schema({
	// target: {
	// 	type: ObjectId,
	// 	ref: 'invest'
	// },
	target: String,
	principal: Number,
	yieldRate: Number,
	done: {
		type: Boolean,
		default: false
	},
	createdDate: Date,
	finishDate: Date,
	describe: String,
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
				from: opt.id,
				done: false
			}).sort({'finishDate': -1})
			.then(cb);
	}
}

module.exports = ScheMa;