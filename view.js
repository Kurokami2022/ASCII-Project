const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const contentSelect = document.getElementById('content-select');

const folderPath = path.join(__dirname, 'Databases');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.sort();

  files.forEach((file) => {
    const option = document.createElement('option');
    option.value = file;
    option.textContent = file;
    contentSelect.appendChild(option);
  });
});

contentSelect.addEventListener('change', (event) => {
  const selectedFile = event.target.value;
  console.log(selectedFile);
  var db = new sqlite3.Database(path.join('./Databases', selectedFile));
  
  const tableName = path.parse(selectedFile).name;
  db.get(`SELECT Family_Head FROM ${tableName}_info`, (err, row) => {
    head.value = row.Family_Head.replace('_', ' ');
  });

  var head = document.getElementById('head');
    var numfam = document.getElementById('numfam');
    var address = document.getElementById('address');
    var length = document.getElementById('length');
    var ethnic = document.getElementById('ethnic');
    var famtype = document.getElementById('famtype');
    var primdia = document.getElementById('primdia');

  db.get(`SELECT * FROM ${tableName}_info`, (err, row) => {
    head.value = row.Family_Head.replace('_', ' ');
    numfam.value = row.No_of_Family_Member;
    address.value = row.Complete_Address;
    length.value = row.Length_of_Residency;
    ethnic.value = row.Ethnic_Group;
    famtype.value = row.Type_of_Family;
    primdia.value = row.Primary_Dialect;
  });

  var lanare = document.getElementById('lanare');
  var north = document.getElementById('north');
  var west = document.getElementById('west');
  var east = document.getElementById('east');
  var south = document.getElementById('south');
  var nscb = document.getElementById('nscb');
  var dslbh = document.getElementById('dslbh');
  var dbtp = document.getElementById('dbtp');
  var dbnh = document.getElementById('dbnh');
  var faci = document.getElementById('faci');
  var trans = document.getElementById('trans');
  var natres = document.getElementById('natres');

  db.get(`SELECT * FROM ${tableName}_PhysicalGeographical_Data`, (err, row) => {
    lanare.value = row.Land_Area;
    north.value = row.Boundary_North;
    west.value = row.Boundary_West;
    east.value = row.Boundary_East;
    south.value = row.Boundary_South;
    nscb.value = row.Sitios_Composing_Barangay;
    dslbh.value = row.Sitio_Distance_From_Landmark;
    dbtp.value = row.Sitio_Distance_From_Town_Proper;
    dbnh.value = row.Sitio_Distance_From_National_Highway;
    faci.value = row.Facilities;
    trans.value = row.Transportation;
    natres.value = row.Natural_Resources;
  });

  db.all(`SELECT * FROM ${tableName}_Family_Structure`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    const table = document.getElementById('captable');
    rows.forEach((row) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.No}</td>
                    <td>${row.Name_of_Household_Member}</td>
                    <td>${row.Relation_to_Head}</td>
                    <td>${row.Age}</td>
                    <td>${row.Sex}</td>
                    <td>${row.Birth_Date}</td>
                    <td>${row.Civil_Status}</td>
                    <td>${row.Occupation}</td>
                    <td>${row.Occupational_Status}</td>
                    <td>${row.Highest_Educational_Attainment}</td>
                    <td>${row.Religion}</td>`;
    table.appendChild(tr);
    });
    });

    var a1 = document.getElementById('a1');
    var a2 = document.getElementById('a2');
    var a3 = document.getElementById('a3');
    var a4 = document.getElementById('a4');
    var a5 = document.getElementById('a5');
    var b1 = document.getElementById('b1');
    var b2 = document.getElementById('b2');
    var b3 = document.getElementById('b3');
    var b4 = document.getElementById('b4');
    var c1 = document.getElementById('c1');
    var c2 = document.getElementById('c2');
    var c3 = document.getElementById('c3');
    var c4 = document.getElementById('c4');
    var c5 = document.getElementById('c5');
    var c6 = document.getElementById('c6');
    var c7 = document.getElementById('c7');
    var c71 = document.getElementById('c71');
    var c8 = document.getElementById('c8');
    var c81 = document.getElementById('c81');
    var c9 = document.getElementById('c9');
    var c91 = document.getElementById('c91');
    var c92 = document.getElementById('c92');
    var c93 = document.getElementById('c93');
    var c10 = document.getElementById('c10');
    var c101 = document.getElementById('c101');
    var c102 = document.getElementById('c102');
    var c103 = document.getElementById('c103');
    var c104 = document.getElementById('c104');


    db.get(`SELECT * FROM ${tableName}_community_as_a_social_System`, (err, row) => {
      a1.innerHTML = `<ul><li><b>${row.A1}</b></li></ul>`;
      a2.innerHTML = `<ul><li><b>${row.A2}</b></li></ul>`;
      a3.innerHTML = `<ul><li><b>${row.A3}</b></li></ul>`;
      a4.innerHTML = `<ul><li><b>${row.A4}</b></li></ul>`;
      a5.innerHTML = `<ul><li><b>${row.A5}</b></li></ul>`;
      b1.innerHTML = `<ul><li><b>${row.B1}</b></li></ul>`;
      b2.innerHTML = `<ul><li><b>${row.B2}</b></li></ul>`;
      b3.innerHTML = `<ul><li><b>${row.B3}</b></li></ul>`;
      b4.innerHTML = `<ul><li><b>${row.B4}</b></li></ul>`;

      c1.innerHTML = `<ul><li><b>${row.C1}</b></li></ul>`;
      c2.innerHTML = `<ul><li><b>${row.C2}</b></li></ul>`;
      c3.innerHTML = `<ul><li><b>${row.C3}</b></li></ul>`;
      c4.innerHTML = `<ul><li><b>${row.C4}</b></li></ul>`;
      c5.innerHTML = `<ul><li><b>${row.C5}</b></li></ul>`;
      c6.innerHTML = `<ul><li><b>${row.C6}</b></li></ul>`;
      c7.innerHTML = "<ul><li>Type: " + `<b>${row.C7}</b></li></ul>`;
      c71.innerHTML = "<ul><li>Level: " + `<b>${row.C7_Level}</b></li></ul>`;
      c8.innerHTML = "<ul><li>Type: "+`<b>${row.C8}</b></li></ul>`;
      c81.innerHTML = "<ul><li>Condition: " + `<b>${row.C8_Condition}</b></li></ul>`;
      c9.innerHTML = "<ul><li>Waste Garbage Segregation: " + `<b>${row.C9_Segregation}</b></li></ul>`;
      c91.innerHTML = "<ul><li>Container Used in Garbage: " + `<b>${row.C9_Container_Used}</b></li></ul>`;
      c92.innerHTML = "<ul><li>Container: " + `<b>${row.C9_Container}</b></li></ul>`;
      c93.innerHTML = "<ul><li>Method of Disposal: " + `<b>${row.C9_Method_Of_Disposal}</b></li></ul>`;
      c10.innerHTML = "<ul><li>Type: "+`<b>${row.C10_Toilet_Facilities}</b></li></ul>`;
      c101.innerHTML = "<ul><li>Level: " + `<b>${row.C10_Level}</b></li></ul>`;
      c102.innerHTML = "<ul><li>Ownership: "+`<b>${row.C10_Ownership}</b></li></ul>`;
      c103.innerHTML = "<ul><li>Distance from the House to Toilet Facility: "+`<b>${row.C10_Distance_to_Toilet_Facility}</b></li></ul>`;
      c104.innerHTML = "<ul><li>Sanitary Condition: "+`<b>${row.C10_Sanitary_Condition}</b></li></ul>`;
    });
});
