/**
 * @author Salvatore Mariniello
 * https://github.com/mssalvo/ivalidation
 */



function ValidationProo() {
}

function Template() {
}

var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype, push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
var __d = document, validation = ValidationProo.prototype, template = Template.prototype, isIE = (navigator.userAgent.indexOf('MSIE') != -1), s_ = search = function(e) {
    return __d.getElementsByTagName(e)
};

String.prototype.trim = function() {
    var trimmed = this.replace(/^\s+|\s+$/g, '');
    return trimmed;
};

String.prototype.Obj = function() {
    var d = this;
    if (d.indexOf('{') < 0) {
        d = "{" + d + "}";
    }
    d = eval('(' + d + ')');
    return d;
};

var msieversion = function() {
    var ua = window.navigator.userAgent
    var msie = ua.indexOf("MSIE")

    if (msie > 0)
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))
    else
        return 0;
}

var ie6 = function() {
    if (msieversion() > 0 && msieversion() < 8) {
        return true;
    } else
        return false;
}

var position=function(elm) {
        if (!elm)return { x : 0,y : 0};if (elm.scrollLeft) return { x : elm.scrollLeft, y : elm.scrollTop};else if (elm.clientX)return { x : elm.clientX,y : elm.clientY };var posObj = {'x' : elm.offsetLeft,'y' : elm.offsetTop};if (elm.offsetParent) { var next = elm.offsetParent; while (next) { posObj.x += next.offsetLeft; posObj.y += next.offsetTop; next = next.offsetParent;}}
        return posObj;
        }

validation.bind = function(e, t) {
    if (e.bind === nativeBind && nativeBind)

        return nativeBind.apply(e, slice.call(arguments, 1));

    var n = slice.call(arguments, 1);

    return function() {
        return e.apply(t, n.concat(slice.call(arguments)))
    }
};

validation.compareFile = function(e, t) {
    var n = t == "js" ? "script" : t == "css" ? "link" : "none";
    var r = t == "js" ? "src" : t == "css" ? "href" : "none";
    var i = s_(n);
    if(e.length>5)
    e = e.substring(2, e.length - 1);
    for (var s = i.length; s >= 0; s--) {
        if (i[s] && i[s].getAttribute(r) != null && i[s].getAttribute(r).indexOf(e) != -1) {
           // i[s].parentNode.removeChild(i[s])
            return true;
        }
    }
    return false;
};

validation.load = function(e, t) {
        var fn = validation.isUndefined(t) ? function() {return false} : validation.isFunction(t) ? t : function() {return false};
       var script = __d.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    fn()
                }
            }
        } else {
            script.onload = function() {
                fn()
            }
        }
        script.src = e;     
        return __d.getElementsByTagName("head") ? __d.getElementsByTagName("head")[0].appendChild(script) : __d.getElementsByTagName("body")[0].appendChild(script)
};


validation._import=function(a,b){
    var b_bol=validation.compareFile(a,"js");
    if(b_bol){
        b()
    }else{
        validation.load(a,b);
    }
    
};


validation.event = function(e, t, n, r) {
    if (__d.attachEvent) {
        n.attachEvent("on" + e, t)
    } else if (__d.addEventListener) {
        n.addEventListener(e, t, true)
    } else {
        n["on" + e] = t
    }
    return this
};

validation.nodeClass = function(e) {
    var t = [];
    var n = new RegExp("\\b" + e + "\\b");
    var r = s_("*");
    for (var i = 0; i < r.length; i++) {
        if (n.test(r[i].className))
            t.push({
                element : r[i],
                data : r[i].getAttribute("data") || "-"
            })
    }
    return t
};
validation.extend = function(e, t) {
    for (var n in t)
        e[n] = t[n];
    return e
};
validation.wrapper = function(e, t) {
    
    for (var n in e){
        if(validation.isUndefined(t[n])){
          t[n]=e[n]; 
           
        }
    }
    
    return t;
};
validation.isFunction = function(e) {
    return typeof e == typeof Function
};
validation.isUndefined = function(e) {
    if (e == null) {
        return true;
    } else {
        return e ? typeof e == "undefined" : true
    }
};
validation.isArray = function(e) {
    return !!e && e.constructor == Array
};
validation.isObject = function(e) {
    return !!e && e.constructor === Object
};
validation.isString = function(e) {
    return typeof e == "string"
};


validation.style = function(el, strStyle) {

    var styleProName = function(name) {
        var ss = name.split("-");
        var StylePropName = "";
        for (var i = 0; i < ss.length; i++) {
            var chunk = ss[i].toLowerCase();
            if (i > 0) {
                var firstChar = chunk.charAt(0);
                var lastChars = chunk.substr(1);
                chunk = firstChar.toUpperCase() + lastChars.toLowerCase();
            }
            StylePropName += chunk;
        }
        return StylePropName;
    }
    var stylePairs = strStyle.split(";");
    for (var i = 0; i < stylePairs.length; i++) {
        var stylePair = stylePairs[i].split(":");
        var styleName = styleProName(stylePair[0])
        var styleValue = (stylePair[1]) ? stylePair[1] : "";

        el.style[styleName] = styleValue;
    }

};

