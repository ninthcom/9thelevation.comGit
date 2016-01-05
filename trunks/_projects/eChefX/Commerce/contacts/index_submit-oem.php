<?php

// Enter your contact email address here
$adminaddress = "information@echefx.com";

// Enter the address of your website here include http://www.
$siteaddress ="http://www.echefx.com";

// Enter your company name or site name here
$sitename = "echefx.com";

// pre set subject
$subject = "eChefX Concepts Email Email From: $sender";

//send to client
$subjectclient = "eChefX Concepts Email Email Confirmation";

$goback = "<a href=\"http://echefx.com\">Go Back</a>";

//date code
$date = date("m/d/Y H:i:s");

// start form actions

 $recipient_in = split(',',$recipient);
for ($i=0;$i<count($recipient_in);$i++) {
   $recipient_to_test = trim($recipient_in[$i]);
}

//change require to required
if ($required)
   $require = $required;

if ($require) {
//this is kinda plain english
   $require = ereg_replace( " +", "", $require);
   $required = split(",",$require);
   for ($i=0;$i<count($required);$i++) {
      $string = trim($required[$i]);
      if((!(${$string})) || (!(${$string}))) {
         if ($missing_fields_redirect) {
            header ("Location: $missing_fields_redirect");
            exit;
         }
         $require;
         $missing_field_list .= "<b>You Did Not Enter: $required[$i]</b><br>\n";
      }

/* for php programmers only
 if variables are'nt gettin sent you can just
 uncomment this line and include this code which will get all variables sent
 in the form and put them all in the message variable */
 
 //$message = parse_form($HTTP_POST_VARS);
 
 /* if underscore's dont appear, put them in, its just may editor is SHIT */
 
 /*
 i dont use this because i need some variables and its not very reliable this was used in v1.0 & v1.1 */

		  }
}

//if no subject use $othersub
if (!$subject)
   $subject = "$othersub";
//if no $othersub & no $subject use form submission as subject
   else if ((!$othersub) && (!$subject))
   $subject = "eChefX Concepts Email Email";

//Send E-mail
//other = if you added a extra field to the form call them other - other4
// dont worry bout the $other variables if you dont have them in the form nothing will show in the email

