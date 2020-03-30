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