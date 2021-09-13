<?php 
sleep(1);
function is_ajax_request() {
return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
}
// If this is not AJAX request then stop executing.
if(!is_ajax_request()) { exit; }
require_once('../../private/config/initialize.php');
if(is_ajax_post_request()){
	$args = $_POST;
	$short_url = new CreateShortURL($args);
	$result = $short_url->save();

	if($result === true){
		$send_arr = array('type'=>'create_short_url','result'=>'true', 'data'=>$short_url);
	}else{
		$send_arr = array('type'=>'create_short_url','result'=>'false','errors'=> $short_url->errors);
	}
	echo json_encode($send_arr);	
}
 ?>