mail("$recipient","$subject",
"From $sender,\n

$sender submitted the following:
Senders Email: $email
Sent on: $date

Category: $category
Type: $type
Phone: $phone
Message: $message
Reply: $reply
------------------------
Let us know how are we doing
How did you hear about us: $hear
Our overall services: $services
Did you find what you are looking for? $looking
Would you recommend others to visit this website: $recommend
------------------------
Sent on: $date

","From: $sender <$email>");
// END send e-mail

//This sends a confirmation to your visitor
mail("$email","$subjectclient","
-confirmation email-

$sender submitted the following:
Sent on: $date

Category: $category
Type: $type
Phone: $phone
Message: $message
Reply: $reply
------------------------
Let us know how are we doing
How did you hear about us: $hear
Our overall services: $services
Did you find what you are looking for? $looking
Would you recommend others to visit this website: $recommend

------------------------

eChefX, Inc.
call toll free: 888.801.2433 | Fax: 866.470.2433
information@echefx.com

Thank You and Have a Great Day,

Please send emails to: information@echefx.com ----

","From: $adminaddress <$email>");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>eChefX-Contacts</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta name="title" content="ChefX FusionWear for Todays Chef" />
<meta name="description" lang="en" content="Chef Coat design by eChefX including in-stock and premium chef coats : Award winning design collections, ready-to-wear, eChefX and Xavier & Lords, FusionWear for Todays Chef...">
<meta name="keywords" lang="en" content="chef clothing,mens chef clothing,womens chef clothing,chef fashion,sous chef,cooks,hotel apparel,ready to wear,chef collections,USA,nevada,events,celebrities shows,press kit,videos,chef images,chef art,creation,chef clothes,hosptality clothing"/>

<link href="../_css/mall-styles.css" rel="stylesheet" type="text/css">
<script type="text/JavaScript">
<!--

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->
</script>
</head>

<body onLoad="MM_preloadImages('../images/jpg/canvas/9up.jpg')">

<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" valign="top"><table width="800" border="0" align="center" cellpadding="0" cellspacing="0" class="frame">
      <tr>
        <td><img src="../images/jpg/canvas/spacerTop.jpg" width="16" height="50"></td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><img src="../images/jpg/canvas/tLeft.jpg" width="16" height="18"></td>
        <td background="../images/jpg/canvas/top.jpg">&nbsp;</td>
        <td width="18"><img src="../images/jpg/canvas/tRight.jpg" width="18" height="18"></td>
      </tr>
      <tr>
        <td width="16" valign="top" background="../images/jpg/canvas/left.jpg"><img src="../images/jpg/canvas/leftTop.jpg" width="16" height="313"></td>
        <td><table width="100%" border="0" cellpadding="0" cellspacing="0" class="contentFrame">
          <tr>
            <td align="center" valign="top"><?php include("../header.php"); ?>&nbsp;</td>
          </tr>
          <tr>
            <td><table width="100%" height="430"  cellpadding="0" cellspacing="0" >
              <tr>
                <td width="752" height="25" align="left" valign="top" class="HZLine"><?php include("../navigation.php"); ?></td>
              </tr>
              <tr>
                <td height="401" align="center" valign="top"><table width="100%" border="0" cellspacing="1" cellpadding="0">
                  <tr>
                    <td width="50%" align="center"><img src="images/Contact-Us-Form.jpg" width="252" height="28" vspace="4"></td>
                    <td width="50%" align="center"><img src="images/wwr.jpg" width="252" height="28"></td>
                  </tr>
                  <tr>
                    <td class="verticleLineBlue"><table  width="100%" border="0" cellpadding="2" cellspacing="6" class="border">
                      <tr>
                        <td colspan="3" valign="top" bgcolor="#E5F3BB"><div align="center">
                            <p>&nbsp;</p>
                          <p><strong>Thank you for visiting eChefX. </strong></p>
                        </div>
                            <hr />
                            <div align="center">
                              <p><strong>You Should be recieving a copy of your submission shortly.</strong></p>
                              <p>&nbsp;</p>
                            </div></td>
                      </tr>
                    </table></td>
                    <td align="center" valign="top"><table width="100%" border="0" cellspacing="2" cellpadding="2">
                      <tr>
                        <td align="center"><a href="http://maps.google.com/maps/ms?ie=UTF8&oe=utf-8&q=henderson+nevada&near=89077&fb=1&hl=en&msa=0&om=1&msid=104372867833368090839.0000011354f021459d2e9&ll=36.080181,-114.9678&spn=0.766922,1.083527&z=10" target="_blank"><img src="images/gm.jpg" width="317" height="260" border="0"></a></td>
                      </tr>
                      <tr>
                        <td align="center"><a href="http://maps.google.com/maps/ms?ie=UTF8&oe=utf-8&q=henderson+nevada&near=89077&fb=1&hl=en&msa=0&om=1&msid=104372867833368090839.0000011354f021459d2e9&ll=36.080181,-114.9678&spn=0.766922,1.083527&z=10" target="_blank"><img src="images/gi-clcik.jpg" width="252" height="28" border="0"></a></td>
                      </tr>
                      <tr>
                        <td align="center"><a href="mailto:chefxavier@echefx.com"><img src="images/xl.jpg" width="252" height="28" border="0"></a></td>
                      </tr>
                      <tr>
                        <td align="center">&nbsp;</td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table></td>
          </tr>
          
        </table></td>
        <td valign="top" background="../images/jpg/canvas/right.jpg"><img src="../images/jpg/canvas/rTopb.jpg" width="18" height="313"></td>
      </tr>
      <tr>
        <td><img src="../images/jpg/canvas/bLeft.jpg" width="16" height="27"></td>
        <td align="center" background="../images/jpg/canvas/bBack.jpg"><img src="../images/jpg/canvas/btm.jpg" width="251" height="27"></td>
        <td><img src="../images/jpg/canvas/bRight.jpg" width="18" height="27"></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="34" align="center" valign="bottom" background="../images/jpg/canvas/ftrBack.jpg"><a href="http://www.9thelevation.com" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image20','','../images/jpg/canvas/9up.jpg',1)"><img src="../images/jpg/canvas/9.jpg" alt="a 9th Elevation Company" name="Image20" width="157" height="34" border="0"></a></td>
  </tr>
</table>
</body>
</html>
