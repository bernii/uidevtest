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