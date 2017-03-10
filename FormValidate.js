
/*----------------------------------------
# FormValidate
基于Bootstrap表单验证

2016年10月26日 16:35:23 
修正验证错误信息提示
----------------------------------------*/
(function ($) {

    var FormValidate = function (form, options) {
        if (typeof (options) == 'undefined') {
            options = {};
        }
        var opts = $.extend({}, defaluts, options);
        FormValidate.isVailSuc = this.vali(form, opts);
    }


    FormValidate.prototype = {
        vali: function (form, opts) {
            $(form).on("change", "[data-valiType]", function (e) {
                ClearErrorInfo(this);
            });
            var $waitVailElem = $(form).find("[data-valiType]");
            var IsVailSuccess = true;
            var vailElemLength = $waitVailElem.length;
            for (var i = 0; i < vailElemLength; i++) {
                var valiType = $($waitVailElem[i]).attr("data-valiType");
                var valiTypeArray = [];
                if (valiType.indexOf(",") != -1) {
                    valiTypeArray = valiType.split(",");
                }
                else {
                    valiTypeArray.push(valiType);
                }

                for (var j = 0; j < valiTypeArray.length; j++) {
                    if (this.methods.hasOwnProperty(valiTypeArray[j])) {
                        var valiResult = this.methods[valiTypeArray[j]]($waitVailElem[i]);
                        if (valiResult === false) {
                            IsVailSuccess = valiResult;
                            var errorInfo = CreateErrorInfo($waitVailElem[i], valiTypeArray[j], opts);
                            AddErrorInfo($waitVailElem[i], errorInfo);
                            break;
                        }
                    }
                }
            }
            $("[data-toggle='tooltip']").tooltip();
            $("[data-toggle='tooltip']").removeAttr("title");
            $("[data-toggle='tooltip']").tooltip('show');
            return IsVailSuccess;
        },
        methods: {
            required: function (element) {
                var value = $.trim($(element).val());
                if (value == null || value == "") {
                    return false;
                }
            },
            email: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    return re.test(value);
                }
            },
            url: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
                    return re.test(value);
                }
            },
            date: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
                    return re.test(value);
                }
            },
            number: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
                    return re.test(value);
                }
            },
            digits: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^\d+$/;
                    return re.test(value);
                }
            },
            pdigits: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^[1-9]\d*$/;
                    return re.test(value);
                }
            },
            mdigits: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^-[1-9]\d*$/;
                    return re.test(value);
                }
            },
            pdigitszero: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^\d+$/;
                    return re.test(value);
                }
            },
            mdigitszero: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^((-\d+)|(0+))$/;
                    return re.test(value);
                }
            },
            extension: function (element) {
                var $ele = $(element);
                var value = $ele.val();
                if (value != null && value != "") {
                    var extenAttr = $ele.attr("data-extension");
                    if (typeof (extenAttr) != 'undefined') {
                        var re = extenAttr + "$";
                        return re.test(value);
                    }
                }
            },
            maxlength: function (element) {
                var $ele = $(element);
                var value = $ele.val();
                if (value != null && value != "") {
                    var length = value.length;
                    var maxlength = $ele.attr("data-maxlength");
                    if (typeof (maxlength) != 'undefined') {
                        return length <= parseInt(maxlength);
                    }
                }
            },
            minlength: function (element) {
                var $ele = $(element);
                var value = $ele.val();
                if (value != null && value != "") {
                    var length = value.length;
                    var minlength = $ele.attr("data-minlength");
                    if (typeof (minlength) != 'undefined') {
                        return length >= parseInt(minlength);
                    }
                }
            },
            length: function (element) {
                var $ele = $(element);
                var value = $ele.val();
                if (value != null && value != "") {
                    var length = value.length;
                    var fixedlength = $ele.attr("data-length");
                    return length === parseInt(fixedlength);
                }
            },
            rangelength: function (element) {
                var $ele = $(element);
                var value = $ele.val();
                if (value != null && value != "") {
                    var length = value.length;
                    var range = $ele.attr("data-rangelength");
                    var rangeLengthArray = range.split(",");
                    if (typeof (minlength) != 'undefined') {
                        return length >= parseInt(rangeLengthArray[0]) && length <= parseInt(rangeLengthArray[1]);
                    }
                }
            },
            range: function (element) {
                var $ele = $(element);
                var value = $ele.val();
                if (value != null && value != "") {
                    var range = $ele.attr("data-range");
                    var rangeArray = range.split(",");
                    if (typeof (minlength) != 'undefined') {
                        return value >= parseInt(rangeArray[0]) && value <= parseInt(rangeArray[1]);
                    }
                }
            },
            max: function (element) {
                var $ele = $(element);
                var value = $ele.val();
                if (value != null && value != "") {
                    var max = $ele.attr("data-max");
                    if (typeof (max) != 'undefined') {
                        return value <= parseInt(max);
                    }
                }
            },
            min: function (element) {
                var $ele = $(element);
                var value = $ele.val();
                if (value != null && value != "") {
                    var min = $ele.attr("data-min");
                    if (typeof (min) != 'undefined') {
                        return value >= parseInt(min);
                    }
                }
            },
            mobile: function (element) {
                var value = $(element).val();
                if (value != null && value != "") {
                    var re = /^1\d{10}$/;
                    return re.test(value);
                }
            },
        }
    };

    function ClearErrorInfo(element) {
        var $el = $(element);
        if ($el.hasClass("valierror")) {
            if (element.nodeName == "SELECT" && $el.next('span.select2').length > 0) {
                var $select2selectionSpan = $el.next('span.select2').find(".select2-selection");
                $select2selectionSpan.removeClass("valierror")
                .removeAttr("data-html")
                .removeAttr("data-toggle")
                .removeAttr("data-placement")
                .removeAttr("title");
                $select2selectionSpan.tooltip('destroy');
            }
            $(element).removeClass("valierror")
                .removeAttr("data-html")
                .removeAttr("data-toggle")
                .removeAttr("data-placement")
                .removeAttr("title")
            ;
            $(element).tooltip('destroy');
        }
    }

    function AddErrorInfo(element, errorInfo) {
        var $el = $(element);

        var htmlError = '<span class="label label-danger">' + errorInfo + '</span>';
        if (element.nodeName == "SELECT" && $el.next('span.select2').length > 0) {
            var $select2selectionSpan = $el.next('span.select2').find(".select2-selection");
            $select2selectionSpan.attr("data-valiType", "").addClass("valierror")
            .attr("data-html", true)
            .attr("data-toggle", "tooltip")
            .attr("data-placement", "bottom")
            .attr("title", htmlError);;
        }
        $el
            .addClass("valierror")
            .attr("data-html", true)
            .attr("data-toggle", "tooltip")
            .attr("data-placement", "bottom")
            .attr("title", htmlError);
    }

    function CreateErrorInfo(element, vailType, opts) {
        var $el = $(element);
        var errorInfo = opts[vailType]
        switch (vailType) {
            case "maxlength":
                errorInfo = format(errorInfo, $el.attr("data-maxlength"));
                break;
            case "minlength":
                errorInfo = format(errorInfo, $el.attr("data-minlength"));
                break;
            case "length":
                errorInfo = format(errorInfo, $el.attr("data-length"));
                break;
            case "rangelength":
                var range = $el.attr("data-rangelength");
                var rangeLengthArray = range.split(",");
                errorInfo = format(errorInfo, rangeLengthArray[0], rangeLengthArray[1]);
                break;
            case "range":
                var range = $el.attr("data-range");
                var rangeArray = range.split(",");
                errorInfo = format(errorInfo, rangeArray[0], rangeArray[1]);
                break;
            case "max":
                errorInfo = format(errorInfo, $el.attr("data-max"));
                break;
            case "min":
                errorInfo = format(errorInfo, $el.attr("data-min"));
                break;
        }
        return errorInfo;
    }

    function format(source, params) {
        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            };
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return n;
            });
        });
        return source;
    }

    //默认参数
    var defaluts = {
        required: "这是必填字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        pdigits: "只能输入正整数",
        mdigits: "只能输入负整数",
        pdigitszero: "只能输入正整数(包含0)",
        mdigitszero: "只能输入负整数(包含0)",
        extension: "请输入有效的后缀",
        maxlength: "最多可以输入 {0} 个字符",
        minlength: "最少要输入 {0} 个字符",
        length: "只能输入 {0} 个字符",
        rangelength: "请输入长度在 {0} 到 {1} 之间的字符串",
        range: "请输入范围在 {0} 到 {1} 之间的数值",
        max: "请输入不大于 {0} 的数值",
        min: "请输入不小于 {0} 的数值",
        mobile: "请输入手机号码"
    };

    $.fn.FormValidate = function (options) {
        if (typeof (options) == 'undefined') {
            options = {};
        }
        var formVail = new FormValidate(this, options);
        return FormValidate.isVailSuc;
    }

})(window.jQuery);
