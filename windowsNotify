/*
 * 浏览器桌面提醒插件
 */
(function ($) {

    var defaults = {
        icon: '',/*图标*/
        title: '',/*标题*/
        content: ''/*内容*/
    };

    function Notify(options) {
        $.extend(defaults, options);/*初始化配置*/
        if (window.webkitNotifications) {
            windowNotify_webkitNotifications();
        }
        else if (window.Notification) {
            windowNotify_Notification();
        }
    }

    function windowNotify_webkitNotifications() {
        if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
            var notify = window.webkitNotifications.createNotification(
                defaults.icon, defaults.title, defaults.content
            );
            notify.show();
        }
        else if (window.webkitNotifications) {
            window.webkitNotifications.requestPermission(windowNotifyWebkit);
        }
    }

    function windowNotify_Notification() {
        if (Notification.permission === "granted")  /*同意通知*/ {
            var notification = new Notification(defaults.title,
                {
                    body: defaults.content,
                    icon: defaults.icon
                });
        }
        else {
            Notification.requestPermission(function (permission) {
                // 如果用户同意，就可以向他们发送通知
                if (permission === "granted") {
                    var notification = new Notification(defaults.title,
                        {
                            body: defaults.content,
                            icon: defaults.icon
                        });
                }
            });
        }
    }

    $.extend({
        windowsNotify: Notify
    });

})(window.jQuery);
