
function savedata() {
    const landarea = document.getElementById('lanare').value;
    const north = document.getElementById('north').value;
    const west = document.getElementById('west').value;
    const east = document.getElementById('east').value;
    const south = document.getElementById('south').value;
    const nscb = document.getElementById('nscb').value;
    const dslbh = document.getElementById('dslbh').value;
    const dbtp = document.getElementById('dbtp').value;
    const dbnh = document.getElementById('dbnh').value;
    const faci = document.getElementById('faci').value;
    const trans = document.getElementById('trans').value;
    const natres = document.getElementById('natres').value;

    localStorage.setItem("landarea", landarea);
    localStorage.setItem("north", north);
    localStorage.setItem("west", west);
    localStorage.setItem("east", east);
    localStorage.setItem("south", south);
    localStorage.setItem("nscb", nscb);
    localStorage.setItem("dslbh", dslbh);
    localStorage.setItem("dbtp", dbtp);
    localStorage.setItem("dbnh", dbnh);
    localStorage.setItem("faci", faci);
    localStorage.setItem("trans", trans);
    localStorage.setItem("natres", natres);
}

window.onload = function() {
    const landarea = localStorage.getItem("landarea");
    const north = localStorage.getItem("north");
    const west = localStorage.getItem("west");
    const east = localStorage.getItem("east");
    const south = localStorage.getItem("south");
    const nscb = localStorage.getItem("nscb");
    const dslbh = localStorage.getItem("dslbh");
    const dbtp = localStorage.getItem("dbtp");
    const dbnh = localStorage.getItem("dbnh");
    const faci = localStorage.getItem("faci");
    const trans = localStorage.getItem("trans");
    const natres = localStorage.getItem("natres");

    document.getElementById('lanare').value = landarea;
    document.getElementById('north').value = north;
    document.getElementById('west').value = west;
    document.getElementById('east').value = east;
    document.getElementById('south').value = south;
    document.getElementById('nscb').value = nscb;
    document.getElementById('dslbh').value = dslbh;
    document.getElementById('dbtp').value = dbtp;
    document.getElementById('dbnh').value = dbnh;
    document.getElementById('faci').value = faci;
    document.getElementById('trans').value = trans;
    document.getElementById('natres').value = natres;
}