var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ScheMa = new Schema({
	date: Date,
	list: Array,
	notes: String,
	marks: Number,
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
	findByUser: function(opt, cb) {
		return this.find({
				from: opt.id,
				date: opt.date
			}).sort({'date': -1})
			.then(cb);
	}
}

module.exports = ScheMa;