template.include = function(e, t, n, r) {
    var i = t || [];
    var s = e || [];
    var o_ = arguments[4] || false;

    var u = this;
    for (var a in u) {
        for (var f in e) {
            if (a == e[f]) {
                if (validation.isObject(u[a])) {
                    h(i, u[a], n)
                } else {
                    for (var l in i)
                    if (a == i[l]) {
                        for (var c = 0; c < n.length; c++) {
                            if (o_)
                                validation.event(n[c], validation.bind(u[a], o_), r)
                            else
                                validation.event(n[c], validation.bind(u[a]), r)
                        }
                    }
                }
            }
        }
        var h = function(e, t, n) {
            for (var i in t) {
                if (validation.isObject(t[i])) {
                    arguments.callee(e, t[i], n)
                } else {
                    for (var s in e) {
                        if (i == e[s]) {
                            for (var o = 0; o < n.length; o++) {
                                if (o_)
                                    validation.event(n[o], validation.bind(t[i], o_), r)
                                else
                                    validation.event(n[o], validation.bind(t[i]), r)
                            }
                        }
                    }
                }
            }
        }
    }
};

//MS object param ob_
validation.form = function(e, ob_) {
   var oob_ ={};
    oob_= validation.wrapper(this.attachLabel, ob_||{});
    return validation.captured({
        nodeClass : e || 'valida',
        attach:[{fn:template.validateForm.fnsubmit,event:oob_['event']}]
    }, oob_ || false)
}
//MS object param ob_
validation.captured = function(e, ob_) {
    if (e && this.isString(e) && !this.isObject(e)) {
        this.capturedBase(e);
        return
    }
    //MS object param ob_
    if (e && this.isObject(e)) {
        this.attach(e, ob_ || false);
        return
    }
};

validation.capturedBase = function(e) {
    var t = [];
    t = this.nodeClass(e || "validate");
    var n = "";
    var r = [];
    var i = [];
    var s = {};
    var o = [];
    for (var u in t) {
        s = t[u].data.Obj();
        if(!this.isUndefined(s)){
            if (!this.isUndefined(s['template']))
                n = s['template'];
            if (!this.isUndefined(s['name']))
                r = s['name'].split(" ");
            if (!this.isUndefined(s['event']))
                i =s['event'].split(" ")
      
        template.include([n], r, i, t[u].element);
        r = [];
        n = "";
        i = []
        }
    }
};

validation.attachLabel = {
    showMessage : true,
    label : 'auto',
    fontSize : '10px',
    fontColor : 'red',
    background : '#FF6666',
    backgroundDef : '#FFFFFF',
    event : 'submit',
    callBack : null
}

validation.attachParam = {
    template : null,
    name : null,
    nodeClass : null,
    event : null,
    attach : [{
        fn : null,
        event : null
    }]
};
 
validation.attach = function(e, ob_) {
    var t = this.extend(this.attachParam, e);
     
    return this.dispatcher(t, ob_)
};
 
validation.dispatcher = function(e, ob_) {
    if (e.template && e.name && e.nodeClass && e.event) {
         
        this.exc(e, 1, ob_)
    }
    if (e.attach && this.isFunction(e.attach[0].fn) && !this.isUndefined(e.nodeClass) && this.isUndefined(e.template)) {
         
        this.exc(e, 0,ob_)
         
    }
};
 
validation.exc = function(e, t, ob_) {
    var n = [];
    var ob__ = this.isUndefined(ob_)?false:ob_
    n = this.nodeClass(e.nodeClass);
    var r = "";
    var i = [];
    var s = [];
    var o = [];
    var u = [];
    var a = false;
    if (t == 1) {
        if (e.attach && this.isFunction(e.attach[0].fn)) {
            a = true
        }
        for (var f in n) {
            r = e.template;
            i = e.name.split(" ");
            s = e.event.split(" ") || [];
             
            template.include([r], i, s, n[f].element, ob__);
            i = [];
            r = "";
            s = []
        }
        if (a) {
            a = false;
            this.dispatchAttach(n, e,ob__)
        }
    } else {
        a = false;
         
        this.dispatchAttach(n, e,ob__)
    }
};

validation.dispatchAttach = function(e, t,objc) {
    if (!this.isUndefined(e[0].element) && !this.isUndefined(t.attach[0].event)) {
        for (var n in e) {
            for (var r = 0; r < t.attach.length; r++) {
                var i = t.attach[r].event.split(" ") || [];
                for (var s = 0; s < i.length; s++) {
                    if(!objc)
                    this.event(i[s], this.bind(t.attach[r].fn), e[n].element)
                    else
                     
                     this.event(i[s], this.bind(t.attach[r].fn,objc), e[n].element)
                }
            }
        }
    }
}
