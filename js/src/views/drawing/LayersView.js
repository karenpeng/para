/* LayersView.js
 * controls updates to the property menu
 */

define([
	'jquery',
	'underscore',
	'paper',
	'backbone',
	'handlebars',
	'fancytree',
	"text!html/layers_ui.html"

], function($, _, paper, Backbone, Handlebars, fancytree, ui) {
	var shapeTree, listTree, shapeRoot, listRoot;
		var testSource = [
    {title: "Shape 1", key: "1"},
      {title: "Shape 5", key: "7"},
        {title: "Shape 6", key: "8"},
    {title: "Shape 2", key: "2", folder: true, children: [
      {title: "Inheritor 1", key: "3"},
      {title: "Inheritor 2", key: "4"}
    ]}
  ];

  	var listSource = [
    {title: "List 1", key: "10",data:{list:true}},
      {title: "List 2", key: "11",data:{list:true}},
        {title: "List 3", key: "12",data:{list:true}},
  ];
	var LayersView = Backbone.View.extend({

		events: {
			'mousedown.filled': 'argumentClicked',
		},

		initialize: function(obj) {
			
			this.$el.append(ui);
			this.$('#shapes').fancytree({ source: testSource});
			this.$('#lists').fancytree({ source: listSource});
			shapeTree = $("#shapes").fancytree("getTree");
			$("#shapes").bind("click",this.layerClicked);
			shapeRoot = $("#shapes").fancytree("getRootNode");
			shapeRoot.addChildren({
    			title: "Shape 3",
    			key: 5
  			});
			console.log("We have " + shapeTree.count() + " nodes.");

			/*this.setElement(this.$('#layer-palette'));
			var id = this.model.get('id');
			this.$el.attr('id', 'layer_' + id); //;
			this.$el.css({
				visibility: 'visible'
			});
			this.setPosition();
			this.tsource = this.$('#layerTemplate').html();
			this.template = Handlebars.default.compile(this.tsource);
			this.listenTo(this.model, "change:showLayers", this.showLayers);
			this.listenTo(this.model, "change:translation_delta", this.setPosition);
			this.listenTo(this.model, 'change:f_parameters', this.updateParameters);
			
			//this.tool = new paper.Tool();
			//this.tool.parent = this;
			//this.tool.name = 'layer_tool';
			//this.tool.attach('mouseup', this.mouseUp);
			//$('body').bind('mouseup', this.mouseUp);*/

		},

		createFunctionPalette: function(instance) {

		},

		createStandardPalette: function(instance) {


		},


		setLayerActive: function(instanceId, layerId) {

		},

		updateParameters: function() {
			var parameters = this.model.get('f_parameters');
			var contexts = [];

			for (var i = 0; i < parameters.length; i++) {
				var filled = parameters[i].get('f_argument') ? 'active' : 'inactive';
				var visible = 'active';	//parameters[i].get('visible') ? 'active' : 'inactive';
				var id = parameters[i].get('id');
				var context = {
					name: parameters[i].get('param_name'),
					visible_active: visible,
					filled_active: filled,
					param_id: id
				};
				contexts.push(context);
			}
			var data = {
				layer: contexts
			};
			var html = this.template(data);
			$('#layers').html(html);
		},

		layerClicked: function(event) {
			
			var id = event.target.id;
			var classes = event.target.className.split(/\s+/);
			console.log('layer clicked',id,classes);
			switch(id){
				case 'constraint':
					
				break;
				case 'visible':
					if(!_.contains(classes,'hidden')){
						$(event.target).addClass('hidden');
					}
					else{
						console.log('removing class');
						$(event.target).removeClass('hidden');

					}
				break;
			}
		},

		/*mouseUp: function(event) {
			console.log('mouse up',this.parent.activeParam);

			if (this.parent.activeParam!==null) {
				console.log('layer mouse up');
				var mainTool = paper.tools.filter(function(item) {
					return item.name === 'canvas_tool';
				})[0];
				mainTool.activate();
				this.parent.activeParam = null;
			}
		},*/

		setPosition: function() {

			var position = this.model.accessProperty('translation_delta');
			var x = (position.x + 50).toString() + 'px';
			var y = position.y.toString() + 'px';
			this.$el.css({
				left: x,
				top: y
			});
		},

		showLayers: function() {
			if(this.model.get('name')!=='root'){
			var visibility = this.model.get('showLayers');

			this.$el.css({
				visibility: visibility
			});
			}
			else{
				this.$el.css({
				visibility: 'hidden'
			});
			}
		}


	});
	return LayersView;
});