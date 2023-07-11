import connection from "../connection.js";


class ProductService {
    constructor() {
        connection.connecting();
    }

    findAll(searchValue) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from product WHERE name like '%${searchValue}%' order by id`, (err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
    findByPrice() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from product ORDER BY price desc`, (err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }
    findByQuantity() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from product ORDER BY quantity desc`, (err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO product(name,price,quantity,image) VALUES ('${product.name}', ${product.price}, ${product.quantity}, ${product.image})`, (err, data) => {
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
            connection.getConnection().query(`select * from product where id = ${id}`, (err, product) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(product[0])
                }
            })
        })
    }
    delete(idDelete) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM product WHERE id = ${idDelete}`, (err, delProduct) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(delProduct);
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

    update(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(

                `update product 
                        set     
                        id  = ${product.id},
                        name = '${product.name}', 
                        price= ${product.price}, 
                        quantity= ${product.quantity},
                        image= '${product.image}'
                        
                       
                  
                    where id = ${product.id}`, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)

                    }
                })
        })

    }
}

export default new ProductService();