/**
 * @author Salvatore Mariniello
 * https://github.com/mssalvo/ivalidation
 */


template.validateForm = {

    fnsubmit : function(e) {
        var o_=this;
        o_=validation.wrapper(validation.attachLabel, o_||{}); 
        var lts_error = [];
        var positionMsg = "auto";
        
        var tg = e.target || e.srcElement;
        var f=tg;
      
        if(f.nodeName!='FORM'){
            f=tg.form;
           
        }
        
        var s = true;
        for (var i = 0; i < f.elements.length; i++) {

            var element_ = f.elements[i];
            lts_error = template.validateForm.checkElement(element_, lts_error,o_);

        }

        if (lts_error.length > 0) {  
            template.validateForm.cancelPropagation(e);
           if(validation.isFunction(o_['callBack'])){
                 positionMsg = o_['label'] || 'auto';
                template.validateForm.responsMessage(positionMsg, lts_error,o_,f);
                 template.validateForm.useOnCallBack(lts_error,o_,f);
                return false;
            } 
             else {
                 positionMsg = o_['label'] || 'auto';
                template.validateForm.responsMessage(positionMsg, lts_error,o_,f);
                 return false;
           }
            
        }
            if(validation.isFunction(o_['callBack'])){
              template.validateForm.useOnCallBack(lts_error,o_,f);  
            }

        return true;
    },

    regexType : function(r) {
        switch(r) {
            case 'number':
                // solo numeri e segno (.) 
                return new RegExp(/^([0-9\.])+$/);

            case 'alfa':
                //caratteri, lettere accentate apostrofo e spazio fra le parole
                return new RegExp(/^([a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27]\s?)+$/);

            case 'alfa-num':
                // caratteri, lettere, numeri, accentate apostrofo e spazio e segni ' . ,
                return new RegExp(/^[a-zA-Z0-9\xE0\xE8\xE9\xF9\xF2\xEC\x27\.\,\ ']+$/);

            case 'email':
                //E-mail    
                return new RegExp(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
            
            case 'data':
                //Data  3 formati / - .
                return new RegExp(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[-/.](19|20)\d\d/);
            
            case 'cap':
            // C.A.P.   5 numeri
                return new RegExp(/^\d{5}$/);
            
            case 'password':
                //Password  min 6, max 12 di caratteri, numeri, _ * – + ! ? , : ; . e lettere accentate 
                return new RegExp(/^[a-zA-Z0-9\_\*\-\+\!\?\,\:\;\.\xE0\xE8\xE9\xF9\xF2\xEC\x27]{6,12}/);
            
            case 'codfiscale':
                //Codice fiscale    vedi regole su Wikipedia 
                return new RegExp(/^[a-zA-Z]{6}\d\d[a-zA-Z]\d\d[a-zA-Z]\d\d\d[a-zA-Z]/);
            
            case 'descritto':
            
                return new RegExp(/^([a-zA-Z0-9\xE0\xE8\xE9\xF9\xF2\xEC\x27\.\,\:\;\!\-\+\*\_\?\€\£\$\%\&\=\@\)\(\ '])+$/);
            
            default :
                // quasi tutto
               return new RegExp(/^([a-zA-Z0-9\.\,\%\£\/\(\)\?\!\"\$\xE0\xE8\xE9\xF9\xF2\xEC\x27\@\#\-\_\+\*\&\%\=\€\§\{\}\[\]\ '])+$/);
        }
    },


    clearLab:function(ob_,f){
       var labs=f.getElementsByTagName('DIV'); 
       if(!validation.isUndefined(labs) && labs.length>0){
           for(var j=0;j<labs.length;j++){
          if(!validation.isUndefined(labs[j]) && labs[j].className=="lab_validz_js"){
           try{
               labs[j].innerHTML="";
       
           }catch(e){}
           }
           }
            
             
       }
        
    },


    createMessage : function(obj, lts,ob_,f) {
        if (obj.position != '') {
            for (var l in lts) {
                if(ob_['showMessage']==true ||ob_['showMessage']=='true'){
                var div = __d.createElement('DIV');
                div.className="lab_validz_js";
                validation.style(div, obj.style(lts[l].node));
                div.innerHTML = " * " + lts[l].message+" ";
                //lts[l].node.parentElement.appendChild(div);
                f.appendChild(div);
                }
                if(ob_['background']!='false'){
                backg="background:"+ob_['background'] || '#FF6666'
                validation.style(lts[l].node, backg);
                }
               
              
            }
        }

    },
    // passa alla funzione la lista di elementi processati non validi, con relativa descrizione di errore
    // es: lts[0].node <elemento> lts[0].message <descrizione errore>
    useOnCallBack:function(lts,ob_,f){
        if(validation.isFunction(ob_['callBack']))
            ob_['callBack'](lts,f);
    },
    
    responsMessage : function(r, lts,ob_,f) {
       template.validateForm.clearLab(ob_,f);
        var obj = {
            position : 'auto',
            style : function() {
            },
            font : 'font-size:'+ob_['fontSize']+";" ||'9px;',
            color :'color:'+ ob_['fontColor'] ||'red'
        };
        if(r!=null && r!="")
        switch(r) {
            case 'left':

                obj.position = 'left';
                obj.style = function(el) {
                     var pos=position(el);
                    return "position:absolute;text-align:right;top:" + pos.y  + "px;left:" + (pos.x-(el.clientWidth+5))  + "px;width:"+el.clientWidth+"px;"+obj.font+obj.color;
                }

                template.validateForm.createMessage(obj, lts,ob_,f);
                break;

            case 'right':
                obj.position = 'right';
                obj.style = function(el) {
                     var pos=position(el);
                    return "position:absolute;height:20px;top:" + (pos.y) + "px;left:" + (pos.x + (el.clientWidth+5)) + "px;"+obj.font+obj.color;
                }
                template.validateForm.createMessage(obj, lts,ob_,f);
                break;

            case 'auto':
                var pos=position(f);
               if(ob_['showMessage']==true ||ob_['showMessage']=='true'){
                var div = __d.createElement('DIV');
                div.className="lab_validz_js";
                validation.style(div, 'position:absolute;height:50px;'+"top:" + ((pos.y) + (f.offsetHeight + 20)) + "px;left:" + (pos.x + 10) + "px;"+obj.font+obj.color);
     
                var msg_ = "";
                for (var i in lts) {
                    msg_ += "* " + lts[i].message + "<br>";
                }

                div.innerHTML = msg_;
                f.appendChild(div);
                }
                
                if(ob_['background']!='false'){
                for (var k in lts) {
                    validation.style(lts[k].node, 'background:'+ob_['background']||'#FF6666');
 
                }
                }
                                
                break;

            case 'top':
                obj.position = 'top';
                obj.style = function(el) {
                  var pos=position(el);
                    return "position:absolute;height:20px;top:" + (pos.y-(el.clientHeight/1.9))  + "px;left:" + (pos.x  + 4) + "px;"+obj.font+obj.color;
                }
                template.validateForm.createMessage(obj, lts,ob_,f);
                break;

            case 'bottom':
                obj.position = 'bottom';
                obj.style = function(el) {
                    var pos=position(el);
                    return "position:absolute;height:20px;top:" + (pos.y+(el.clientHeight+4))  + "px;left:" + (pos.x + 4) + "px;"+obj.font+obj.color;
                }
                template.validateForm.createMessage(obj, lts,ob_,f);

                break;
            
        }
    },

    checkElement : function(element, lts_error,ob_) {

        var checkRegex = function(element, value, lts_error,ob_) {
            
            var attr = element.attributes;
            var pst_ = "F";
            value=value.trim();
            
            for (var at in attr) {
               
                if (attr[at] == '[object Attr]' || attr[at] == '[object]') {
                    ar = attr[at];

                  

                    var nodName = ar['nodeName'] || "", values = ar['nodeValue'] || "";

                    if (nodName == 'valid') {
                        data = values;
                        
                        var msg = "";
                        d = data.Obj();
                        var reg = null;
                            if (d['type'] != null)
                                t = d['type']
                                
                            reg = template.validateForm.regexType(t);

                            if (d['message'] != null)
                                msg = d['message'] ;
                            
                            if (!reg.test(value)) {
                            lts_error.push({
                                node : element,
                                message : msg || ""
                                
                            })

                        }else{
                           var backgroun="background:"+ob_['backgroundDef'] || '#FFFFFF'
                           validation.style(element, backgroun);    
                        }
                            
                    }

                }
            }

        }
        if (element != null || element != undefined) {

            var elemType = element.type.toUpperCase();
             
            if (elemType && elemType != "HIDDEN") {
               
                if (elemType == "TEXT" || elemType == "TEXTAREA" || elemType == "PASSWORD" || elemType == "FILE")
                    checkRegex(element, element.value, lts_error,ob_);
                else if (elemType == "CHECKBOX" && element.checked)
                    checkRegex(element, element.value ? element.value : "On", lts_error,ob_);
                else if (elemType == "RADIO" && element.checked)
                    checkRegex(element, element.value, lts_error,ob_);
                else if (elemType.indexOf("SELECT") != -1)
                    for (var j = 0; j < element.options.length; j++) {
                        var option = element.options[j];
                        if (option.selected)
                            checkRegex(element, option.value ? option.value : option.text, lts_error,ob_);
                    }
            }

        }

        return lts_error;
    },

    cancelPropagation : function(e) {

        if (__d.addEventListener) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        } else {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
            return false;

        }

    }
}



