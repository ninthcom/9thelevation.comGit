<?
session_start();
require("../gbl.php");
?>
<link rel="stylesheet" type="text/css" href="../style.css">
<link rel="stylesheet" type="text/css" href="../_css/style_border_footer.css">
<?
if($session["orderid"] == 0){
echo("Your Shopping Cart is Empty");
exit();
}

	$SQLStmt = "SELECT * FROM item WHERE OrderidA = " . $session["orderid"] . ";";
	$conn = mysql_connect($host, $user, $password);
	$result = mysql_db_query($dbname, $SQLStmt, $conn);
	 
	//Initialize variables for this application
$thedate = date("Y-m-d");		//get the date
$thetime = date("g:i A");		//get the time

$subtotal = 0;				//the subtotal for a row of items
$subweight = 0;				//the subweight for a row of items
$subsize = 0;				//the subsize for a row of items
?>
<?
while($row = mysql_fetch_object($result)){
?>
  <?
//Calculate the individual totals for a row
$lineitemweight = ($row->Weight * $row->Quantity);
$subweight += $lineitemweight;
$subsize = $subsize + $row->Size;
$subtotal = (($row->Quantity) * ($row->Price));
$total = $subtotal;
//need to format the above into some kind of currency format
$grandtotal = $grandtotal + $subtotal;
?>
  <?
//end of while loop
}
?>
  <?
//do whole order discount here
if($TotalDiscount <> 0){
	if($grandtotal > $StartDiscount){
		$curgrandtotal = $grandtotal;
		$grandtotal = $grandtotal - ($grandtotal * ($TotalDiscount/100));
		$D2flag = 1;
	}
}
?>
  <?
//order button starts here
if($grandtotal > 0){
?>
  <?
//end of if statement if(grandtotal >0)
}
?>
<!-- Order Form-->
<table width="100%" border="0" cellpadding="0" cellspacing="0" class="fineprintTwo">
  <tr>
    <td><table border="0" cellpadding="0" cellspacing="2" width="100%">
        <tr> 
          <td width="20%" nowrap="nowrap"><form method="POST" name="date">
          Date:&nbsp; <? echo $thedate; ?>
          </form></td>
          <td width="20%" nowrap="nowrap"><form method="POST" name="time">
          Time:&nbsp; <? echo $thetime; ?>
          </form></td>
          <td width="20%" nowrap="nowrap">Order ID:&nbsp; <? echo $session["orderid"]; ?>          </td>
        </tr>
        <tr>
          <td nowrap="nowrap"><form method="POST" name="grandweight" id="grandweight">
            Total Weight: <? echo $subweight; ?>lbs.            
          </form></td>
          <td nowrap="nowrap"><form method="POST" name="grandtotal" id="grandtotal">
            Shopping Cart Total: $ <? echo number_format($grandtotal,2); ?>            
          </form></td>
          <td nowrap="nowrap">&nbsp;</td>
        </tr>
      </table></td>
  </tr>
</table>
