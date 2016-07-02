<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.



 */
?>
<style>
    .tableWrapper{
        width:100% !important;
    }
</style>

<?php     

//this is the template for the pagination object as well
//as the single product list item 
       echo $this->element('product_list_template');
	   echo $this->element('paginate_template');
?>

<div class='tableWrapper'>
    <div class='tableHeader'>
        <div class='clear'></div>
        <div class='corner left'></div>
        <div class='corner right'></div>
    </div>


<table cellspacing='0' summary='' name="table_info" id="table_info">
    <thead>
        <tr>
<th class="sortup">Name</th>
<th class="sortup">Stock</th>
<th class="sortup">Quant/Batch</th>
<th class="sortup">Batch/Avl</th>
<th class="sortup">Rmd</th>
<th class="sortup">Stock Notification</th>
<th class="sortup">Max Stock</th>
<th>Category</th>
<th>Cost Pr</th>
<th>Selling Pr</th>
<th class='last alignRight'></th>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody name="table_info_tbody" id="table_info_tbody"></tbody>
</table>
<div id="page_outer_div">
</div>
<input type="hidden" name="product_list_url" id="product_list_url" value="<?php echo $this->Html->url(array('controller' => 'Product', 'action' => 'products')); ?>" />
</div>

<?php
		

//all the jquery needed as well as all the backbone and underscore files which are needed for tutorial 

echo $this->Html->css('jquery-ui-1.11.4_jquery-ui.css');
echo $this->Html->script('jquery-1.12.3.js');
echo $this->Html->script('jquery-ui-1.11.4_jquery-ui.js');
echo $this->Html->script('underscore.js');
echo $this->Html->script('backbone.js');
echo $this->Html->script('product.js');

?>



