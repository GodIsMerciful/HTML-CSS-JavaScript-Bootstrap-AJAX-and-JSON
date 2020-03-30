$(document).ready(function()
{
    $.ajax(
        {
                url:"data/nav1.json",
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

//=============== [ REGULARNI IZRAZ ] =================================


function validate(e)
{
    e.preventDefault();
    let validno = true;

    var ime = document.getElementById("ime").value;
    var regIzrazIme = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,12}$/;

    var imeGreska = document.getElementById("greskaIme");

    if(ime === "")
    {
        validno = false;
        imeGreska.innerHTML = "Polje ime je prazno.";
        
        //document.getElementById("ime").style.borderColor = "red";
    }
    else
    {
        if(!regIzrazIme.test(ime))
        {
            validno = false;
            imeGreska.innerHTML = "Datum rodjenja nije u dobrom formatu...";
            //document.getElementById("ime").style.borderColor = "red";
        }
        else
        {
            imeGreska.innerHTML = "";
        }
    }
}

//=====================================================================