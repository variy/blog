var tpl = require('./tpl');
var maxZindex = 99;

var defaultSettings = {
	title: '',
	body: '',
	hasCloseBtn: true,
	afterclose: function(){

	},
	beforeshow: function(){

	}
}

var btnDefaultSettings = {
	style: 'default',
	txt: '',
	cb: function(){
		return true;
	}
}
var O = function(opts){
	var options = _.extend(defaultSettings, opts);
	options.footer = options.footer || [];
	for(var i=0; i<options.footer.length; i++){
		var btnOpt = options.footer[i];
		for(var attr in btnDefaultSettings){
			if(!(attr in btnOpt)){
				btnOpt[attr] = btnDefaultSettings[attr]
			}
		}
	}

	this.options = options;
	this.render();
	this.animated();
	this.initEvent();
}

O.prototype.render = function() {
	console.log(document.body.scrollHeigh)
	this.$el = $('<div class="dialog-box"></div>');
	this.$el.height(document.body.scrollHeight);
	this.$el.width(document.body.scrollWidth);
	this.$el.css('z-index', ++maxZindex);

	var html = tpl(this.options);
	this.$el.html(html).appendTo('body');

	('beforeshow' in  this.options) && this.options.beforeshow(this)

	this.contentEl = this.$el.find('.dialog-content');
	this.closeBtn = this.$el.find('.dialog-close');
	this.btnGroup = this.$el.find('.dialog-footer > button');
	var wW = window.innerWidth;
	var wH = window.innerHeight;
	this.contentEl.css({
		'left': (this.$el.width() - this.contentEl.width()) /2,
		'top': document.body.scrollTop + (document.documentElement.clientHeight - this.contentEl.height())/2
	})
};

O.prototype.animated = function() {
	var me = this;
	this.closeFn = function(){
		me.contentEl.removeClass('fadeInDown').addClass('fadeOutUp');
		var fn = function(){
			me.$el.remove();
			me.contentEl.off('webkitAnimationEnd animationend', fn);
		}
		me.contentEl.on('webkitAnimationEnd animationend', fn);
	}

	this.showFn = function(){
		me.$el.show();
		me.contentEl.addClass('animated fadeInDown')
	}

	this.showFn();
};

O.prototype.initEvent = function() {
	var me = this;
	this.closeBtn.on('click', function(){
		me.closeFn.call(me);
	});

	if(this.options.footer.length > 0){
		for(var i = 0; i< this.btnGroup.length; i++){
			(function(i){
				var btnOpt = me.options.footer[i];
				me.btnGroup.eq(i).click(function(){
					if(btnOpt.cb(me)){
						me.closeFn.call(me);
					}
				})
			})(i);
		}
	}
};

module.exports = O;