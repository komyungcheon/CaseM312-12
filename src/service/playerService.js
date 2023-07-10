import connection from "../connection.js";


class PlayerService {
    constructor() {
        connection.connecting();
    }

    findAll(searchValue) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from players WHERE name like '%${searchValue}%' order by id`, (err, players) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(players)
                }
            })
        })
    }

    save(player) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO players(name,age,height,nationality,clb,vitri,dateofjoin,salary,img) VALUES ('${player.name}', ${player.age}, ${player.height}, '${player.nationality}', '${player.clb}', '${player.vitri}', '${player.dateofjoin}', ${player.salary},'${player.img}')`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }


    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from players where id = ${id}`, (err, players) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(players[0])
                }
            })
        })
    }
    delete(idDelete) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM players WHERE id = ${idDelete}`, (err, delPlayer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(delPlayer);
                }
            });


        });
    }
    // searchProduct(searchValue) {
    //     return new Promise((resolve, reject) => {
    //         connection.getConnection().query(`SELECT * FROM product WHERE name like '%${searchValue}%' order by name`, (err, products) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(products);
    //             }
    //         });
    //     });
    // }


    update(player) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(

                `update players 
                        set     
                        id  = ${player.id},
                        name = '${player.name}', 
                        age= ${player.age}, 
                        height = ${player.height},
                        nationality ='${player.nationality}',
                        clb ='${player.clb}',
                        vitri = '${player.vitri}',
                        dateofjoin = '${player.dateofjoin}', 
                        salary = ${player.salary},
                        img = '${player.img}'
                       
                       
                    where id = ${player.id}`, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)

                    }
                })
        })

    }
}

export default new PlayerService();