import fs from "fs";
import productService from "../service/playerService.js";
import qs from "qs";
import url from "url";

import playerService from "../service/playerService.js";

class PlayerController {


    showAll(req, res) {
        if (req.method === "GET") {
            let urlObject = url.parse(req.url, true);
            if (!urlObject.query.search) {
                showList(req, res, '');
            } else {
                showList(req, res, urlObject.query.search);
            }
        }

    }

    edit(req, res) {
        let data = '';
        req.on('data', dataRaw => {

            data += dataRaw;
        })
        req.on('end', () => {
            let urlObject = url.parse(req.url, true)
            if (req.method === 'GET') {
                fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
                    productService.findById(urlObject.query.idEdit).then((player) => {
                        stringHTML = stringHTML.replace('{id}', player.id);
                        stringHTML = stringHTML.replace('{name}', player.name);
                        stringHTML = stringHTML.replace('{age}', player.age);
                        stringHTML = stringHTML.replace('{height}', player.height);
                        stringHTML = stringHTML.replace('{nationality}', player.nationality);
                        stringHTML = stringHTML.replace('{clb}', player.clb);
                        stringHTML = stringHTML.replace('{vitri}', player.vitri);
                        stringHTML = stringHTML.replace('{dateofjoin}', (player.dateofjoin).toLocaleString());
                        stringHTML = stringHTML.replace('{salary}', player.salary);
                        stringHTML = stringHTML.replace('{img}', player.img);
                        res.write(stringHTML);
                        res.end();
                    });
                })
            } else {
                data = qs.parse(data);
                playerService.update(data).then(() => {
                    res.writeHead(301, {'location': '/players'})
                    res.end()
                });
            }
        })
    }

    delete(req, res) {
        if (req.method === 'GET') {
            let urlObject = url.parse(req.url, true);
            playerService.delete(urlObject.query.idDelete).then(() => {
                res.writeHead(301, {'location': '/players'})
                res.end()
            })
        }
    }

    add(req, res) {
        if (req.method === 'GET') {
            fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
                res.write(stringHTML);
                res.end();
            })
        } else {
            let data = '';
            req.on('data', dataRaw => {
                data += dataRaw;
            })
            req.on('end', () => {
                data = qs.parse(data);
                playerService.save(data).then(() => {
                    res.writeHead(301, {'location': '/players'})
                    res.end()
                });
            })
        }
    }
}
function showList(req, res, searchValue) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let str = '<table class="table table-hover table-striped align-middle text-center">';
        playerService.findAll(searchValue).then((players)=> {
            str += `<tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Height</th>
                    <th>Nationality</th>
                    <th>CLB</th>
                    <th>Vị trí</th>
                    <th>Ngày vào CLB</th>
                    <th>Img</th>
                    <th>Lựa chọn</th>
                   
                </tr>`
            for (const player of players) {
                str += `
                     <tr>
                    <td>${player.id}</td>
                    <td><a class="text-decoration-none" href="/index">${player.name}</a></td>
                   <td>${player.age}</td>
                   <td>${player.height}</td>
                    <td>${player.nationality}</td>
                    <td>${player.clb}</td>
                    <td>${player.vitri}</td>
                    <td>${player.dateofjoin}</td>
                    <td>${player.salary}</td>
                    <td>${player.img}</td>
                   
                  
                    
                   <td><a href="/edit-player?idEdit=${player.id}" class="btn btn-primary"><i class="fa-solid fa-pencil"></i></a>
                    <a onclick="return confirm('Bạn có chắc chắn muốn xóa không?')" 
                     class="btn btn-danger" href="/delete-player?idDelete=${player.id}"><i class="fa-solid fa-trash-can"></i>
                     </a>
                    </td>
                   
                    </tr>
                        `
            }
            str += `</table>`
            stringHTML = stringHTML.replace('{listPlayer}',str);

            res.write(stringHTML);
            res.end();
        })
    })
}

export default new PlayerController();
