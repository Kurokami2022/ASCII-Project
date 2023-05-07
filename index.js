
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
  
  
  



