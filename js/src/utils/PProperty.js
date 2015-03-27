/*PProperty.js
 * constrainable value in para
 * essentially a wrapper class for cjs functionality
 *
 */

define([
	'underscore',
	'jquery',
	'backbone',
	'cjs'
], function(_, $, Backbone, cjs) {

	var PProperty = Backbone.Model.extend({
		/*constructor
		 * creates a new cjs based on the value passed in
		 */

		defaults: {
			name: 'PProperty',
			type: 'PProperty',
		},
		constructor: function(val, operator) {
			this._val = cjs(val);

			var callback = this.propertyModified;
			var target = this;
			this._val.onChange(function() {
				callback.call(target);
			});
			//this.storage =  val;
			if (operator) {
				this.set('operator', operator);
			}

		},
		getValue: function() {
			/*if(this.storage instanceof Function){
				console.log("function storage=",this.storage);
			}*/
			return this._val.get();
		},

		setValue: function(val) {
			this._val.set(val);

		},

		//callback triggered when a subproperty is modified externally 
		propertyModified: function() {
			this.trigger('modified', this);
		},

		//invalidate all constrainable properties
		invalidate: function() {
			this._val.invalidate();
		}


		//no toJSON required

	});

	return PProperty;
});