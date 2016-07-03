//for settting up pagination model to pass around paging data
//to the view which will use it to create the physical view to be used 
//query attribute can be used to add additional attributes(example a filter) to the pagination view
//pagination is the current page 
//url is url where data will be retrieved for the product model
	 var PageModel = Backbone.Model.extend({ 
	 defaults: {
     query :null,
	 pagination: null,
	 url:null
     }
     });


//view for pagination item
//query field  is used for customer attribute which can be used for custom  query string parameter
//which can then be sent to the server 

     var PaginateView= Backbone.View.extend({
	 tagname:'div',
	 id:'page_div',
	 model:PageModel,
	 template: _.template($('#paginate_tmpl').html()),
	 
	 render:function(){	 		 	 
	 var pass_data={
	 query:this.model.get('query'),
	 url:this.model.get('url'),
	 paginate:this.model.get('pagination')
	 };
     var html = this.template(pass_data);
     this.$el.html(html);
     return this;
	 }
	 });
