<?php
header('Content-Type: image/jpeg');
require('./qrlib.php');
// $url_param = preg_replace('/[^-a-zA-Z0-9_]/', '', $_GET['noteID']);
// 
// 

$raw_data = $_GET['id'];
preg_match('/^\w+$/', $raw_data, $filtered_data);
if(!empty($filtered_data)){
	$domain_name = 'http://localhost/php_projects/short_url/?id=';
    $barcode_content = $domain_name. htmlspecialchars($filtered_data[0]);
	QRcode::png($barcode_content);
}
?>
