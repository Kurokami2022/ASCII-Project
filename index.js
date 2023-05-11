
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
			var others = document.getElementById('b1others').value
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
			var others = document.getElementById('b2others').value
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
			var others = document.getElementById('b3others').value
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
			var others = document.getElementById('b4others').value
			B4 += b4[i].value + " " + others;
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
		  B4 TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_community_as_a_social_System`) || err.message.includes(`database ${head}.db already exists`))) {
			console.log(`${head}_community_as_a_social_System`);
		  } else if (err) {
			console.log(err);
		  } else {
			db.run(`INSERT INTO "${head}_community_as_a_social_System" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
			[A1, A2, A3, A4, A5, B1, B2, B3, B4], function (err) {
			  if (err) {
				console.log(err);
			  } else {
				console.log('success');
			  }
			});
		  }
		}
	  );

}

  function addnew1() { 
    var table = document.getElementById('datable');
    var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		cell1.innerHTML = "<input type='text' >";
		cell2.innerHTML = "<input type='text' >";
		cell3.innerHTML = "<input type='text' >";
		cell4.innerHTML = "<input type='text' >";
		cell5.innerHTML = "<input type='text' >";
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
  
  



