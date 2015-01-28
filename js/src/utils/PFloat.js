/*PFloat.js*
 * constrainable float class 
 * for para instance properties
 * x: PProperty object for storing float value
 */

define([

		'paper',
		'cjs',
		'utils/PProperty',
		'utils/PConstraint'
	],

	function(paper, cjs, PProperty, PConstraint) {

		var PFloat = PConstraint.extend({

			/* constructor
			* val: initial value of the float
			* operator: optional argument to specify the 
			* operation performed when property is modified
			*/
			constructor: function(val, operator) {
				this.val = new PProperty(val);
				PConstraint.apply(this, arguments);
				if (operator) {
					this.set('operator', operator);
				}
				this.setNull(false);
			},

			/* setValue
			* sets the value of the property
			*/
			setValue: function(val) {
				this.val.setValue(val);
			},

			/* getValue
			* checks to see if val is constrained
			* and if so, returns the constraint value
			* otherwise just returns the current value of val.
			*/
			getValue: function() {
				if(!this.isConstrained()){
					return this.val.getValue();
				}
				else{
					return this.getConstraint().getValue();
				}
			},

			/*clone
			 * returns a static clone based on the current values of the point
			 * does not clone the constraints of the original
			 */
			clone: function() {
				return new PFloat(this.getValue());
			},

			/* basic math operations */
			add: function(val, newP) {
				if (newP) {
					var float2 = this.clone();
					float2.add(val);
					return float2;
				} else {
					this.setValue(this.val.getValue() + val);
				}
			},

			sub: function(val, newP) {
				if (newP) {
					var float2 = this.clone();
					float2.sub(val);
					return float2;
				} else {
					this.setValue(this.val.getValue() - val);
				}
			},
			div: function(val, newP) {
				if (newP) {
					var float2 = this.clone();
					float2.div(val);
					return float2;
				} else {
					this.setValue(this.val.getValue() / val);
				}
			},

			mul: function(val, newP) {
				if (newP) {
					var float2 = this.clone();
					float2.mul(val);
					return float2;
				} else {
					this.setValue(this.val.getValue() * val);
				}
			}

		});

		return PFloat;
	});