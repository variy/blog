var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ScheMa = new Schema({
	date: Date,
	tagList: Array,
	title: String,
	marks: Number,
	from: {
		type: ObjectId,
		ref: 'User'
	},
	content: String,
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
		var inOpt = {
			from: opt.id,
		}
		if('date' in opt){
			inOpt.date = opt.date
		}
		console.log('JSON....'+JSON.stringify(opt))
		console.log('JSON....'+JSON.stringify(inOpt))

		return this.find(inOpt).sort({'date': -1})
			.then(cb);
	}
}

module.exports = ScheMa;