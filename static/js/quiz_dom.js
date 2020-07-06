function quizDomCreate(parentDomObj, childDomObjArray) {
    // parentDomObj: Parent object the childs to be appended: var parentDomObj = document.getElementsByClassName("classname")[0];
    // childDomObjArray: Child objects to be created and appended to the Parent Object: var childDomObjArray = [{div: {class: "classname", textContent = "This is the text content"}}, {div: {class: "classname", innerText = "This is the innerText"}}, {div: {class: "classname", innerHTML = "This is the innerHTML"}}];)
    var newChildDomElArray = [];
    childDomObjArray.forEach(function(childDomObj, i) {        
        elName = Object.keys(childDomObj)[0];
        var newEl = document.createElement(elName);
        attrNameArray = Object.keys(childDomObj[elName]);
        attrNameArray.forEach(function(attrName, i) {
            if (attrName === "textContent" ) {
                newEl.textContent = childDomObj[elName][attrName];
            }
            else if (attrName === "innerText" ) {
                newEl.innerText = childDomObj[elName][attrName];
            }
            else if (attrName === "innerHTML") {
                newEl.innerHTML = childDomObj[elName][attrName];
            }
            else if (attrName === "placeholder") {
                newEl.placeholder = childDomObj[elName][attrName];
            }
            else if (attrName === "type") {
                newEl.type = childDomObj[elName][attrName];
            }
            else if (attrName === "for") {
                newEl.for = childDomObj[elName][attrName];
            }
            else if (attrName === "name") {
                newEl.name = childDomObj[elName][attrName];
            }
            else if (attrName === "value") {
                newEl.value = childDomObj[elName][attrName];
            }
            else {
            newEl.setAttribute(attrName, childDomObj[elName][attrName]);
            }
            
        }
        )
        newChildDomElArray.push(newEl);
        parentDomObj.appendChild(newEl);
    })
    return newChildDomElArray;

} 

function resetDom(domObj) {
    // domObj: Dom object to be cleaned: var domObj = document.getElementsByClassName("classname")[0];
    domObj.innerHTML = "";
}
