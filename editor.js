/*
    Modified editor.js
    Normally this is included by wordpress admin.
    This overrights that class.
*/

var switchEditors = {
    switchto: function(b) {
        if (b.id == 'content-html') {

            jQuery('#wpl_ace_editor').trigger('html');
        }
        else {
            jQuery('#wpl_ace_editor').trigger('wysiwyg');
        }



        var c = b.id,
            a = c.length,
            e = c.substr(0, a - 5),
            d = c.substr(a - 4);
        this.go(e, d)
    },
    go: function(g, f) {
        g = g || "content";
        f = f || "toggle";
        var c = this,
            b = tinyMCE.get(g),
            a, d, e = tinymce.DOM;
        a = "wp-" + g + "-wrap";
        d = e.get(g);
        if ("toggle" == f) {
            if (b && !b.isHidden()) {
                f = "html"
            }
            else {
                f = "tmce"
            }
        }
        if ("tmce" == f || "tinymce" == f) {
            if (b && !b.isHidden()) {
                return false
            }
            if (typeof(QTags) != "undefined") {
                QTags.closeAllTags(g)
            }
            if (tinyMCEPreInit.mceInit[g] && tinyMCEPreInit.mceInit[g].wpautop) {
                d.value = c.wpautop(d.value)
            }
            if (b) {
                b.show()
            }
            else {
                b = new tinymce.Editor(g, tinyMCEPreInit.mceInit[g]);
                b.render()
            }
            e.removeClass(a, "html-active");
            e.addClass(a, "tmce-active");
            setUserSetting("editor", "tinymce")
        }
        else {
            if ("html" == f) {
                if (b && b.isHidden()) {
                    return false
                }
                if (b) {
                    d.style.height = b.getContentAreaContainer().offsetHeight + 20 + "px";
                    b.hide()
                }
                e.removeClass(a, "tmce-active");
                e.addClass(a, "html-active");
                setUserSetting("editor", "html")
            }
        }
        return false
    },
    _wp_Nop: function(c) {
        var d, b, e = false,
            a = false;
        if (c.indexOf("<pre") != -1 || c.indexOf("<script") != -1) {
            e = true;
            c = c.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g, function(f) {
                f = f.replace(/<br ?\/?>(\r\n|\n)?/g, "<wp-temp-lb>");
                return f.replace(/<\/?p( [^>]*)?>(\r\n|\n)?/g, "<wp-temp-lb>")
            })
        }
        if (c.indexOf("[caption") != -1) {
            a = true;
            c = c.replace(/\[caption[\s\S]+?\[\/caption\]/g, function(f) {
                return f.replace(/<br([^>]*)>/g, "<wp-temp-br$1>").replace(/[\r\n\t]+/, "")
            })
        }
        d = "blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|div|h[1-6]|p|fieldset";
        c = c.replace(new RegExp("\\s*</(" + d + ")>\\s*", "g"), "</$1>\n");
        c = c.replace(new RegExp("\\s*<((?:" + d + ")(?: [^>]*)?)>", "g"), "\n<$1>");
        c = c.replace(/(<p [^>]+>.*?)<\/p>/g, "$1</p#>");
        c = c.replace(/<div( [^>]*)?>\s*<p>/gi, "<div$1>\n\n");
        c = c.replace(/\s*<p>/gi, "");
        c = c.replace(/\s*<\/p>\s*/gi, "\n\n");
        c = c.replace(/\n[\s\u00a0]+\n/g, "\n\n");
        c = c.replace(/\s*<br ?\/?>\s*/gi, "\n");
        c = c.replace(/\s*<div/g, "\n<div");
        c = c.replace(/<\/div>\s*/g, "</div>\n");
        c = c.replace(/\s*\[caption([^\[]+)\[\/caption\]\s*/gi, "\n\n[caption$1[/caption]\n\n");
        c = c.replace(/caption\]\n\n+\[caption/g, "caption]\n\n[caption");
        b = "blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|h[1-6]|pre|fieldset";
        c = c.replace(new RegExp("\\s*<((?:" + b + ")(?: [^>]*)?)\\s*>", "g"), "\n<$1>");
        c = c.replace(new RegExp("\\s*</(" + b + ")>\\s*", "g"), "</$1>\n");
        c = c.replace(/<li([^>]*)>/g, "\t<li$1>");
        if (c.indexOf("<hr") != -1) {
            c = c.replace(/\s*<hr( [^>]*)?>\s*/g, "\n\n<hr$1>\n\n")
        }
        if (c.indexOf("<object") != -1) {
            c = c.replace(/<object[\s\S]+?<\/object>/g, function(f) {
                return f.replace(/[\r\n]+/g, "")
            })
        }
        c = c.replace(/<\/p#>/g, "</p>\n");
        c = c.replace(/\s*(<p [^>]+>[\s\S]*?<\/p>)/g, "\n$1");
        c = c.replace(/^\s+/, "");
        c = c.replace(/[\s\u00a0]+$/, "");
        if (e) {
            c = c.replace(/<wp-temp-lb>/g, "\n")
        }
        if (a) {
            c = c.replace(/<wp-temp-br([^>]*)>/g, "<br$1>")
        }
        return c
    },
    _wp_Autop: function(a) {
        var c = false,
            b = false,
            d = "table|thead|tfoot|tbody|tr|td|th|caption|col|colgroup|div|dl|dd|dt|ul|ol|li|pre|select|form|blockquote|address|math|p|h[1-6]|fieldset|legend|hr|noscript|menu|samp|header|footer|article|section|hgroup|nav|aside|details|summary";
        if (a.indexOf("<object") != -1) {
            a = a.replace(/<object[\s\S]+?<\/object>/g, function(e) {
                return e.replace(/[\r\n]+/g, "")
            })
        }
        a = a.replace(/<[^<>]+>/g, function(e) {
            return e.replace(/[\r\n]+/g, " ")
        });
        if (a.indexOf("<pre") != -1 || a.indexOf("<script") != -1) {
            c = true;
            a = a.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g, function(e) {
                return e.replace(/(\r\n|\n)/g, "<wp-temp-lb>")
            })
        }
        if (a.indexOf("[caption") != -1) {
            b = true;
            a = a.replace(/\[caption[\s\S]+?\[\/caption\]/g, function(e) {
                e = e.replace(/<br([^>]*)>/g, "<wp-temp-br$1>");
                e = e.replace(/<[a-zA-Z0-9]+( [^<>]+)?>/g, function(f) {
                    return f.replace(/[\r\n\t]+/, " ")
                });
                return e.replace(/\s*\n\s*/g, "<wp-temp-br />")
            })
        }
        a = a + "\n\n";
        a = a.replace(/<br \/>\s*<br \/>/gi, "\n\n");
        a = a.replace(new RegExp("(<(?:" + d + ")(?: [^>]*)?>)", "gi"), "\n$1");
        a = a.replace(new RegExp("(</(?:" + d + ")>)", "gi"), "$1\n\n");
        a = a.replace(/<hr( [^>]*)?>/gi, "<hr$1>\n\n");
        a = a.replace(/\r\n|\r/g, "\n");
        a = a.replace(/\n\s*\n+/g, "\n\n");
        a = a.replace(/([\s\S]+?)\n\n/g, "<p>$1</p>\n");
        a = a.replace(/<p>\s*?<\/p>/gi, "");
        a = a.replace(new RegExp("<p>\\s*(</?(?:" + d + ")(?: [^>]*)?>)\\s*</p>", "gi"), "$1");
        a = a.replace(/<p>(<li.+?)<\/p>/gi, "$1");
        a = a.replace(/<p>\s*<blockquote([^>]*)>/gi, "<blockquote$1><p>");
        a = a.replace(/<\/blockquote>\s*<\/p>/gi, "</p></blockquote>");
        a = a.replace(new RegExp("<p>\\s*(</?(?:" + d + ")(?: [^>]*)?>)", "gi"), "$1");
        a = a.replace(new RegExp("(</?(?:" + d + ")(?: [^>]*)?>)\\s*</p>", "gi"), "$1");
        a = a.replace(/\s*\n/gi, "<br />\n");
        a = a.replace(new RegExp("(</?(?:" + d + ")[^>]*>)\\s*<br />", "gi"), "$1");
        a = a.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)>)/gi, "$1");
        a = a.replace(/(?:<p>|<br ?\/?>)*\s*\[caption([^\[]+)\[\/caption\]\s*(?:<\/p>|<br ?\/?>)*/gi, "[caption$1[/caption]");
        a = a.replace(/(<(?:div|th|td|form|fieldset|dd)[^>]*>)(.*?)<\/p>/g, function(f, e, g) {
            if (g.match(/<p( [^>]*)?>/)) {
                return f
            }
            return e + "<p>" + g + "</p>"
        });
        if (c) {
            a = a.replace(/<wp-temp-lb>/g, "\n")
        }
        if (b) {
            a = a.replace(/<wp-temp-br([^>]*)>/g, "<br$1>")
        }
        return a
    },
    pre_wpautop: function(b) {
        var a = this,
            d = {
                o: a,
                data: b,
                unfiltered: b
            }, c = typeof(jQuery) != "undefined";
        if (c) {
            jQuery("body").trigger("beforePreWpautop", [d])
        }
        d.data = a._wp_Nop(d.data);
        if (c) {
            jQuery("body").trigger("afterPreWpautop", [d])
        }
        return d.data
    },
    wpautop: function(b) {
        var a = this,
            d = {
                o: a,
                data: b,
                unfiltered: b
            }, c = typeof(jQuery) != "undefined";
        if (c) {
            jQuery("body").trigger("beforeWpautop", [d])
        }
        d.data = a._wp_Autop(d.data);
        if (c) {
            jQuery("body").trigger("afterWpautop", [d])
        }
        return d.data
    }
};