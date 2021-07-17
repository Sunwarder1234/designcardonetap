
<?php 
define('__ROOT__',dirname(__FILE__));
echo __ROOT__;

require_once(__ROOT__.'/headers.php');
include_once(dirname(__ROOT__)."/wp-load.php");

global $wpdb;

$dataUser = $wpdb -> get_row(

    $wpdb -> prepare("SELECT * FROM {$wpdb->prefix}vivucard_user WHERE id = %s",$_SESSION['userid'])

);

$sqlsCreateTempTable = ["DROP TABLE  IF EXISTS bt_temp_table","CREATE TABLE bt_temp_table SELECT * FROM {$wpdb->prefix}vivucard_social_media_user WHERE userid = '{$_SESSION['userid']}'","ALTER TABLE bt_temp_table DROP id, DROP userid"];
$selectTempTable =  "SELECT * FROM bt_temp_table";

for($i = 0 ; $i < count($sqlsCreateTempTable); $i++){
    $wpdb -> query(
        
            $sqlsCreateTempTable[$i]
        
    );
}


$dataMediaUser = $wpdb -> get_row(
    $selectTempTable
);


    $coverimage = $dataUser -> cover_image;
    $coverimageX = $dataUser -> cover_image_x;
    $coverimageY = $dataUser -> cover_image_y;

    require(__ROOT__."/cloudinary_base_url.php");


?>



<html lang="en">
<head>
	<style>.no-js div.loading-wrap{display: none;}div#usercover {max-height:500px};	</style>
<?php 
include_once(__ROOT__.'/includes/assets.php');
?>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $dataUser -> displayedName ?></title>
    <link rel="stylesheet" href="/vivucard/node_modules/fontawesome-free-5.15.3-web/css/all.css">
   <link rel="stylesheet" href="/vivucard/node_modules/fontawesome-free-5.15.3-web/css/fontawesome.css">
   <link rel="stylesheet" href="/vivucard/node_modules/@fortawesome/fontawesome-free/css/all.min.css">
   <link rel="stylesheet" href="/vivucard/node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css">
   <link rel="stylesheet" href="/vivucard/public/styles/external-form.css?2321">

    <link rel="stylesheet" href="./jquery-ui-1.12.1/jquery-ui.css">
    <script src="/vivucard/public/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<style type="text/css" data-styled-components="FiaaB gTcftA caPIRE" data-styled-components-is-local="true">
/* sc-component-id: sc-keyframes-FiaaB */
@-webkit-keyframes FiaaB{100%{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg);}}@keyframes FiaaB{100%{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg);}}
/* sc-component-id: sc-keyframes-gTcftA */
@-webkit-keyframes gTcftA{10%,90%{-webkit-transform:translate3d(-1px,0,0);-ms-transform:translate3d(-1px,0,0);transform:translate3d(-1px,0,0);}20%,80%{-webkit-transform:translate3d(2px,0,0);-ms-transform:translate3d(2px,0,0);transform:translate3d(2px,0,0);}30%,50%,70%{-webkit-transform:translate3d(-4px,0,0);-ms-transform:translate3d(-4px,0,0);transform:translate3d(-4px,0,0);}40%,60%{-webkit-transform:translate3d(4px,0,0);-ms-transform:translate3d(4px,0,0);transform:translate3d(4px,0,0);}}@keyframes gTcftA{10%,90%{-webkit-transform:translate3d(-1px,0,0);-ms-transform:translate3d(-1px,0,0);transform:translate3d(-1px,0,0);}20%,80%{-webkit-transform:translate3d(2px,0,0);-ms-transform:translate3d(2px,0,0);transform:translate3d(2px,0,0);}30%,50%,70%{-webkit-transform:translate3d(-4px,0,0);-ms-transform:translate3d(-4px,0,0);transform:translate3d(-4px,0,0);}40%,60%{-webkit-transform:translate3d(4px,0,0);-ms-transform:translate3d(4px,0,0);transform:translate3d(4px,0,0);}}
/* sc-component-id: sc-keyframes-caPIRE */
@-webkit-keyframes caPIRE{0%{-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);}20%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}40%{-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);}60%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}80%{-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);}100%{-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);}}@keyframes caPIRE{0%{-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);}20%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}40%{-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);}60%{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);}80%{-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);}100%{-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);}}</style>

  <script>
  window.console = window.console || function(t) {};
