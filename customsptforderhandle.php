<?php 
require(__ROOT__."/vendor/autoload.php");


require(__ROOT__."/cloudinary_base_url.php");

require __ROOT__."/cloudinary.config.php";

use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Cloudinary;

if(isset($_POST['submit'])){
    $songname = $_POST['songname'];
    $authorname = $_POST['authorname'];
    $imagespotify = $_POST['base64customspotifyimg'];
    
    $response = (new UploadApi())->unsignedUpload($target_cover_image_file,CLOUDINARY_PRESET_UPLOAD, 
    ["folder" => "custom-card"]);
    
    global $wpdb;
    
    
    $num= mt_rand(623931924,999999999999);

    $sel_query  = "SELECT *  FROM {$wpdb -> prefix}vivucard_user WHERE vivucard_code = "+$num; // query to select value 
    $data_query = array(
        "vivucard_code" => $num,
		
    );
    $result =  $wpdb -> get_results($sel_query);
    while( count($result) != 0 ) {                      // loops till an unique value is found 
        $num = mt_rand();
        $data_query = array(
            "vivucard_code" => $num
        );
    }
    
    
    $useremail = $_POST['email'];
    $userfullname = $_POST['displayedname'];
    $userphone = $_POST['phone'];
    $useraddr = $_POST['useraddr'];
    
	$wpdb -> insert("{$wpdb->prefix}vivucard_user",$data_query);
	
	$wpdb -> query(
	    $wpdb -> prepare(
		    "INSERT INTO {$wpdb->prefix}vivucard_user(address,name_on_card,phone) VALUES(%s,%s,%s)",$useraddr,$userfullname,$userphone
		)
	);
	
	
	$Cloud_BASE_Url = "https://res.cloudinary.com/vivucard/image/upload/custom-card/";
    $customcardimage = $Cloud_BASE_Url . $imagespotify;

    

    $subject = "ORDER COMPLETE - Vivucard";
    $to = $useremail;

    $message = '<p style="font-weight:700">Xin chúc mừng đã đặt hàng thành công. Cảm ơn các bạn đã tin tưởng chúng tôi.</p>';
    $message .= "<h1 style='text-align: center;'>Tổng quát đơn hàng</h1>";
    $message .= "<p style='font-weight:700'>Tên đơn hàng: Spotify Vivucard.</p>";
    $message .= "<p style='font-weight:700'>Địa chỉ giao hàng: $useraddr</p>";
    $message .= "<div style='display: flex;flex-flow:row;justify-content: space-between;'><img src='$customcardimage' alt='Thẻ Vivucard'></div>";

    $message .= "<p>Vui lòng kiểm tra điện thoại thường xuyên để nhân viên giao hàng giao đến sớm nhất cho bạn.</p>";
    $message .= "<p>Xin cảm ơn, Đội ngũ Vivucard.</p>";
    $message .= "<p>-----------------------------------------------------------------------------------------------</p>";
    $message .= "<p>Hotline: 0706082697</p>";

    $message .= "<p>Địa chỉ: 148/5 Ỷ Lan Nguyên Phi, Phường Hòa Cường, Quận Hải Châu, Thành phố Đà Nẵng</p>";

    $message .= "<p>Liên hệ: Nhắn tin qua facebook cá nhân : <a href='https://facebook.com/'>https://facebook.com/</a></p>";
$headers = "MIME-Version: 1.0" . "\r\n"; 
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; 
    $headers .= 'From: '."Đội ngũ Vivucard ". '<vivucard.service@gmail.com>' . "\r\n" .
    "To: $useremail"."\r\n";
   
	$_SESSION['useremail'] = substr($useremail,0,5) . "*******@gmail.com";
    wp_mail($to,$subject,$message,$headers);
    header("location: /vivucard/ordercomplete.php");
	
}
else{
    header("location: customcard");
}


?>