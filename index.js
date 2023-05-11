
function addnew() { 
	var table = document.getElementById("captable");
	if (table) {
	  var tbody = table.getElementsByTagName('tbody')[0];
	  var row = tbody.insertRow(-1);
	  var cell1 = row.insertCell(0);
	  var cell2 = row.insertCell(1);
	  var cell3 = row.insertCell(2);
	  var cell4 = row.insertCell(3);
	  var cell5 = row.insertCell(4);
	  var cell6 = row.insertCell(5);
	  var cell7 = row.insertCell(6);
	  var cell8 = row.insertCell(7);
	  var cell9 = row.insertCell(8);
	  var cell10 = row.insertCell(9);
	  var cell11 = row.insertCell(10);
	  var rowCount = tbody.rows.length;
	  cell1.innerHTML = `<input type='text' class='nowidth' id='No${rowCount}' value="${rowCount}" disabled>`;
	  cell2.innerHTML = `<input type='text' class='nhmwidth' id='nhm${rowCount}'>`;
	  cell3.innerHTML = `<input type='text' class='rthwidth' id='rth${rowCount}'>`;
	  cell4.innerHTML = `<input type='text' class='agewidth' id='age${rowCount}'>`;
	  cell5.innerHTML = `<input type='text' class='sexwidth' id='sex${rowCount}'>`;
	  cell6.innerHTML = `<input type='text' class='bdwidth' id='bday${rowCount}'>`;
	  cell7.innerHTML = `<input type='text' class='cswidth' id='cs${rowCount}'>`;
	  cell8.innerHTML = `<input type='text' class='occwidth' id='occ${rowCount}'>`;
	  cell9.innerHTML = `<input type='text' class='oswidth' id='os${rowCount}'>`;
	  cell10.innerHTML = `<input type='text' class='heawidth' id='hea${rowCount}'>`;
	  cell11.innerHTML = `<input type='text' class='relwidth' id='rel${rowCount}'>`;
	}
  }
  


