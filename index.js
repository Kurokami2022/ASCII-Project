
function addnew() { 
    var table = document.getElementById('captable');
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
		var cell11 = row.insertCell(10);
		cell1.innerHTML = "<input type='text' class='nowidth'>";
		cell2.innerHTML = "<input type='text' class='nhmwidth'>";
		cell3.innerHTML = "<input type='text' class='rthwidth'>";
		cell4.innerHTML = "<input type='text' class='agewidth'>";
		cell5.innerHTML = "<input type='text' class='sexwidth'>";
		cell6.innerHTML = "<input type='text' class='bdwidth'>";
		cell7.innerHTML = "<input type='text' class='cswidth'>";
		cell8.innerHTML = "<input type='text' class='occwidth'>";
		cell9.innerHTML = "<input type='text' class='oswidth'>";
		cell10.innerHTML = "<input type='text' class='heawidth'>";
		cell11.innerHTML = "<input type='text' class='relwidth'>";
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
  
	var db = new sqlite3.Database("./Databases/"  + head + ".db");
	console.log(head);
	db.run(
	  `CREATE TABLE IF NOT EXISTS "${head}" (
		Family_Head TEXT,
		No_of_Family_Member TEXT,
		address TEXT,
		length TEXT,
		ethnic TEXT,
		famtype TEXT,
		primdia TEXT
	  )`,
	  function (err) {
		if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head} already exists`) || err.message.includes(`database ${head}.db already exists`))) {
		  console.log(`${head} already exists`);
		} else if (err) {
		  console.log(err);
		} else {
		  db.run(`INSERT INTO "${head}" VALUES (?, ?, ?, ?, ?, ?, ?)`, [head, numfam, address, length, ethnic, famtype, primdia], function (err) {
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
  
  
  