</script>

  
  
  <script>
  if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
  }
</script>
</head>

<body class="bg-dark">

<?php   require(__ROOT__."/includes/header.php"); include_once(__ROOT__."/features/imageviewer/imageviewer.php");
	include(__ROOT__."/loadingmodule.php");
	?>
	
	
<div id="contentWrap" class="p-4 bg-dark content-wrap content fluid-container">
        <div class="row">
			
            <div class="profile">
            
                <div class="menu-btn-wrap">
                    <!-- <a class="link text-white" href="logout.php">Đăng xuất</a> -->
                    
                </div>
            <div class="user-info">
            
                <div class="profile-wrap">
					<div style="display: inline-block;" id="" class="avatar-wrap">
                <?php 
                       $avatar = $dataUser -> account_avatar; 
                       $avatar = trim($avatar,"'");
                            
                           $srcImage = CLOUDINARY_IMAGE_URL."g_face/"."$avatar";

                             echo "<img src={$srcImage} class='avatar    rounded-circle  ' alt='{$dataUser->displayedName}' data-holder-render = 'true'>"
                       ?>
				</div>

                       
                    <h4 maxlength="20" class="displayedname text-white d-inline-block"><?php echo $dataUser -> displayedName?></h4>    
                        

                    
                    <span class="text-danger edit-display-name-msg">Giới hạn 50 kí tự</span>
                    
                    <span class="edit-btn" id="edit-display-name-btn"><i class="text-white fas fa-edit"></i></span>
                    <form method="POST" id="change-displayed-name-form">
                    <input type="hidden" name="displayednameinput" id="displayednameinput">
                    <button type="submit" name="submit" value="Lưu" class="save-btn hider btn-light btn" id="save-edit-display-name-btn">Lưu</button>
                    </form>
                    
                </div>
                    
                    <div id="description-wrap">
                        <q id="userdescript" class="description">
                        <?php echo $dataUser -> description; ?>
                        </q>
                        <a href="#adddescription" class="mt-10 edit-description-btn text-light link">Thêm tiểu sử</a>
                        <span placeholder="" id="descriptioninputspan" class=" text-white"></span><span class="text-danger edit-description-msg">Giới hạn 200 kí tự</span>
                        
                        
                        <form method="POST" id="change-description-form">
                    <input type="hidden" name="descriptioninput" id="descriptioninput">
                    <button type="submit" name="submit" value="Lưu" class="hider mt-1 save-btn hider btn-light btn" id="save-edit-description-btn">Lưu</button>
                    </form>
                    </div>
                </div>
                
            </div>
            <div class="list-inline account-list mt-5">
            <?php
                foreach($dataMediaUser as $name => $url){
                    
                    if(!empty($url)){
                ?>
                        <div class="list-inline-item item w-100">
                            <a target="_blank" href="<?php echo $url; ?>" class="text-dark">
                                <img src="<?php echo 'icon/'.$name.'.png' ?>" class="account-icon rounded" alt="<?php echo $name; ?>-Vivucard - Thẻ Thông Minh Cá Nhân">
                                <h4 class="text-white media-name d-inline-block"><?php echo ucwords($name); ?></h4>
                            </a>
                        </div>
                <?php
                    }
                }



            ?>
                <button class="btn btn-light" id="add-social-media-btn">Thêm MXH</button>
            </div>
        </div>
    <div class="add-social-media-popup-wrap"> 

             <div class="add-social-media-popup-bg"></div> 
             <div class="p-absolute w-50 bg-white add-social-media-popup">
             <div class=" m-4 avatar-wrap text-center ">
                <img src="/vivucard/icon/logo-vivucard-for-white-bg.svg" class="logo"  alt="Vivucard logo">
                 </div>
                <h4 class="text-dark text-center">Thêm mạng xã hội mới</h4>
                <form id="app-cover" method="POST" action="addsocialmedia.vivucard.php" class="form-control">
                    <div id="select-box">
                        
                        <div id="select-button" class="brd">
                                <div id="selected-value">
                                    <span class="font-weight-bold">Select a platform</span>
                                </div>
                                <div id="chevrons">
                                        <i class="fas fa-chevron-up"></i>
                                        <i class="fas fa-chevron-down"></i>
                                </div>
                        </div>
                        <div id="options">
                            <?php 
                                foreach($dataMediaUser as $name => $url){
                                    if(
                                        $name !== 'zalo' && $name !== 'gmail' && $name !== 'bigo' && $name !== 'linkedln'
                                        && $name !== 'tiki' && $name !== 'lazada' && $name !== 'shopee'
                                    ){
                                    ?>
                                    <div class="<?php echo $name; ?> option">
                                        <label class="platform-label" for="<?php echo $name; ?>"></label>
                                        <input class="s-c bottom" type="radio" id="<?php echo $name; ?>" name="platform" value="<?php echo $name; ?>">
                                        
                                        <i class="fab fa-<?php echo $name;?>"></i>
                                        
                                        <span class="opt-val"><?php echo ucwords($name); ?></span>
                                    </div>

                                    <?php 
                                    }
                                    else{
                                        if($name === "zalo"){
                                        ?>
                                        <div class="zalo option">
                                <label class="platform-label" for="zalo"></label>
                                        <input class="s-c bottom" type="radio" id="zalo" name="platform" value="zalo">
                                        <i class=""><img width="16px" height="16px" src="/vivucard/icon/zalo.png" alt="zalo"></i>
                                        
                                        <span class="opt-val">Zalo</span>
                                </div>
                                        <?php
                                        }
                                        else if($name === "linkedln"){
                                            ?>
                                    <div class="<?php echo $name; ?> option">
                                        <label class="platform-label" for="<?php echo $name; ?>"></label>
                                        <input class="s-c bottom" type="radio" id="<?php echo $name; ?>" name="platform" value="<?php echo $name; ?>">
                                        
                                        <i class="fab fa-linkedin"></i>
                                        
                                        <span class="opt-val"><?php echo ucwords($name); ?></span>
                                    </div>
                                    <?php  
                                        }
                                        else{
                                            ?>
                                            <div class="<?php echo $name; ?> option">
                                            <label class="platform-label" for="<?php echo $name; ?>"></label>
                                            <input class="s-c bottom" type="radio" id="<?php echo $name; ?>" name="platform" value="<?php echo $name; ?>">
                                            <i class=" fa-<?php echo $name; ?>"><img width="16px" height="16px" src="/vivucard/icon/<?php echo $name; ?>.png" alt="<?php echo $name; ?>"></i>
                                            
                                            <span class="opt-val"><?php echo ucwords($name); ?></span>
                                            </div>
                                            <?php
                                        }
                                    }
                                }
                            ?>
                                
                        </div>   
                        <div id="option-bg"></div>
                    </div>
           
                       
            <br>
                <div class="user-info-input">
                <label class="font-weight-bold" for="social-media-link" class="social-media-link-label">Nhập id tài khoản hoặc liên kết mạng xã hội</label>
                <input placeholder="Nhập id tài khoản hoặc liên kết mạng xã hội" type="text" class="form-control" name="social-media-link" id="social-media-link">
                </div>
