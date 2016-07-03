

class ProductController extends AppController {
	
	 public $name = 'Product';

//this is the controller function which will return the data for the product list 
//there is  query string parameter  page which will hold the current page you are on 

    public function products(){
    
        $this->autoLayout = false;
		$page=$this->request->query('page');
   
//this part is getting the product data from the table depending on whether a 
//particular page was requested   
                               
        if ($page != null) {
        $this->paginate = array('Product' => array('page' => $page,'limit' => 10));
        $products = $this->paginate('Product');    
        }
		else{
	    $this->paginate = array('Product' => array('limit' => 10));
        $products=$this->paginate('Product');
        }
        
//for putting the paginate data into an array which will be used for setting up the
//paginate view on the client side

        $paginate_data=array();
        $paginate_data['page']=$this->request->params['paging']['Product']['page'];
        $paginate_data['pageCount']=$this->request->params['paging']['Product']['pageCount'];
        $paginate_data['prevPage']=$this->request->params['paging']['Product']['prevPage'];
        $paginate_data['nextPage']=$this->request->params['paging']['Product']['nextPage'];

//for putting the product info retrieved int a form which can be used for the backbone collection 
//on the front end 		
     
	    $response_array=array();
        foreach($products as $val){			
		$response_array[]=$val['Product'];
		};
	   
		echo json_encode(array("pagination"=>$paginate_data,"products"=>$response_array));
		exit();	    
  
    }

}