function deleteit(){
    var table = document.getElementById("captable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function btnbtn() {
	const sqlite3 = require('sqlite3').verbose();
	var head = document.getElementById('head').value.replace(/\s+/g, '_');
	var numfam = document.getElementById('numfam').value;
	var address = document.getElementById('address').value;
	var length = document.getElementById('length').value;
	var ethnic = document.getElementById('ethnic').value;
	var famtype = document.getElementById('famtype').value;
	var primdia = document.getElementById('primdia').value;
	var lanare = document.getElementById('lanare').value;
	var north = document.getElementById('north').value;
	var west = document.getElementById('west').value;
	var east = document.getElementById('east').value;
	var south = document.getElementById('south').value;
	var nscb = document.getElementById('nscb').value;
	var dslbh = document.getElementById('dslbh').value;
	var dbtp = document.getElementById('dbtp').value;
	var dbnh = document.getElementById('dbnh').value;
	var faci = document.getElementById('faci').value;
	var trans = document.getElementById('trans').value;
	var natres = document.getElementById('natres').value;
	
	var db = new sqlite3.Database("./Databases/"  + head + ".db");
	db.run(
	  `CREATE TABLE IF NOT EXISTS "${head}_info" (
		Family_Head TEXT,
		No_of_Family_Member TEXT,
		Complete_Address TEXT,
		Length_of_Residency TEXT,
		Ethnic_Group TEXT,
		Type_of_Family TEXT,
		Primary_Dialect TEXT
	  )`,
	  function (err) {
		if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_info already exists`) || err.message.includes(`database ${head}.db already exists`))) {
		  console.log(`${head}_info already exists`);
		} else if (err) {
		  console.log(err);
		} else {
		  db.run(`INSERT INTO "${head}_info" VALUES (?, ?, ?, ?, ?, ?, ?)`, 
		  [head, numfam, address, length, ethnic, famtype, primdia], function (err) {
			if (err) {
			  console.log(err);
			} else {
			  console.log('success');
			}
		  });
		}
	  }
	);
  

  db.run(
	`CREATE TABLE IF NOT EXISTS "${head}_Physical/Geographical_Data" (
	  Land_Area TEXT,
	  Boundary_North TEXT,
	  Boundary_West TEXT,
	  Boundary_East TEXT,
	  Boundary_South TEXT,
	  Sitios_Composing_Barangay TEXT,
	  Sitio_Distance_From_Landmark TEXT,
	  Sitio_Distance_From_Town_Proper TEXT,
	  Sitio_Distance_From_National_Highway TEXT,
	  Facilities TEXT,
	  Transportation TEXT,
	  Natural_Resources TEXT
	)`,
	function (err) {
		if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Physical/Geographical_Data already exists`) || err.message.includes(`database ${head}.db already exists`))) {
		  console.log(`${head}_Physical/Geographical_Data already exists`);
		} else if (err) {
		  console.log(err);
		} else {
		  db.run(`INSERT INTO "${head}_Physical/Geographical_Data" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
		  [lanare, north, west, east, south, nscb, dslbh, dbtp, dbnh, faci, trans, natres], function (err) {
			if (err) {
			  console.log(err);
			} else {
			  console.log('success');
			}
		  });
		}
	  }
	);
	
	db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Family_Structure" (
		  No TEXT,
		  Name_of_Household_Member TEXT,
		  Relation_to_Head TEXT,
		  Age TEXT,
		  Sex TEXT,
		  Birth_Date TEXT,
		  Civil_Status TEXT,
		  Occupation TEXT,
		  Occupational_Status TEXT,
		  Highest_Educational_Attainment TEXT,
		  Religion TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Family_Structure already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			console.log(`${head}_Community_As_A_People already exists`);
		  } else if (err) {
			console.log(err);
		  } else {
			var table = document.getElementById('captable');
			if (!table) {
			  console.log('Table not found');
			  return;
			}
			var table = document.getElementById("captable");
			if (table) {
			  var tbody = table.getElementsByTagName('tbody')[0];
			  var promises = [];
			  for (var i = 1; i < tbody.rows.length+1; i++) {
				var nhm = document.getElementById("nhm"+`${i}`).value;
				var rth = document.getElementById("rth"+`${i}`).value;
				var age = document.getElementById("age"+`${i}`).value;
				var sex = document.getElementById("sex"+`${i}`).value;
				var bday = document.getElementById("bday"+`${i}`).value;
				var cs = document.getElementById("cs"+`${i}`).value;
				var occ = document.getElementById("occ"+`${i}`).value;
				var os = document.getElementById("os"+`${i}`).value;
				var hea = document.getElementById("hea"+`${i}`).value;
				var rel = document.getElementById("rel"+`${i}`).value;
				
				var promise = new Promise(function(resolve, reject) {
				  db.run(`INSERT INTO "${head}_Family_Structure" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
					[i, nhm, rth, age, sex, bday, cs, occ, os, hea, rel], function (err) {
					  if (err) {
						console.log(err);
						reject(err);
					  } else {
						console.log('success');
						resolve();
					  }
					});
				});
				promises.push(promise);
			  }
			  Promise.all(promises)
				.then(function() {
				  console.log("All data inserted successfully");
				})
				.catch(function(err) {
				  console.log("Error inserting data:", err);
				});
			}
		  }
		}
	);
	
	var a1 = document.getElementsByName('A.1');
	var a2 = document.getElementsByName('A.2');
	var a21 = document.getElementsByName('A.2.1');
	var a3 = document.getElementsByName('A.3');
	var a4food = document.getElementById('food').value;
	var a4health = document.getElementById('health').value;
	var a4houserent = document.getElementById('houserent').value;
	var a4education = document.getElementById('education').value;
	var a4electric = document.getElementById('electricbill').value;
	var a4clothing = document.getElementById('clothing').value;
	var a4waterbill = document.getElementById('waterbill').value;
	var a4others = document.getElementById('a4others').value;
	var a5 = document.getElementsByName('A.5');
	var a51 = document.getElementsByName('A.5.1');
	var b1 = document.querySelectorAll('input[type="checkbox"][name="B.1"]');
	var b2 = document.querySelectorAll('input[type="checkbox"][name="B.2"]');
	var b3 = document.querySelectorAll('input[type="checkbox"][name="B.3"]');
	var b4 = document.querySelectorAll('input[type="checkbox"][name="B.4"]');
	var c1 = document.getElementsByName('C.1');
	var c2 = document.getElementsByName('C.2');
	var c3 = document.getElementsByName('C.3');
	var c4 = document.getElementsByName('C.4');
	var c5 = document.getElementsByName('C.5');
	var c6 = document.getElementsByName('C.6');
	var c71 = document.getElementsByName('C.7.1');
	var c7 = document.querySelectorAll('input[type="checkbox"][name="C.7"]');
	var c8 = document.getElementsByName('C.8');
	var c81 = document.getElementsByName('C.8.1');
	var c9 = document.getElementsByName('C.9');
	var c91 = document.getElementsByName('C.9.1');
	var c92 = document.getElementsByName('C.9.2');
	var c93 = document.querySelectorAll('input[type="checkbox"][name="C.9.3"]');
	var c10 = document.querySelectorAll('input[type="checkbox"][name="C.10"]');
	var c101 = document.getElementsByName('C.10.1');
	var c102 = document.getElementsByName('C.10.2');
	var c103 = document.getElementsByName('C.10.3');
	var c12 = document.getElementsByName('C.12');
	var c13 = document.querySelectorAll('input[type="checkbox"][name="C.13"]');
	var c131 = document.querySelectorAll('input[type="checkbox"][name="C.13.1"]');
	var A1 = "";
	var A2 = "";
	var A3 = "";
	var A4 = `${a4food} food \n
			  ${a4health} health \n
			  ${a4houserent} house rent \n
			  ${a4education} education \n
			  ${a4electric} electric bill \n
			  ${a4clothing} clothing \n
			  ${a4waterbill} waterbill \n
			  ${a4others}`;
	var A5 = "";
	var B1 = "";
	var B2 = "";
	var B3 = "";
	var B4 = "";
	var C1 = "";
	var C2 = "";
	var C3 = "";
	var C4 = "";
	var C5 = "";
	var C6 = "";
	var C7 = "";
	var C7level = "";
	var C8 = "";
	var C8condition = "";
	var C9segregation = "";
	var C9used = "";
	var C9container = "";
	var C9method = "";
	var C10toilet = "";
	var C10level = "";
	var C10ownership = "";
	var C10sanitary = "";
	var C12 = "";
	var C13 = "";
	var C131 = "";

	for(var i = 0; i < a1.length; i++){
		if(a1[i].checked){
			A1 += a1[i].value;
		}
	}

	for(var i = 0; i < a2.length; i++){
		if(a2[i].checked){
		if(a2[i].value == "Yes"){
			for(var b = 0; b < a21.length; b++){
				if(a21[b].checked){
					if(a21[b].value != "others"){
						A2 += a21[b].value;
					}
					else if(a21[b].value == "others"){
						var others = document.getElementById('others').value;
						A2 += others;
					}
				}
			}
		}
			else if(a2[i].value == "No"){
				A2 += a2[i].value;
			}
		}
	}

	for(var i = 0; i < a3.length; i++){
		if(a3[i].checked){
			A3 += a3[i].value;
		}
	}

	for(var i = 0; i < a5.length; i++){
		if(a5[i].checked){
		if(a5[i].value == "Yes"){
			for(var b = 0; b < a51.length; b++){
				if(a51[b].checked){
					if(a51[b].value != "others"){
						A5 += a51[b].value;
					}
					else if(a51[b].value == "others"){
						var others = document.getElementById('a5others').value;
						A5 += others;
					}
				}
			}
		}
			else if(a5[i].value == "No"){
				A5 += a5[i].value;
			}
		}
	}

	for(var i = 0; i < b1.length; i++){
		if(b1[i].checked){
			if(b1[i].value != "others"){
			B1 += b1[i].value + " ";
		} 
		if(b1[i].value == "others"){
			var others = document.getElementById('b1others').value;
			B1 += b1[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < b2.length; i++){
		if(b2[i].checked){
			if(b2[i].value != "others"){
			B2 += b2[i].value + " ";
		} 
		if(b2[i].value == "others"){
			var others = document.getElementById('b2others').value;
			B2 += b2[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < b3.length; i++){
		if(b3[i].checked){
			if(b3[i].value != "others"){
			B3 += b3[i].value + " ";
		} 
		if(b3[i].value == "others"){
			var others = document.getElementById('b3others').value;
			B3 += b3[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < b4.length; i++){
		if(b4[i].checked){
			if(b4[i].value != "others"){
			B4 += b4[i].value + " ";
		} 
		if(b4[i].value == "others"){
			var others = document.getElementById('b4others').value;
			B4 += b4[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c1.length; i++){
		if(c1[i].checked){
			C1 += c1[i].value;
		}
	}

	for(var i = 0; i < c2.length; i++){
		if(c2[i].checked){
			C2 += c2[i].value;
		}
	}

	for(var i = 0; i < c3.length; i++){
		if(c3[i].checked){
			C3 += c3[i].value;
		}
	}

	for(var i = 0; i < c4.length; i++){
		if(c4[i].checked){
			C4 += c4[i].value;
		}
	}

	for(var i = 0; i < c5.length; i++){
		if(c5[i].checked){
			C5 += c5[i].value;
		}
	}

	for(var i = 0; i < c6.length; i++){
		if(c6[i].checked){
			if(c6[i].value != "others"){
			C6 += c6[i].value + " ";
		} 
		if(c6[i].value == "others"){
			var others = document.getElementById('c6others').value;
			C6 += c6[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c7.length; i++){
		if(c7[i].checked){
			if(c7[i].value != "others"){
			C7 += c7[i].value + " ";
		} 
		if(c7[i].value == "others"){
			var others = document.getElementById('c7others').value;
			C7 += c7[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c71.length; i++){
		if(c71[i].checked){
			C7level += c71[i].value;
		}
	}

	for(var i = 0; i < c8.length; i++){
		if(c8[i].checked){
			C8 += c8[i].value;
		}
	}

	for(var i = 0; i < c81.length; i++){
		if(c81[i].checked){
			C8condition += c81[i].value;
		}
	}

	for(var i = 0; i < c9.length; i++){
		if(c9[i].checked){
			C9segregation += c9[i].value;
		}
	}

	for(var i = 0; i < c91.length; i++){
		if(c91[i].checked){
			C9used += c91[i].value;
		}
	}

	for(var i = 0; i < c92.length; i++){
		if(c92[i].checked){
			C9container += c92[i].value;
		}
	}

	for(var i = 0; i < c93.length; i++){
		if(c93[i].checked){
			if(c93[i].value != "others"){
			C9method += c93[i].value + " ";
		} 
		if(c93[i].value == "others"){
			var others = document.getElementById('c9others').value;
			C9method += c93[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c10.length; i++){
		if(c10[i].checked){
			if(c10[i].value != "others"){
			C10toilet += c10[i].value + " ";
		} 
		if(c10[i].value == "others"){
			var others = document.getElementById('c10others').value;
			C10toilet += c10[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c101.length; i++){
		if(c101[i].checked){
			C10level += c101[i].value;
		}
	}

	for(var i = 0; i < c102.length; i++){
		if(c102[i].checked){
			C10ownership += c102[i].value;
		}
	}

	var C10distance = document.getElementById('c10distance').value;

	for(var i = 0; i < c103.length; i++){
		if(c103[i].checked){
			C10sanitary += c103[i].value;
		}
	}

	for(var i = 0; i < c12.length; i++){
		if(c12[i].checked){
			if(c12[i].value == "specify"){
				var specify = document.getElementById('c12specify').value;
				C12 += specify;
			} else if(c12[i].value == "None"){
				C12 += "None";
			}
		}
	}

	for(var i = 0; i < c13.length; i++){
		if(c13[i].checked){
			if(c13[i].value == "others"){
				var others = document.getElementById('c13others').value;
				C13 +=  c13[i].value + " " + others;
			} else if(c13[i].value != "others"){
				C13 += c13[i].value + " ";
			}
		}
	}

	for(var i = 0; i < c131.length; i++){
		if(c131[i].checked){
			if(c131[i].value == "others"){
				var others = document.getElementById('c131others').value;
				C131 += c131[i].value + " " + others;
			} else if(c131[i].value != "others"){
				C131 += c131[i].value + " ";
			}
		}
	}

	db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_community_as_a_social_System" (
		  A1 TEXT,
		  A2 TEXT,
		  A3 TEXT,
		  A4 TEXT,
		  A5 TEXT,
		  B1 TEXT,
		  B2 TEXT,
		  B3 TEXT,
		  B4 TEXT,
		  C1 TEXT,
		  C2 TEXT,
		  C3 TEXT,
		  C4 TEXT,
		  C5 TEXT,
		  C6 TEXT,
		  C7 TEXT,
		  C7_Level TEXT,
		  C8 TEXT,
		  C8_Condition TEXT,
		  C9_Segregation TEXT,
		  C9_Container_Used TEXT,
		  C9_Container TEXT,
		  C9_Method_Of_Disposal TEXT,
		  C10_Toilet_Facilities TEXT,
		  C10_Level TEXT,
		  C10_Ownership TEXT,
		  C10_Distance_to_Toilet_Facility TEXT,
		  C10_Sanitary_Condition TEXT,
		  C12 TEXT,
		  C13_Presence_of_Vectors_and_Rodents TEXT,
		  C13_Ways_in_Controlling_Vectors TEX
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_community_as_a_social_System`) || err.message.includes(`database ${head}.db already exists`))) {
			console.log(`${head}_community_as_a_social_System`);
		  } else if (err) {
			console.log(err);
		  } else {
			db.run(`INSERT INTO "${head}_community_as_a_social_System" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
			[	A1, 
				A2, 
				A3, 
				A4, 
				A5, 
				B1, 
				B2, 
				B3, 
				B4, 
				C1, 
				C2, 
				C3, 
				C4, 
				C5, 
				C6, 
				C7, 
				C7level, 
				C8, 
				C8condition, 
				C9segregation, 
				C9used, 
				C9container, 
				C9method,
				C10toilet,
				C10level,
				C10ownership,
				C10distance,
				C10sanitary,
				C12,
				C13,
				C131
			], function (err) {
			  if (err) {
				console.log(err);
			  } else {
				console.log('success');
			  }
			});
		  }
		}
	  );

	  db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Domestic_Animals" (
		  Kind TEXT,
		  Number TEXT,
		  Where_Kept TEXT,
		  With_Vaccination TEXT,
		  Without_Vaccination TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Domestic_Animals already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			console.log(`${head}_Domestic_Animals already exists`);
		  } else if (err) {
			console.log(err);
		  } else {
			var table = document.getElementById('datable');
			if (!table) {
			  console.log('Table not found');
			  return;
			}
			var table = document.getElementById("datable");
			if (table) {
			  var tbody = table.getElementsByTagName('tbody')[0];
			  var promises = [];
			  for (var i = 1; i < tbody.rows.length+1; i++) {
				var kind = document.getElementById("kind"+`${i}`).value;
				var number = document.getElementById("number"+`${i}`).value;
				var where = document.getElementById("where"+`${i}`).value;
				var vaccine = document.getElementById("vaccine"+`${i}`).value;
				var novaccine = document.getElementById("novaccine"+`${i}`).value;
				var promise = new Promise(function(resolve, reject) {
				  db.run(`INSERT INTO "${head}_Domestic_Animals" VALUES (?, ?, ?, ?, ?)`, 
					[kind, number, where, vaccine, novaccine], function (err) {
					  if (err) {
						console.log(err);
						reject(err);
					  } else {
						console.log('success');
						resolve();
					  }
					});
				});
				promises.push(promise);
			  }
			  Promise.all(promises)
				.then(function() {
				  console.log("All data inserted successfully");
				})
				.catch(function(err) {
				  console.log("Error inserting data:", err);
				});
			}
		  }
		}
	);
}

  function addnew1() { 
    var table = document.getElementById("datable");
	if (table) {
	  var tbody = table.getElementsByTagName('tbody')[0];
	  var row = tbody.insertRow(-1);
	  var cell1 = row.insertCell(0);
	  var cell2 = row.insertCell(1);
	  var cell3 = row.insertCell(2);
	  var cell4 = row.insertCell(3);
	  var cell5 = row.insertCell(4);
	  var rowCount = tbody.rows.length;
	  cell1.innerHTML = `<input type='text' id='kind${rowCount}'>`;
	  cell2.innerHTML = `<input type='text' id='number${rowCount}'>`;
	  cell3.innerHTML = `<input type='text' id='where${rowCount}'>`;
	  cell4.innerHTML = `<input type='text' id='vaccine${rowCount}'>`;
	  cell5.innerHTML = `<input type='text' id='novaccine${rowCount}'>`;
	}
}

function deleteit1(){
    var table = document.getElementById("datable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew2() { 
    var table = document.getElementById('mfptable');
    var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		cell1.innerHTML = "<input type='text' >";
		cell2.innerHTML = "<input type='text' >";
		cell3.innerHTML = "<input type='radio'>Yes &nbsp; <input type='radio'>No";
		cell4.innerHTML = "<input type='text' >";
		cell5.innerHTML = "<input type='text' >";
}

function deleteit2(){
    var table = document.getElementById("mfptable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew3() { 
    var table = document.getElementById('istagtable');
    var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		var cell7 = row.insertCell(6);
		var cell8 = row.insertCell(7);
		var cell9 = row.insertCell(8);
		var cell10 = row.insertCell(9);
		cell1.innerHTML = "<input type='text' >";
		cell2.innerHTML = "<input type='text' >";
		cell3.innerHTML = "<input type='text' >";
		cell4.innerHTML = "<input type='text' >";
		cell5.innerHTML = "<input type='checkbox' >1<input type='checkbox' >2<input type='checkbox' >3";
		cell6.innerHTML = "<input type='checkbox' >1<input type='checkbox' >2<input type='checkbox' >3";
		cell7.innerHTML = "<input type='checkbox' >1<input type='checkbox' >2<input type='checkbox' >3";
		cell8.innerHTML = "<input type='text' >";
		cell9.innerHTML = "<input type='checkbox' >1<input type='checkbox' >2";
		cell10.innerHTML = "<input type='checkbox' >Inc<input type='checkbox' >CIC<input type='checkbox' >FIC";

}

function deleteit3(){
    var table = document.getElementById("istagtable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew4() { 
    var table = document.getElementById('mctable');
    var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		cell1.innerHTML = "<input type='text' >";
		cell2.innerHTML = "<input type='text' >";
		cell3.innerHTML = "<input type='text' >";
		cell4.innerHTML = "<input type='text' >";
		cell5.innerHTML = "<input type='radio' >Yes<input type='radio' >No";
		cell6.innerHTML = "<input type='checkbox' >TT1<input type='checkbox' >TT2<input type='checkbox' >TT3<input type='checkbox' >TT4<input type='checkbox' >TT5";

}

function deleteit4(){
    var table = document.getElementById("mctable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew5() { 
    var table = document.getElementById('morbtable');
    var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		cell1.innerHTML = "<input type='text' >";
		cell2.innerHTML = "<input type='text' >";
		cell3.innerHTML = "<input type='text' >";
		cell4.innerHTML = "<input type='text' >";
		cell5.innerHTML = "<input type='text' >";
		cell6.innerHTML = "<input type='text' >";

}

function deleteit5(){
    var table = document.getElementById("morbtable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew6() { 
    var table = document.getElementById('morttable');
    var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = "<input type='text' >";
		cell2.innerHTML = "<input type='text' >";
		cell3.innerHTML = "<input type='text' >";
		cell4.innerHTML = "<input type='text' >";
}

function deleteit6(){
    var table = document.getElementById("morttable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}
  
  