<br>
   <h6 class="text-right"><a class=" link text-primary get-link-document how-to-get-id how-to-get-link" target="_blank"  href=""></a></h6>
                
                <br>                
                <input type="submit" class="form-control" name="submit" value="Thêm">
</form>
                        </div>
   
</div>
        

     

        <script type="text/javascript">
                
                let addSocialMediaBtn = document.querySelector("button#add-social-media-btn");
                let socialMediaLinkInput = document.querySelector("input#social-media-link");
                let googleQueryFormatLink;
                
                let targetQuery;
                socialMediaLinkInput.addEventListener("click",function(ev){
                        
                })
                
                
                
                


                addSocialMediaBtn.addEventListener("click",function(ev){
                    $("div.add-social-media-popup-wrap").show();
                })
                let addSocialMediaPopupBacground = document.querySelectorAll("div.add-social-media-popup-bg")[0];
                addSocialMediaPopupBacground.addEventListener("click",function(ev){
                    ev.stopImmediatePropagation();
                    $("div.add-social-media-popup-wrap").hide();
                })


                document.querySelector("div#select-box").addEventListener("click",function(ev){
               ev.stopImmediatePropagation();
               
           })
           $("input.s-c").on("click",function(ev){
               ev.stopImmediatePropagation();
               
           })
         
          
           if($("q.description").text().trim().length === 0){
               $("a.edit-description-btn").text("Thêm tiểu sử");
           }
           else{
            $("a.edit-description-btn").html(`<i class="text-white fas fa-edit"></i>`);
           }
       
           
           $("div.option").hover(function(ev){
            $(this).addClass("userhovered");
            
           },function(ev){
            $(this).removeClass("userhovered");
           })
           let radioBtns = document.querySelectorAll("input[name='platform']");
           console.log(radioBtns);
           $("input[name='platform']").on("change",function(ev){
            for(let btn of radioBtns){
                    console.log(btn);
                    if(btn.checked){
                        googleQueryFormatLink = "https://vivucard.com//vivucard/document/"
                        targetQuery = `${btn.value}`;
                        document.querySelector("a.how-to-get-link").textContent = `Cách lấy id tài khoản ${btn.value}?`;
                        document.querySelector("a.how-to-get-link").href = googleQueryFormatLink + targetQuery;
                    }
            }
           })
           $("div.option").on("click",function(ev){
                $("div#options").slideToggle();
                $("div#selected-value span").html($(this).find("i").clone()).append($(this).find("span.opt-val").clone());
                
                
           })

           $("div#select-button").on("click",function(ev){
                $("div#options").slideToggle();
           })    
           $("form#change-displayed-name-form").on("submit",function(ev){
               ev.preventDefault();
               $("input#displayednameinput")[0].value = $("div.profile-wrap h4.displayedname").text();
               $.ajax({
                   method : "POST",
                   url : "change-displayed-name.ajax.php",
                   data : $(this).serialize(),
                   success: function(data){
   
                       $("div.profile-wrap h4.displayedname").text($("input#displayednameinput")[0].value);

                       $("div.profile-wrap h4.displayedname").removeClass("form-control edit-name-input").removeAttr("contenteditable");
                   }

               })
            $(this).closest("div.profile-wrap").find("span#edit-display-name-btn").removeClass("hider");
            $(this).closest("div.profile-wrap").find("button#save-edit-display-name-btn").addClass("hider");
           })

           $("form#change-description-form").on("submit",function(ev){
               ev.preventDefault();
               $("input#descriptioninput")[0].value = $("div#description-wrap span.edit-description-input").text();
               $.ajax({
                method : "POST",
                   url : "change-description.ajax.php",
                   data : $(this).serialize(),
                   success: function(data){
   
                       $("div#description-wrap q.description").text($("input#descriptioninput")[0].value);
                        
                       $("div#description-wrap span.edit-description-input").removeClass("form-control edit-description-input").removeAttr("contenteditable");
                   }
               })
            $(this).closest("div#description-wrap").find("span#descriptioninputspan").text("");
            $(this).closest("div#description-wrap").find("a.edit-description-btn").removeClass("hider");
            $(this).closest("div#description-wrap").find("button#save-edit-description-btn").addClass("hider");
           })

           $("span#descriptioninputspan").on("input",function(ev){
               if($(this).text().length > 200){
                    $(this).text($(this).text().substring(0,200));
                    $("span.edit-description-msg").addClass("show");
                    
               }
               else{
                $("span.edit-description-msg").removeClass("show");
               }
           })
           $("h4.displayedname").on("input",function(ev){
               if($(this).text().length > 50){
                    $(this).text($(this).text().substring(0,50));
                    $("span.edit-display-name-msg").addClass("show");
                    
               }
               else{
                $("span.edit-display-name-msg").removeClass("show");
               }
           })

           $("span#edit-display-name-btn").on("click",function(ev){
                $(this).closest("div.profile-wrap").find("h4.displayedname").addClass("form-control edit-name-input").attr("contenteditable","true");
                $(this).addClass("hider");
                $(this).closest("div.profile-wrap").find("button#save-edit-display-name-btn").removeClass("hider");
                
           })

           $("a.edit-description-btn").on("click",function(ev){
			   $("#descriptioninputspan").text($("#userdescript").text());
			   
                 $(this).closest("div#description-wrap").find("span#descriptioninputspan").addClass("form-control edit-description-input").attr("contenteditable","true");
                 $(this).addClass("hider");
                 $(this).closest("div#description-wrap").find("button#save-edit-description-btn").removeClass("hider");
			   
           }) 
           

            </script>
       
       <script>
           jQuery.ajaxSetup(
               {
                   beforeSend : function(){
                       $("div.loading-wrap").fadeIn();
                   },
                   success: function(){
                    $("div.loading-wrap").fadeOut();
                   },
                   complete : function(){
                    $("div.loading-wrap").fadeOut();
                   },
                   timeout: 60000
               }
           )     
        </script>
   <?php include_once(__ROOT__."/includes/assets-footer.php"); ?>

	</div>
	
