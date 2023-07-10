import fs from "fs";
import qs from "qs";
import {BaseController} from "./baseController.js";
import accountService from "../service/accountService.js";

class HomeController {
    async showHome(req, res) {
        let data = await BaseController.readFileData('session/data.json').catch((err) => {
            console.log(err.message);
        });
        let htmlReplace = '';
        let navReplace = '';
        if (data !== '') {
            data = JSON.parse(data.toString());
            htmlReplace = `
                <ul class="nav_items dropdown">
                  <li class="nav_item dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    ${data.username}
                  </li>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="/logout">LogOut</a></li>
                  </ul>
                </ul>
            `;
            navReplace = `<a href="/product" class="nav_link">Danh sách sản phẩm</a>`
        } else {
            htmlReplace = '<button class="button" id="form-open">Login</button>'
            navReplace = `<a class="nav_link" id="login-open">Players</a>`
        }
        let stringHTML = await BaseController.readFileData('view/product/home.html');
        stringHTML = stringHTML.replace("{infoUser}", htmlReplace);
        stringHTML = stringHTML.replace("{nav}", navReplace);
        res.write(stringHTML);
        res.end();
    }

    login(req, res) {
        let data = '';
        req.on('data', dataRaw => {

            data += dataRaw;
        })
        req.on('end', () => {
            data = qs.parse(data);
            let {username, password} = data;
            accountService.login(username, password).then(async (account) => {
                if (account.length !== 0) {
                    await BaseController.writeFileData('session/data.json', JSON.stringify(account[0])).catch(err => console.log(err.message))
                }
                res.writeHead(301, {'location': '/'})
                res.end()
            });
        })
    }

    async logout(req, res) {
        await BaseController.writeFileData('session/data.json', '').catch(err => console.log(err.message));
        res.writeHead(301, {'location': '/'})
        res.end()
    }

    showErr(req, res) {
        fs.readFile('view/product/err.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
}

export default new HomeController();
