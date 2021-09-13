<?php 
// sleep(1);
function is_ajax_request() {
return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
}
// If this is not AJAX request then stop executing.
if(!is_ajax_request()) { exit; }
require_once('../../private/config/initialize.php');
if(is_get_request()){
	$args = $_GET;
	$total_views = CreateShortURL::count_previous_views($args['id']);

	if($total_views !== null){
		$send_arr = array('type'=>'total_views','result'=>'true', 'data'=>$total_views);
	}else{
		$send_arr = array('type'=>'total_views','result'=>'false','errors'=> 'Unknown error');
	}
	echo json_encode($send_arr);	
}
 ?>