<div id="customizepopupwrap" class="h-100 col-12 mobile-element w-100">
    <div class="customize-popup-bg">

    </div>
          <div id="customizepopup" class="bg-white w-75">
			  <form id="customizeForm" method="POST" enctype="multipart/form-data" action="./updatecustomize.vivucard.php">
				  <h5 class="text-center text-white d-block popup-name">Tùy chỉnh giao diện (Người khác cũng nhìn thấy)</h5> 
				  <div id="coverpickerwrap" class="cover-picker">
					   <h2 class="text-dark">
							Chọn ảnh bìa
					   </h2>
					  <label class="box customizeprofileinputlabel" id="uploadcoverimagelabel" for="coverimagefileinput" ><i style="font-size:30px;" class="text-white fas fa-cloud-upload-alt"></i></label>
					   <input type="file" class="d-none form-control-file" accept="image/*" name="coverimagefileinput" id="coverimagefileinput">
					   <input type="hidden" name="cover_image_x" id="xoffsetcoverimage" value="1px">
					   <input type="hidden" name="cover_image_y" id="yoffsetcoverimage" value="0px">

					</div>

                    <div id="avatarpickerwrap" class="avatar-picker">
					   <h2 class="text-dark">
							Chọn ảnh đại diện
					   </h2>
					  <label class="box customizeprofileinputlabel" id="uploadavatarimagelabel" for="avatarimagefileinput" ><i style="font-size:30px;" class="text-white fas fa-cloud-upload-alt"></i></label>
					   <input type="file" class="d-none form-control-file" accept="image/*" name="avatarimagefileinput" id="avatarimagefileinput">
					   <input type="hidden" name="avatar_image_x" id="xoffsetavatarimage" value="1px">
					   <input type="hidden" name="avatar_image_y" id="yoffsetavatarimage" value="0px">
						<div class="save-btn-wrap text-end">
							 <input type="submit" class="btn btn-success" value="Update" name="submit" id="saveBtn" class="save-btn">
						</div>                
					</div>
			  </form>
          </div>
   
	</div>
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" integrity="sha512-3n19xznO0ubPpSwYCRRBgHh63DrV+bdZfHK52b1esvId4GsfwStQNPJFjeQos2h3JwCmZl0/LgLxSKMAI55hgw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>

