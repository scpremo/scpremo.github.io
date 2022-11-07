/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Scott Premo
 * Email:premos@oregonstate.edu
 */
//------ Code from stack overflow:   https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
//---------

var items          = document.getElementsByClassName("post")
var BackUpCopy     = [...items];
var updateButton   = document.getElementById("filter-update-button")
var sellSomething  = document.getElementById("sell-something-button")
var postContainer  = document.getElementById("posts")
var postTextInput  = document.getElementById("post-text-input")
var postPriceInput = document.getElementById("post-price-input")
var postPhotoInput = document.getElementById("post-photo-input")
var postCityInput  = document.getElementById("post-city-input")


var textInput = document.getElementById("filter-text").value
var selectBox = document.getElementById("filter-city")
var city= selectBox.options[selectBox.selectedIndex].text
var minPriceBox = document.getElementById("filter-min-price")
var minPrice
if(minPriceBox.value<=0)
    minPrice=-1;
else
    minPrice=minPriceBox.value
var maxPriceBox = document.getElementById("filter-max-price")
var maxPrice
if(maxPriceBox.value<=0)
    maxPrice=-1;
else
    maxPrice=maxPriceBox.value
var checkBoxes = document.querySelectorAll("input[name='filter-condition']:checked")

function reset(data){
    items = document.getElementsByClassName("post")
    while(0<items.length)
    {
        items[0].remove()
    }
    for(var i=0;i<data.length;i++)
    {
         postContainer.appendChild(data[i])
    }
}
function matchCondition(checkBox, check){
    if (checkBox.length>0)
    {
        console.log(checkBox.length," items selected")
        for(var i=0;i<checkBox.length;i++)
        {
            if(checkBox[i].value==check)
                return true
        }
        return false
    }
    else
    return true
}
function update(){
    reset(BackUpCopy);
    items = document.getElementsByClassName("post")
    var copy = [...items];
    while(0<items.length)
    {
        items[0].remove()
    }    
    for(var i=0;i<copy.length;i++)
    {
        var copyText=copy[i].getElementsByClassName("post-title")[0].textContent
        console.log(matchCondition(checkBoxes,copy[i].dataset.condition))
        console.log("copyText:",copyText)
        console.log(copy[i].dataset.city, "===", city,": ",copy[i].dataset.city==city )
        
        if ((copy[i].dataset.city == city || city=="Any")
            &&(parseInt(copy[i].dataset.price)>=minPrice||minPrice==-1)
            &&(parseInt(copy[i].dataset.price)<=maxPrice||maxPrice==-1)
            &&(copyText.indexOf(textInput)!=-1||!textInput)
            &&matchCondition(checkBoxes,copy[i].dataset.condition))
        {
            postContainer.appendChild(copy[i])
        }
    }
}
updateButton.addEventListener("click",function(){
    textInput = document.getElementById("filter-text").value
    if(textInput)
        console.log("text input:",textInput)
    selectBox = document.getElementById("filter-city")
    city= selectBox.options[selectBox.selectedIndex].text
    minPriceBox = document.getElementById("filter-min-price")
    if(minPriceBox.value<=0)
        minPrice=-1;
    else
        minPrice=minPriceBox.value
    maxPriceBox = document.getElementById("filter-max-price")
    if(maxPriceBox.value<=0)
        maxPrice=-1;
    else
        maxPrice=maxPriceBox.value
    console.log("minPrice--",minPrice)
    console.log("maxPrice--",maxPrice)
    console.log("city--",city)
    checkBoxes = document.querySelectorAll("input[name='filter-condition']:checked")
    update()
})
sellSomething.addEventListener("click",function(){
    var sellSomethingModal = document.getElementById("sell-something-modal")
    sellSomethingModal.classList.remove ("hidden")
})


// ------------- Add Item Stuff-----------------
function closeItemAdder(){
    
    var sellSomethingModal = document.getElementById("sell-something-modal")
    postTextInput.value=""
    postPriceInput.value=""
    postPhotoInput.value=""
    postCityInput.value=""
    document.querySelector("input[name='post-condition']").checked=true
    console.log(document.querySelector("input[name='post-condition']"))
    sellSomethingModal.classList.add ("hidden")
}

var modalCancel=document.getElementById("modal-cancel")
modalCancel.addEventListener("click", closeItemAdder)
var modalClose=document.getElementById("modal-close")
modalClose.addEventListener("click", closeItemAdder)
var modalAccept=document.getElementById("modal-accept")
function checkCity(city)
{
    var cities=document.getElementById("filter-city")
    console.log(cities.length)
    check=true
    for(var i=0; i< cities.length;i++)
    {
        if(cities.options[i].text==city)
            check=false
    }
    if(check)
    {
        var newCity= document.createElement("option")
        newCity.textContent=city
        cities.appendChild(newCity)
    }
}
modalAccept.addEventListener("click",function(){
    var inputPrice = postPriceInput.value
    var inputText  = postTextInput.value
    var inputPhoto = postPhotoInput.value
    var inputCity  = capitalizeFirstLetter(postCityInput.value)

    // var photoCardSection = document.createElement("section")
    // photoCardSection.classList.add("photo-card")
    // <div class="post" data-price="500" data-city="Eugene" data-condition="poor">
    //       <div class="post-contents">
    //         <div class="post-image-container">
    //           <img src="https://i.pinimg.com/originals/07/e0/8c/07e08c1195f197dab954a89723339b3b.jpg" alt="Super nice laptop">
    //         </div>
    //         <div class="post-info-container">
    //           <a href="#" class="post-title">Super nice laptop</a> <span class="post-price">$500</span> <span class="post-city">(Eugene)</span>
    //         </div>
    //       </div>
    // </div>
  

    var inputCondition= document.querySelector("input[name='post-condition']:checked").value
    console.log("inputCondition:",inputCondition)
    if(inputPrice.length>0&&inputPhoto.length>0&&inputText.length>0&&inputCity.length>0)
    {
        console.log("looks good price:", inputPrice,", text:",inputText,", photo:",inputPhoto)
        var newPost= document.createElement("div")
        newPost.classList.add("post")
        newPost.dataset.price=inputPrice
        newPost.dataset.condition=inputCondition
        newPost.dataset.city=inputCity
        var postContents = document.createElement("div")
        postContents.classList.add("post-contents")
        var postImageContainer = document.createElement("div")
        postImageContainer.classList.add("post-image-container")
        var postImage = document.createElement("img")
        postImage.src=inputPhoto
        postImage.alt=inputText
        var postTextContainer = document.createElement("div")
        postTextContainer.classList.add("post-info-container")
        var postTitle= document.createElement("a")
        postTitle.classList.add("post-title")
        postTitle.href="#"
        postTitle.textContent=inputText;
        var postPrice = document.createElement("span")
        postPrice.classList.add("post-price")
        postPrice.textContent="$"+inputPrice
        var postCity = document.createElement("span")
        postCity.classList.add("post-city")
        postCity.textContent="("+inputCity+")"

        postImageContainer.appendChild(postImage)
        postContents.appendChild(postImageContainer)
        postTextContainer.appendChild(postTitle)
        postTextContainer.appendChild(postPrice)
        postTextContainer.appendChild(postCity)
        postContents.appendChild(postTextContainer)        
        newPost.appendChild(postContents)
        reset(BackUpCopy)
        postContainer.appendChild(newPost)
        items          = document.getElementsByClassName("post")
        BackUpCopy     = [...items];
        update()
        
        console.log(newPost)
        checkCity(inputCity)
        closeItemAdder()
    }
    else{
        alert("Must fill in all values")
    }
})