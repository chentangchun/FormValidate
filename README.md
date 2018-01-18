<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="url" content="http://www.cnblogs.com/tangchun/p/7845133.html"/>
<meta name="description" content="基于Bootstrap表单验证"/>
<meta name="author" content="LDH"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<title>【基于Bootstrap表单验证】</title>

<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">


<style type="text/css">
.valierror { border-color: red !important; }

.tooltip.right .tooltip-arrow { border-right-color: #d15b47; }

.tooltip-inner { background-color: #d15b47; }
</style>
</head>
<body>

<form id="form">
<div style="width: 200px;">
<input type="text" class="form-control" name="Phone" data-valitype="required"/>
<input type="text" class="form-control" name="Name" data-valitype="required" />
</div>
</form>

<!--JS-->
<script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="js/FormValidate.js"></script>
<script type="text/javascript">
//
$(function() {
    var $form = $("#form");
    var isVali = $form.FormValidate();
    alert(isVali);
});
</script>
</body>
</html>
