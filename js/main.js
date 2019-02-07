if (window.openDatabase) {
    var mydb = openDatabase("latihan", "0.1", "Belajar yang rajin.", 3 * 1024 * 1024);

    mydb.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS barang (id_barang INTEGER PRIMARY KEY ASC, nama_barang VARCHAR(25), deskripsi TEXT, satuan VARCHAR(15), stok INTEGER)");
    });
    mydb.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS barang_masuk (id_masuk INTEGER PRIMARY KEY ASC, barang INTEGER, tanggal TEXT, jumlah_barang INTEGER)");
    });

} else {
    alert("Hp Mu Kurang Canggih Tuku Maneh Reng Anyar !!");
}

function getBarangs() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM barang", [], function (transaction, results) {
                var listholder = document.getElementById("databarang");
                listholder.innerHTML = "";

                var i;
                for (i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    console.log(row);
                    listholder.innerHTML += `<li class="list-item list-item--material">
                        <div class="list-item__center list-item--material__center">
                            <div class="list-item__title list-item--material__title">ID ${row.id_barang}</div>
                            <div class="list-item__subtitle list-item--material__subtitle">
                                <ons-row>
                                    <ons-col>
                                    Nama Barang
                                    </ons-col>
                                    <ons-col>
                                    ${row.nama_barang}
                                    </ons-col>
                                </ons-row>
                                <ons-row>
                                    <ons-col>
                                    Deskripsi
                                    </ons-col>
                                    <ons-col>
                                    ${row.deskripsi}
                                    </ons-col>
                                </ons-row>
                                <ons-row>
                                    <ons-col>
                                    Satuan
                                    </ons-col>
                                    <ons-col>
                                    ${row.satuan} 
                                    </ons-col>
                                </ons-row>
                                <p>
                                    <button class="button button--material" onclick="edit_form(${row.id_barang} )">Edit</button>
                                    <button class="button button--material" onclick="deleteBarang(${row.id_barang} )">Hapus</button>
                                </p>
                            </div>
                        </div>
                    </li>`;
                }

            });
        });
    } else {
        alert("database tidak ditemukan, browser tidak support web sql !");
    }
}

function addBarang() {
    if (mydb) {
        var fnama_barang = document.getElementById('nama_barang').value;
        var fdeskripsi = document.getElementById('deskripsi').value;
        var fsatuan = document.getElementById('satuan').value;

        if (fnama_barang !== "" && fdeskripsi !== "" && fsatuan !== "") {
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO barang (nama_barang, deskripsi,satuan) VALUES (?,?,?)", [fnama_barang, fdeskripsi, fsatuan], function (transaction, result) {
                    console.log(result);
                    fn.load("crud1.html");
                });
            });

        } else {
            alert("Form harus diisi !");
        }
    } else {
        alert("database tidak ditemukan, browser tidak support web sql !");
    }
}

function edit_form(id) {
    if (mydb) {
        mydb.transaction(function (t) {
            var formholder = document.getElementById("form-barang");

            formholder.innerHTML = "";

            t.executeSql("SELECT * FROM barang where id_barang=?", [id], function (tx, results) {
                formholder.innerHTML =
                    `<div><input class="text-input text-input--material" placeholder="Nama Barang" id="nama_barang" type="text" value="${results.rows.item(0).nama_barang}"
                required></div>
                <br />
                <div><input class="text-input text-input--material" placeholder="Deskripsi" id="deskripsi" type="text" value="${results.rows.item(0).deskripsi}" required></div>
                <br />
                <div><input class="text-input text-input--material" placeholder="Satuan" id="satuan" type="text" value="${results.rows.item(0).satuan}" required></div>
                <br />
                <button class="button button--material" type="submit" onclick="updateBarang(${results.rows.item(0).id_barang})">Simpan</button>`;
            });
        });
    } else {
        alert("databse tidak ditemukan, browser tidak support web sql !");

    }
}

function updateBarang(id_barang) {
    if (mydb) {
        var fnama_barang = document.getElementById('nama_barang').value;
        var fdeskripsi = document.getElementById('deskripsi').value;
        var fsatuan = document.getElementById('satuan').value;

        if (fnama_barang !== "" && fdeskripsi !== "" && fsatuan !== "") {
            mydb.transaction(function (t) {
                t.executeSql("UPDATE barang SET nama_barang=?, deskripsi=?, satuan=? WHERE id_barang=?", [fnama_barang, fdeskripsi, fsatuan, id_barang], function (transaction, result) {
                    console.log(result);
                    fn.load("crud1.html");
                });
            });
        } else {
            alert("Form harus diisi !");
        }
    } else {
        alert("database tidak ditemukan, browser tidak support web sql !");
    }
}

function deleteBarang(id) {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM barang WHERE id_barang=?", [id], function (transaction, result) {
                console.log(result);
                fn.load("crud1.html");
            });
        });
    } else {
        alert("database tidak di temukan, browser tidak support web sql !");
    }
}

