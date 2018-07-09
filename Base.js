var gLoad;//Ajax loading层
ajaxInit();

$(document).ready(function () {
    $('.select2').select2({
        language: "zh-CN",
        allowClear: false
    });
});

//ajax初始化处理
function ajaxInit() {
    $.ajaxSetup({
        cache: false
    });

    $(document).ajaxStart(function () {
        gLoad = layer.load(0, { /*shade: [0.5, '#393D49'],*/ time: 10 * 1000 });
    });

    $(document).ajaxStop(function () {
        layer.close(gLoad);
    });

    /*统一异常处理*/
    $(document).ajaxError(function (event, request, settings) {
        if (request && request.responseText) {
            //console.log(request.responseText);
        }
    });
}

// 基于window.onerror 收集前端错误信息
window.onerror = function (message, url, line) {
    if (!url) return;

    var msg = {
        ua: window.navigator.userAgent,
        message: message,
        url: url,
        line: line,
        page: window.location.href
    };

    new Image().src = '/Home/UiErrorLog?error=' + encodeURIComponent(JSON.stringify(msg)) + '&t=' + Math.random();
};

//js将表单序列化成对象
$.fn.serializeObject = function () {
    var $els = $(this).find("[name]");
    var formData = {};
    var len = $els.length;
    for (var i = 0; i < len; i++) {
        var $item = $($els[i]);
        var name = $item.attr("name");
        var type = $item.attr("type");
        if (type == "checkbox") {
            formData[name] = $item.is(':checked');
        }
        else {
            formData[name] = $item.val();
        }
    }
    return formData;
};

$.fn.clear = function () {
    this.find("input").val("");
}

/*根据name给子元素的Text赋值*/
$.fn.SetChildsText = function (model) {
    var el = this.find("[name]");
    var elCount = el.length;
    if (elCount > 0) {
        for (var i = 0; i < elCount; i++) {
            $itemEl = $(el[i]);
            var name = $itemEl.attr("name");
            var formatterFun = $itemEl.attr("data-formatter");
            var value = model[name];
            if (value != null) {
                if (typeof (window[formatterFun]) == "function") {
                    value = window[formatterFun](value);
                }
                $itemEl.text(value);
            }
            else {
                $itemEl.text("");
            }
        }
    }
};

/*获取查询参数*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*附加查询参数到Table查询参数去*/
function AddQueryFormParam(params) {
    var formData = $("#queryForm").serializeObject();
    for (var key in formData) {
        params[key] = formData[key];
    }
    return params;
}

/**
 * 绑定下拉框
 * @param {any} selId:下拉框Id
 * @param {any} url
 * @param {any} idField
 * @param {any} valueField
 * @param {any} initValue:初始值
 */
function BindSelect(selId, url, idField, valueField, initValue) {
    $.get(url, function (data) {
        var len = data.length;
        var selItems = [];
        for (var i = 0; i < len; i++) {
            selItems.push('<option value="' + data[i][idField] + '">' + data[i][valueField] + '</option>');
        }
        $("#" + selId).append(selItems);
        if (initValue) {
            $("#" + selId).val(initValue);
        }
    });
}

function OpenIframePage(url, title, afterCloseFun, width, heigth,isMax) {
    var initWidth = "450px";
    var initHeigth = "450px";
    if (width) {
        initWidth = width;
    }
    if (heigth) {
        initHeigth = heigth;
    }
    var index = layer.open({
        id: "detailWin",
        title: title,
        type: 2,
        area: [initWidth, initHeigth],
        fixed: false, //不固定
        maxmin: true,
        content: url,
        scrollbar: false,
        closeBtn: 1,
        end: function () {
            if (afterCloseFun) {
                afterCloseFun();
            }
        }
    });

    if (isMax) {
        layer.full(index);
    }
}

/*表单赋值*/
function FormLoad(formId, data) {
    var $form = $("#" + formId);
    $.each(data, function (name, ival) {
        var $oinput = $form.find("input[name=" + name + "]");
        if ($oinput.attr("type") == "radio" || $oinput.attr("type") == "checkbox") {
            $oinput.each(function () {
                if (Object.prototype.toString.apply(ival) == '[object Array]') {// 是复选框，并且是数组
                    for (var i = 0; i < ival.length; i++) {
                        if ($(this).val() == ival[i])
                            $(this).attr("checked", "checked");
                    }
                } else {
                    if (ival == true) {
                        $(this).attr("checked", "checked");
                    }
                    else {
                        $(this).attr("checked", false);
                    }
                }
            });
        } else if ($oinput.attr("type") == "textarea") {// 多行文本框
            $form.find("[name=" + name + "]").html(ival);
        } else {
            $form.find("[name=" + name + "]").val(ival);
        }
    });
}

/*是否是PC浏览器*/
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/");
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
        else {
            return null;
        }
    }
    return null;
}

//清除所有cookie函数  
function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}  

/*生成随机字符串*/
function CreateRandomStr() {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var random = "";
    for (var i = 0; i < 10; i++) {
        var id = Math.ceil(Math.random() * 35);
        random += chars[id];
    }
    return random;
}


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
