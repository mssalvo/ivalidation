/**
 * @author Salvatore Mariniello
 * https://github.com/mssalvo/ivalidation
 */


template.base = {

    ischar : function(event) {
        event = event || window.event;
        var options = {
            defaultChar : "abcdefghijklmnopqrstuvwxyz'",
            chars : ""
        }
        
        if (event.type == "keypress") {

            keynum = null;
            if (window.event) {
                keynum = event.keyCode;
            } else if (event.which) {
                keynum = event.which;

            }
            
            keychar = String.fromCharCode(keynum);
            keychar = keychar.toLowerCase();
            if ((keynum == null) || (keynum == 0) || (keynum == 8) || (keynum == 9) || (keynum == 13) || (keynum == 27) || (keynum == 32))
                return true;
            else if ((options.defaultChar + options.chars).indexOf(keychar) > -1)
                return true;
            else if (window.event) {
                event.cancelBubble = true;
                window.event.returnValue = false;
                return false;
            } else {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }

        }
    },

    evidenzia : function(event) {
        var input = event.target || event.srcElement;
        if (event.type == "focus") {
            input.style.background = '#ff0000';
        }
        if (event.type == "blur") {
            input.style.background = '#fff';
        }
        return true;

    },

    message : function(event) {
        var input = event.target || event.srcElement;
        if (event.type == "focus") {
            input.style.background = '#996700';
        }
        if (event.type == "blur") {
            input.style.background = '#fff';
            alert(input.value);
        }
        if (event.type == "keypress") {

            alert(input.value);
        }

        return true;

    }
}

template.base2 = {

    evidenzia : function(event) {
        var input = event.target || event.srcElement;
        if (event.type == "focus") {
            input.style.background = '#ff0000';
        }
        if (event.type == "blur") {
            input.style.background = '#fff';
        }
        return true;

    }
}