function selectBarang() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM barang", [], function (transaction, results) {
                var listholder = document.getElementById("id_barang");
                listholder.innerHTML = "";

                var i;
                for (i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    listholder.innerHTML += `<option value="${row.id_barang}">${row.nama_barang}</option>`;
                }
            });
        });
    } else {
        alert("database tidak ditemukan, browser tidak support web sql !");
    }
}
function selectedBarang(id) {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM barang", [], function (transaction, results) {
                var listholder = document.getElementById("id_barang");
                listholder.innerHTML = "";

                var i;
                for (i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    if(row.id_barang == id){
                        listholder.innerHTML += `<option value="${row.id_barang}" selected>${row.nama_barang}</option>`;
                    } else {
                        listholder.innerHTML += `<option value="${row.id_barang}">${row.nama_barang}</option>`;
                    }
                }
            });
        });
    } else {
        alert("database tidak ditemukan, browser tidak support web sql !");
    }
}

function addBarangMasuk() {
    if (mydb) {
        var fid_barang = document.getElementById('id_barang').value;
        var ftanggal = document.getElementById('tanggal').value;
        var fjumlahbarang = document.getElementById('jumlahbarang').value;

        if (fid_barang !== "" && ftanggal !== "" && fjumlahbarang !== "") {
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO barang_masuk (barang, tanggal, jumlah_barang) VALUES (?,?,?)", [fid_barang, ftanggal, fjumlahbarang], function (transaction, result) {
                    console.log(result);
                    fn.load("crud2.html");
                });
            });
        } else {
            alert("Form harus diisi !");
        }
    } else {
        alert("database tidak ditemukan, browser tidak support web sql !");
    }
}

function getBarangMasuks() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT barang_masuk.id_masuk, barang.nama_barang, barang_masuk.tanggal, barang_masuk.jumlah_barang FROM barang_masuk join barang where barang_masuk.barang = barang.id_barang", [], function (transaction, results) {
                var listholder = document.getElementById("databarangmasuk");
                listholder.innerHTML = "";

                var i;
                for (i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    console.log(row);
                    listholder.innerHTML += `<li class="list-item list-item--material">
                        <div class="list-item__center list-item--material__center">
                            <div class="list-item__title list-item--material__title">ID ${row.id_masuk}</div>
                            <div class="list-item__subtitle list-item--material__subtitle">
                                <ons-row>
                                    <ons-col>
                                    Nama Barang
                                    </ons-col>
                                    <ons-col>
                                    ${row.nama_barang}
                                    </ons-col>
                                </ons-row>
                                <ons-row>
                                    <ons-col>
                                    Tanggal
                                    </ons-col>
                                    <ons-col>
                                    ${row.tanggal}
                                    </ons-col>
                                </ons-row>
                                <ons-row>
                                    <ons-col>
                                    Jumlah Barang
                                    </ons-col>
                                    <ons-col>
                                    ${row.jumlah_barang} 
                                    </ons-col>
                                </ons-row>
                                <p>
                                    <button class="button button--material" onclick="masuk_edit(${row.id_masuk} )">Edit</button>
                                    <button class="button button--material" onclick="deleteMasuk(${row.id_masuk} )">Hapus</button>
                                </p>
                            </div>
                        </div>
                    </li>`;
                }

            });
        });
    } else {
        alert("database tidak ditemukan, browser tidak support web sql !");
    }
}

function deleteMasuk(id) {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM barang_masuk WHERE id_masuk=?", [id], function (transaction, result) {
                console.log(result);
                fn.load("crud2.html");
            });
        });
    } else {
        alert("database tidak di temukan, browser tidak support web sql !");
    }
}

function masuk_edit(id) {
    if (mydb) {
        mydb.transaction(function (t) {
            var formholder = document.getElementById("form-masuk");

            formholder.innerHTML = "";

            t.executeSql("SELECT * FROM barang_masuk where id_masuk=?", [id], function (tx, results) {
                formholder.innerHTML =
                    `<div>
					<select class="select-input" id="id_barang">
						${selectedBarang(results.rows.item(0).barang)}
					</select>
				</div>
				<br />
                <div>
                    <input class="text-input text-input--material" value="${results.rows.item(0).tanggal}" type="date" id="tanggal" required>
                </div>
                <br />
                <div>
                    <input class="text-input text-input--material" placeholder="Jumlah Barang" value="${results.rows.item(0).jumlah_barang}"  type="number" id="jumlahbarang"
                        required>
                </div>
                <br />
                <button class="button button--material" type="submit" onclick="updateBarangMasuk(${results.rows.item(0).id_masuk})">Simpan</button>`;
            });
        });
    } else {
        alert("databse tidak ditemukan, browser tidak support web sql !");

    }
}

function updateBarangMasuk(id) {
    if (mydb) {
        var fid_barang = document.getElementById('id_barang').value;
        var ftanggal = document.getElementById('tanggal').value;
        var fjumlah_barang = document.getElementById('jumlahbarang').value;

        if (ftanggal !== "" && fjumlah_barang !== "") {
            mydb.transaction(function (t) {
                t.executeSql("UPDATE barang_masuk SET barang=?, tanggal=?, jumlah_barang=? WHERE id_masuk=?", [fid_barang, ftanggal, fjumlah_barang, id], function (transaction, result) {
                    console.log(result);
                    fn.load("crud2.html");
                });
            });

        } else {
            alert("Form harus diisi !");
        }
    } else {
        alert("database tidak ditemukan, browser tidak support web sql !");
    }
}
