/*
 * Minimal classList shim for IE 9
 * By Devon Govett
 * MIT LICENSE
 */


if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }

            var ret = {                    
                add: update(function(classes, index, value) {
                    ~index || classes.push(value);
                }),

                remove: update(function(classes, index) {
                    ~index && classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                    ~index ? classes.splice(index, 1) : classes.push(value);
                }),

                contains: function(value) {
                    return !!~self.className.split(/\s+/).indexOf(value);
                },

                item: function(i) {
                    return self.className.split(/\s+/)[i] || null;
                }
            };
            
            Object.defineProperty(ret, 'length', {
                get: function() {
                    return self.className.split(/\s+/).length;
                }
            });

            return ret;
        }
    });
}

var Button = function (elem){
    var toggleElements = [];
    var enlarge = elem.classList.contains("larger") ? true : false;

    var toggle = function(){
        if(enlarge){
            elem.classList.remove("larger");
            elem.classList.add("smaller");
            elem.innerHTML = "Smaller type";
        }else{
            elem.classList.remove("smaller");
            elem.classList.add("larger");
            elem.innerHTML = "Larger type";
        }

        // toggle class in toggleElements
        for(var i=0; i<toggleElements.length; i++) {
            var toggleEl = toggleElements[i];
            toggleEl.element.classList.toggle(toggleEl.cls);
        }
        enlarge = !enlarge;
    };

    elem.addEventListener("click", function(e){
        toggle();
        e.preventDefault();
    });

    return {
        addToggleElement: function(element, cls){
            toggleElements.push({element: element, cls: cls});
        }
    };
};

var elem = document.getElementById("text-size");
var article = document.getElementById("article-content");
var button = Button(elem);
button.addToggleElement(article, "larger");