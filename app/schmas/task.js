var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var taskScheMa = new Schema({
	date: Date,
	title: String,
	done: Boolean,
	repeatType: {
		type: String,
		default: 'none'
	},
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

taskScheMa.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now()
	}

	next();
});

taskScheMa.statics = {
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

module.exports = taskScheMa;