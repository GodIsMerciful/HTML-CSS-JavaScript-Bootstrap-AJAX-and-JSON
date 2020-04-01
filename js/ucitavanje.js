$(document).ready(function()
{
    $.ajax(
        {
                url:"data/nav1.json",
                method:"get",
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

document.getElementById("forma").addEventListener('submit',validate);
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
        document.getElementById("ime").style.borderColor = "red";
    }
    else
    {
        if(!regIzrazIme.test(ime))
        {
            validno = false;
            imeGreska.innerHTML = "Ime nije u dobrom formatu. Mora da počne velikim slovom i da ima najmanje 3 karaktera.";
            document.getElementById("ime").style.borderColor = "#ff000f";
        }
        else
        {
            imeGreska.innerHTML = "";
            document.getElementById("ime").style.borderColor = "#003893c7";
        }
    }

    // ovde je prevent default bio

    var prezime = document.getElementById("prezime").value;
    var regIzrazPrezime = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,12}$/;
    var prezimeGreska = document.getElementById("greskaPrezime");

    if(prezime === "")
    {
        validno = false;
        prezimeGreska.innerHTML = "Polje prezime je prazno";
        document.getElementById("prezime").style.borderColor = "#ff000f";
    }
    else
    {
        if(!regIzrazPrezime.test(prezime))
        {
            validno = false;
            prezimeGreska.innerHTML = "Prezime nije u dobrom formatu. Mora da počne velikim slovom i da ima najmanje 3 karaktera.";
            document.getElementById("prezime").style.borderColor = "#ff000f";
        }
        else
        {
            prezimeGreska.innerHTML = "";
            document.getElementById("prezime").style.borderColor = "#003893c7";
        }
    }






    var mail = document.getElementById("mail").value;
    var regIzrazMail = /^[a-z][a-z\d\_\_.\-]+\@[a-z\d]+(\.\[a-z]{2-4})+$/;
    var greskaMail = document.getElementById("greskaEMail");

    if(mail === "")
    {
        validno = false;
        greskaMail.innerHTML = "Polje mail je prazno.";
        document.getElementById("mail").style.borderColor = "#ff000f";
    }
    else
    {
        if(!regIzrazMail.test(mail))
        {
            validno = false;
            greskaMail.innerHTML = "Polje mail nije pravilno popunjeno.";
            document.getElementById("mail").style.borderColor = "#ff000f";
        }
        else
        {
            greskaMail.innerHTML = "";
            document.getElementById("mail").style.borderColor = "#003893c7";
        }
    }

}

//=====================================================================
