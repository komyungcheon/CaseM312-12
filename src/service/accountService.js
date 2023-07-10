import connection from "../connection.js";

class AccountService {
    constructor() {
        connection.connecting();
    }


    login(username,password) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from users WHERE username = '${username}' and password ='${password}'` , (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            })
        })
    }
}

export default new AccountService();

//jasdnjkbuiafnakjdvbjnc