let $menuBtn = $("div#menubarwrap span#menu-btn");
let $customizeBtn = $("div.mobile-element.menu-bar span#customize-btn");

$menuBtn.on("click",function(ev){

 console.log("click");
    $("div#menupopup").addClass("show");
    $("div#menupopup").fadeToggle();
})
$("div#menupopup ul").on("click",function(ev){
    ev.stopImmediatePropagation();
})
$("div#menupopup").on("click",function(ev){
 $("div#menupopup").removeClass("show")
 $("div#menupopup").fadeToggle();
})
 
 $customizeBtn.on("click",function(ev){
     $("div#customizepopupwrap").fadeToggle();
 })
 $("div.customize-popup-bg").on("click",function(ev){
     $("div#customizepopupwrap").fadeToggle();
 })
 $("div#customizepopup").on("click",function(ev){
     ev.stopImmediatePropagation();
 })
 $("input#coverimagefileinput").on("input",function(ev){
    
    let target = this;
    const reader = new FileReader();
    reader.onload = function(ev){
        $("div#usercover img#coverimage").fadeOut();
        $("div#usercover #coverimageplaceholder.cover-image-place-holder").fadeIn();
        $("div#usercover #coverimageplaceholder.cover-image-place-holder")[0].src = ev.target.result;
        $("div#usercover .cover-image-place-holder").css("cursor","move");
        var imageLoadtimer = setInterval(function(){
            
            $("div#contentWrap").height($("div#usercover .cover-image-place-holder").height());
            
            if($("div#usercover .cover-image-place-holder").height() > 0){
                clearInt();             
            }
        },100);
        function clearInt(){
               clearInterval(imageLoadtimer);
        }
    }
    reader.readAsDataURL(this.files[0]);
    let str = `<span class="text-white">${this.files[0].name}</span>`
    $("label#uploadcoverimagelabel").append(str);

    
     
 })
