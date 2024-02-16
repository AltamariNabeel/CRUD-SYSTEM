let ddlcategory=document.getElementById("ddlcategory");
let category=document.getElementById("category");
let product=document.getElementById("product");
let quntity=document.getElementById("quntity");
let price=document.getElementById("price");
let disconut=document.getElementById("disconut");
let totale=document.getElementById("totale");

//Save Category
let CatogaryArr;
localStorage.Category !=null ?CatogaryArr=JSON.parse(localStorage.Category) : CatogaryArr=[];
let ProductArr;
localStorage.product !=null ?ProductArr=JSON.parse(localStorage.product) : ProductArr=[];

// Array For Catogery 

let btnStatus="Creat";
let Proid;

function SaveCatogary(){
    let objCatogary={
        category:category.value
    };

    CatogaryArr.push(objCatogary);
    localStorage.setItem('Category',JSON.stringify(CatogaryArr));
    Rest();
    ShowCategory();
    ShowTable();
    CountCategory();
}

//Rest Category
function Rest(){
    category.value='';
}

//Show Category

function ShowCategory(){
    let item='';
    item+=`<option value="">Select Category ....</option>`

    for(i=0; i < CatogaryArr.length; i++){
        item+=`<option value="${i}">${CatogaryArr[i].category}</option>`
    }
    ddlcategory.innerHTML=item;
}


//Show Table 

function ShowTable(){

    let Table='';
    for(i=0; i < CatogaryArr.length; i++){
        Table+=`                            
        <tr>
        <td>${i}</td>
        <td>${CatogaryArr[i].category}</td>
        <td>
            <button class="btn btn-danger" onclick="DeleteCategory(${i})"><i class="fa-regular fa-trash-can"></i></button>
        </td>
    </tr>


   
`
    }
    document.getElementById('BodyCategory').innerHTML=Table;
}

//Delete Category

function DeleteCategory(id){

    if(confirm('Are You Sure To Delete The Data Form Tabel.....')==true){
    CatogaryArr.splice(id,1);
    localStorage.category=JSON.stringify(CatogaryArr);
    ShowTable();
    ShowCategory();

    }

}


// Count Category

function CountCategory(){
    document.getElementById('ConutCategory').innerHTML=` -Total Category (${CatogaryArr.length})`;
}

// Validation Category 

function ValidationCategory(){
    let valid=true;

    if(category.value==''){
        alert('Enter Name Category ......');
        valid=false;
    }
    else{
        SaveCatogary();
        valid=true;
    }
    return valid;
}
/////////////////////////////////

//Get Total

function GetTotal(){

    if(price.value != 0){
        let Total = (quntity.value*price.value) -disconut.value;
        totale.value=Total;

        totale.className.replace="form-control bg-danger text-center";
        totale.className="form-control bg-success text-center"
    }
    else{
        totale.value=0;
        totale.className.replace="form-control bg-success text-center";
        totale.className="form-control bg-danger text-center"

    }
}

// Save Product 

function SaveProdut(){

    let NewProduct={

        ddlcategory:ddlcategory[ddlcategory.selectedIndex].text,

        product:product.value,
        quntity:quntity.value,
        price:price.value,
        disconut:disconut.value,
        totale:totale.value
    };

    if(btnStatus==="Creat"){
        ProductArr.push(NewProduct);

    }
    else{
        ProductArr[Proid]=NewProduct;
        document.getElementById('btnSave').className.replace='btn btn-info w-25';
        document.getElementById('btnSave').className='btn btn-success w-25';
    

    }

    localStorage.setItem("product",JSON.stringify(ProductArr));
    Rest();
    ShowTableProduct();
    CountProduct();
    GetTotal();

}
// Rest Product 

function Rest(){

    ddlcategory[ddlcategory.selectedIndex].text="Select Category ....";
    product.value='';
    quntity.value=0;
    price.value=0;
    disconut.value=0;
    totale.value=0;
    document.getElementById('btnSave').className.replace='btn btn-info w-25';
    document.getElementById('btnSave').className='btn btn-success w-25';


}
// Show Table 

function ShowTableProduct(){
    let TabelPro='';

    for(let x=0; x<ProductArr.length; x++){
        TabelPro +=`
    <tr>
        <td>${x}</td>
        <td>${ProductArr[x].ddlcategory}</td>
        <td>${ProductArr[x].product}</td>
        <td>${ProductArr[x].quntity}</td>
        <td>${ProductArr[x].price}</td>
        <td>${ProductArr[x].disconut}</td>
        <td>${ProductArr[x].totale}</td>
        <td>
            <button class="btn btn-info" onclick="EditProduct(${x})"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn btn-danger" onclick="DeletProduct(${x})"><i class="fa-regular fa-trash-can"></i></button>
        </td>
    </tr>
        `
    }

    document.getElementById('tbalePro').innerHTML=TabelPro;
}

// Delete Product 

function DeletProduct(id){
    if(confirm('Are You Sure to Delet The Product....')==true){
        ProductArr.splice(id,1);
        localStorage.product =JSON.stringify(ProductArr);
        ShowTableProduct();
        CountProduct();

    }
}

// Edit Product 

function EditProduct(id){
  ddlcategory.options[ddlcategory.selectedIndex].text = ProductArr[id].ddlcategory;
    product.value=ProductArr[id].product;
    quntity.value=ProductArr[id].quntity;
    price.value=ProductArr[id].price;
    disconut.value=ProductArr[id].disconut;
    totale.value=ProductArr[id].totale;
    btnStatus="Edit";
    Proid=id;
    document.getElementById('btnSave').className.replace='btn btn-success w-25';
    document.getElementById('btnSave').className='btn btn-info w-25';

}

// Count Product 

function CountProduct(){
    document.getElementById('conutPro').innerHTML= `-TotalPro (${ProductArr.length})`;
}

// Validation Product 

function ValidationProduct(){

    let valid=true;

    let lbcate=document.getElementById('lbcate');
    let lbPro=document.getElementById('lbPro');
    let lbQuntity=document.getElementById('lbQuntity');
    let lbPrice=document.getElementById('lbPrice');

    if(ddlcategory.options[ddlcategory.selectedIndex].text=='Select Category ....'){
        lbcate.innerHTML=' Category :* [Required]';
        lbcate.style.color='red';
        valid=false;
    }
    else{
        lbcate.innerHTML=' Category :*';
        lbcate.style.color='white';
        valid=true;
    }

    if(product.value==''){

        lbPro.innerHTML=' Product Name : * [Required]';
        lbPro.style.color='red';
        valid=false;
    }
    else{
        lbPro.innerHTML=' Product Name : *';
        lbPro.style.color='white';
        valid=true;
    }

    if(quntity.value==0){

        lbQuntity.innerHTML='Quntity : *[Required]';
        lbQuntity.style.color='red';
        valid=false;
    }
    else{
        lbQuntity.innerHTML='Quntity : *';
        lbQuntity.style.color='white';
        valid=true;
    }

    if(price.value==0){

        lbPrice.innerHTML=' Price : * [Required]';
        lbPrice.style.color='red';
        valid=false;
    }
    else{
        lbPrice.innerHTML=' Price : *';
        lbPrice.style.color='white';
        valid=true;
        SaveProdut();
    }
    return valid;
}




$(document).ready(function(){
    ShowCategory();
    ShowTable();
    CountCategory();
    ShowTableProduct();
    CountProduct();
    $('#tablPro').DataTable();
})