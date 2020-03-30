$(document).ready(function()
{
    $.ajax(
        {
                url:"data/nav.json",
                method:"post",
                success:function(data)
                {
                    loadNav(data);
                }
        }
    )
});

function loadNav(links)
{
    let ispisLinka="";

    for(var link of links)
    {
        ispisLinka += makeNav(link)
    }

    $("#list").html(ispisLinka);
}
function makeNav(link)
{
    return `<li class="list-inline-item"><a href="${link.href}">${link.naslov}</a></li>`
}
//===========[Unos produkata]============//

$(document).ready(function () {
    $.ajax({
        url : "data/products.json",
        success : function(data) {
            loadProducts(data);
        }
    })
});

function loadProducts(products) {
    let productsHtml = "";
    
    for(product of products) {
        productsHtml += makeProduct(product);
    }

    $("#shop-store").html(productsHtml);

    bindCartEvents();
}

function bindCartEvents() 
{
    $(".korpa").click(addToCart);
}

function productsInCart() 
{
    return JSON.parse(localStorage.getItem("products"));
}

function addToCart() 
{
    let id = $(this).data("id");

    var products = productsInCart();

    if(products) {
        if(productIsAlreadyInCart()) {
            updateQuantity();
        } else {
            addToLocalStorage()
        }
    } else {
        addFirstItemToLocalStorage();
    }

    alert("Sadržaj unet u korpu.");

    /* Male funkcije koje odradjuju po jednu funkcionalnost radi lakse odrzivosti koda */
    function productIsAlreadyInCart() {
        return products.filter(p => p.id == id).length;
    }

    function addToLocalStorage() {
        let products = productsInCart();
        products.push({
            id : id,
            quantity : 1
        });
        localStorage.setItem("products", JSON.stringify(products));
    }

    function updateQuantity() {
        let products = productsInCart();
        for(let i in products)
        {
            if(products[i].id == id) {
                products[i].quantity++;
                break;
            }      
        }

        localStorage.setItem("products", JSON.stringify(products));
    }

    

    function addFirstItemToLocalStorage() {
        let products = [];
        products[0] = {
            id : id,
            quantity : 1
        };
        localStorage.setItem("products", JSON.stringify(products));
    }
}



function clearCart() {
    localStorage.removeItem("products");
}

function makeProduct(product) {
    return `
        <div class="test col-lg-2 frame bg-white">
                    <img src="img/products/${product.picture.src}" class='img-fluid' alt="${product.picture.alt}"/>
                    <p>Naziv: ${product.name}</p>
                    <p>Proizvođač: ${product.proizvodjac}</p>
                    <p>Cena: &euro;${product.cena}</p>
                    <input type="button" value="Dodaj u korpu" class="mb-3 p-1 pr-3 pl-3 korpa" id="cart" data-id="${product.id}" onclick="uvecaj()"/>
        </div>
    `;
}


//==================== [ 3COL STRUCT ] ======================
document.getElementById("threeColumn").addEventListener("click", koloneTri);

function koloneTri()
{
    $('.test').removeClass('col-lg-2').addClass('col-lg-3');
}
//===========================================================
//=================== [ 4COL STRUCT ] =======================

document.getElementById("fourColumn").addEventListener("click", koloneCetiri);

function koloneCetiri()
{
    $('.test').removeClass('col-lg-3').addClass('col-lg-2');
}

//===========================================================

//==================== [   Sortiranje    ] ============================

document.getElementById("default").addEventListener("click", sortirajPoDefaultu);
document.getElementById("proizvodjac").addEventListener("click", sortirajPoProizvodjacu);
document.getElementById("sortRa").addEventListener("click", sortirajPoCeniRastuce);
document.getElementById("sortOp").addEventListener("click", sortirajPoCeniOpadajuce);

function sortirajPoDefaultu()
{
    $(document).ready(function () {
        $.ajax({
            url : "data/products.json",
            method : "post",
            success : function(data) {
                loadProducts(data);
            }
        })
    });
    
    loadProducts();
    
}

function sortirajPoProizvodjacu()
{
    $.ajax({
        url : "data/products.json",
        method : "GET",
        type : "json",
        success : function(data) 
        { 
           data.sort(function(a,b)
           {
                if(a.proizvodjac==b.proizvodjac)
                { 
                    return 0;
                }
                else if(a.proizvodjac<b.proizvodjac)
                {
                    return  -1;
                } 
                else
                {
                    return 1;
                }
            });
            loadProducts(data);
            console.log(loadProducts);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}
function sortirajPoCeniRastuce()
{
    $.ajax({
        url : "data/products.json",
        method : "GET",
        type : "json",
        success : function(data) 
        { 
           data.sort(function(a,b)
           {
                if(a.cena==b.cena)
                { 
                    return 0;
                }
                if(a.cena<b.cena)
                {
                    return -1;
                } 
                else
                {
                    return 1;
                }
            });
            loadProducts(data);
            console.log(loadProducts);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}

function sortirajPoCeniOpadajuce(e)
{
    $.ajax({
        url : "data/products.json",
        method : "GET",
        type : "json",
        success : function(data) 
        { 
           data.sort(function(a,b)
           {
                if(a.cena==b.cena)
                { 
                    return 0;
                }
                else if(a.cena>b.cena)
                {
                    return  -1;
                } 
                else
                {
                    return 1;
                }
            });
            loadProducts(data);
            console.log(loadProducts);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}

//==================== [ KRAJ Sortiranja ] ===========================

document.getElementById("lista").addEventListener("input", function(e)
{
    switch(e.target.value)
    {
        case "1":sortirajPoProizvodjacu();break;
        case "2":sortirajPoCeniRastuce();break;
        case "3":sortirajPoCeniOpadajuce();break;
        default:
            case "menu_order":sortirajPoDefaultu();break;
    }
});

function uvecaj()
{
    document.getElementById("brojac").value++;
}

