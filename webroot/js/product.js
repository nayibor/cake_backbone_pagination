

//this is the product object

var product = {
	
//init function is used to initialize stuff to happen
//when  the page loads
//most backbone functionality will be done here 

init:function(){
	
//this is for the product model
//fields can be customized to suite you.
//just make sure attribute in product_list_template.ctp element 
//used as a backbone template file are the same here 
// are the same as the ones here
	 var ProductModel = Backbone.Model.extend({
	 defaults: {
     id:null,
	 product_name: null,
	 user_id:null,
	 cost_price:null,
	 selling_price:null,
	 min_stock_notif:null,
	 max_stock_notif:null,
	 stock_available:0,
	 archive_status:0,
	 cost:0,
	 quant_sale:0,
	 new_stock:0
	 }
	 });
	
	
//for basic collection extends  object with meta facilities
//this is to enable a backbone collection have access to attributes which by default is not possible
//meta attributes can be used for  atttributes for a  collection such as pagination data 
	 var MetaCollection = Backbone.Collection.extend({
		 
     parse: function(data) {
	 },
     meta: function(prop, value) {
        if (value === undefined) {
            return this._meta[prop]
        } else {
            this._meta[prop] = value;
        }
     }
	 });
	
//for collection object for product
//this extends the meta collection object 
//parse function is added so that data can be parsed into a form which can be understood by backbone	
	 var ProductsCollection = MetaCollection.extend({
	 
	 _meta:[],
     url: $("#product_list_url").val(),
     model: ProductModel,
     initialize: function() {
		 
	 },
     parse: function(data) {
	 this.meta('pagination',(data.pagination) ? data.pagination : {});
	 this.meta('products',(data.products) ? data.products : {});
     return data.products;
     }
	 });
	
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
	
//view for a single product_list_item
	 var ProductsItemView = Backbone.View.extend({
     tagName: 'tr',
     id:function(){return this.model.get( 'id')},
     template: _.template($('#prod_tmpl').html()),
     
     initialize: function() {
	 
	 this.listenTo(this.model, 'sync', this.render);

	 }, 
	 render: function() {	 
     var html = this.template(this.model.toJSON());
     this.$el.html(html);
     return this;
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

//view for rendering the whole product list object containted from the  db 
//as well as the pagination row also  
	 var ProductListView = Backbone.View.extend({
	 el: '.tableWrapper',


	 list_view_table:$('#table_info_tbody'),
	 list_paginate_view:$('#page_outer_div'),	 

     initialize: function() {
	 _this_list=this;
     
     this.listenTo(this.collection, 'sync', this.render);
     this.listenTo(this.collection, 'request', this.request_event);
     this.listenTo(this.collection, 'error', this.error_event);
     
	 }, 
	 request_event:function(){	 
	 console.log("request_event fired");	 
     },    
     error_event:function(){
	 
	 console.log("error event fired");	 
     },
     
//for rendering the whole page including looping to 
     render: function(event) {
	 _this_list=this;
	 
//product list is emptied to make room for new list 
//pagination object is emptied to make room for new pagination object	 
	 	
     var $list = this.$('#table_info_tbody').empty();
     var $page = this.$('#page_outer_div').empty();
 
//collection object is looped throught to create a view(ProductsItemView) for each model  
//before it is appended to the screen 
     this.collection.each(function(model_data) {
     var item = new ProductsItemView({model: model_data});
     $list.append(item.render().$el);
     i++;
     }, this);
	
     var page = new PaginateView({model:new PageModel({
	 query:"query=filter",
	 url:$("#product_list_url").val(),
	 pagination:_this_list.collection.meta('pagination')})});
	 $page.append(page.render().$el);
     return this;
    
     },

//events which will be used for retrieving new data when a paginate link is clicked
     events: {
	 'click span.pglink a' : 'onPage'
	 },
     onPage:function(event){
	 event.preventDefault();
     this.searchPage(event.currentTarget.href);
	 },
	 searchPage:function(url_send){
		  
	 this.collection.fetch({wait:true,
	 url:url_send,
	 beforeSend(){
	 console.log("Retrieving Details..."); 
	 },
     error:function(collection,response,options){
	 alert("Error<br>"+"Please Try Again");	
	 
	 },
     success:function(collections,response,options){
	 console.log("Data Retrieval Succesful...");
		}
		});	 
	 }
	 
	 });
     
     
//for creating instance of collection object and view object
// use reset instead of fetch for bootstraping
	 var product_list = new ProductsCollection();    
     var productView  = new ProductListView({collection: product_list}); 
     product_list.fetch({
	 wait:true,
	 url:$("#product_list_url").val(),
	 beforeSend(){console.log("Retrieving Details...");},
     error:function(collection,response,options){alert("Error<br>"+"Please Try Again");	},
     success:function(collections,response,options){console.log("Data Retrieval Succesful...");}
	 });
     	
	 }
	 }



$(document).ready(function(){

	 product.init();

});
