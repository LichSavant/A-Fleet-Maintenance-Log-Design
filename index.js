function searchCompany(){

let input=
document.getElementById("companySearch");

let filter=
input.value.toUpperCase();

let list=
document.getElementById("companyList");

let items=
list.getElementsByClassName("company-item");

list.style.display="block";

for(let i=0;i<items.length;i++){

let txt=
items[i].textContent;

if(txt.toUpperCase().indexOf(filter)>-1){

items[i].style.display="block";

}else{

items[i].style.display="none";

}

}

}

function selectCompany(id,name){

document.getElementById("companyID").value=id;

document.getElementById("companySearch").value=name;

document.getElementById("companyList").style.display="none";

document.getElementById("continueBtn").disabled=false;

}

document.addEventListener("click",function(e){

if(!e.target.closest(".search-container")){

document.getElementById("companyList").style.display="none";

}

});