$("input#avatarimagefileinput").on("input",function(ev){
      const reader = new FileReader();
	  reader.onload = function(ev){
        
        
        $(".avatar")[0].src = ev.target.result;
	  }
        
	reader.readAsDataURL(this.files[0]);
    let str = `<span class="text-white">${this.files[0].name}</span>`
    $("label#uploadavatarimagelabel").append(str);
})
 $("form#customizeForm").on("submit",function(ev){
  	    $("div.loading-wrap").fadeIn();
 
    $("div#customizepopupwrap").fadeToggle();
    $("div.inner-cover-image")[0].style.backgroundPositionX = $("img.cover-image-place-holder")[0].style.left;
    $("div.inner-cover-image")[0].style.backgroundPositionY = $("img.cover-image-place-holder")[0].style.top;
    
 })
		
  if(new RegExp(/err=invalidlink/g).test(window.location.search)){
      alert("Liên kết mạng xã hội không hợp lệ.");
  }
else if(new RegExp(/err=addfailed/g).test(window.location.search)){
    alert("Không thể xử lý yêu cầu của bạn. Vui lòng liên hệ chúng tôi để được trợ giúp.");
}


    $("div#usercover .cover-image-place-holder").on("drag",function(ev){
        $("input#xoffsetcoverimage")[0].value = $("div#usercover .cover-image-place-holder")[0].style.left;
        $("input#yoffsetcoverimage")[0].value = $("div#usercover .cover-image-place-holder")[0].style.top;
    })
$("div#usercover .cover-image-place-holder").draggable({
        axis : "y"
    });
    
    
    $("div#usercover .cover-image-place-holder").draggable("option","axis","y");

	window.onresize = function(){
	$("div#usercover").height($("#coverimage.cover-image").height());
	
	}	
	$(window).ready(function(){
	
	    $("div.loading-wrap").fadeOut();
	    
	    $("div#usercover").height($("#coverimage.cover-image").height());
	
	})
		
</script>

		
</body>
</html>