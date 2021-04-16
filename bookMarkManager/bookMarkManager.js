// Display form for add bookmark and folder
function callForm(folderId){
    findElement("form").style.display = "block";
    findElement("folderId").setAttribute("value", folderId);           
}

// Catch the form values and decide what whill be created
function setProperty(){

    let title, link, newFolder, folderId;

    title = findElement("title").value;
    link = findElement("link").value;
    newFolder = findElement("folderName").value;
    folderId = findElement("folderId").value;

    // Decide if create a folder
    if(!title && !link && newFolder){
        createFolder(newFolder, folderId);
    }

    // Decide if create a bookmark
    if(title && link && !newFolder){
        createBookmark(title, link, folderId);
    }

    //first create a folder than create a bookmark
    if(title && link && newFolder){
        folderId = createFolder(newFolder, folderId);
        createBookmark(title, link, folderId);
    }

}

// Bookmark method
function createBookmark(title, link, folderId){

    let node, random;
    random = randomId();

    // Node Array with all tags to create a bookmark
    node = [document.createElement("LI"), document.createElement("A"),document.createElement("A")];

    node[0].id = random;

    node[1].href = link;
    node[1].innerHTML = title;

    node[2].setAttribute("onclick", "deleteIten("+ random +")");
    node[2].innerHTML = "X";

    node[0].appendChild(node[1]);
    node[0].appendChild(node[2]);

    findElement(folderId).appendChild(node[0]);
    
}

// Folder method
function createFolder(newFolder, folderId){

    let node, random;

    random = randomId();

    // Node Array with all tags to create a folder
    node = [document.createElement("UL"),document.createElement("LI"),document.createElement("A"),document.createElement("A")];

    //set atributes
    node[0].id = random;

    node[2].setAttribute("onclick", "callForm("+ random +")");
    node[2].innerHTML = newFolder;

    node[3].setAttribute("onclick", "deleteIten("+ random +")");
    node[3].innerHTML = "X";

    //create tags
    node[1].appendChild(node[2]);
    node[1].appendChild(node[3]);
    node[0].appendChild(node[1]);

    findElement(folderId).appendChild(node[0]); 

    // is used to create a new bookmark in a new folder
    return random;
}

// Delete a specific element
function deleteIten(elementId){
    let element;
    element = findElement(elementId);
    element.remove();
}

// Shortcut to find a element
function findElement(element){
    let result = document.getElementById(element);
    return result;
}

// Create a random id
function randomId(){

    // Calculate a random number between 1000 and 9999
    let random = Math.floor(Math.random() * (9999 - 1000)) + 1000;

    if(findElement(random)){
        return randomId();
    }else{
        return random;
    }
}

//drag and drop API
function allowDrop(ev) {
    ev.preventDefault();
}
function blockDrop(ev){
    ev.stopPropagation();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.insertAdjacentHTML("beforebegin", findElement(data));
}