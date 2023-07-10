import fs from "fs";

import qs from "qs";
import url from "url";

import productService from "../service/productService.js";

class ProductController {


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
                    productService.findById(urlObject.query.idEdit).then((product) => {
                        stringHTML = stringHTML.replace('{id}', product.id);
                        stringHTML = stringHTML.replace('{name}', product.name);
                        stringHTML = stringHTML.replace('{age}', product.price);
                        stringHTML = stringHTML.replace('{height}', product.quantity);
                        res.write(stringHTML);
                        res.end();
                    });
                })
            } else {
                data = qs.parse(data);
                productService.update(data).then(() => {
                    res.writeHead(301, {'location': '/product'})
                    res.end()
                });
            }
        })
    }

    delete(req, res) {
        if (req.method === 'GET') {
            let urlObject = url.parse(req.url, true);
            productService.delete(urlObject.query.idDelete).then(() => {
                res.writeHead(301, {'location': '/product'})
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
               productService.save(data).then(() => {
                    res.writeHead(301, {'location': '/product'})
                    res.end()
                });
            })
        }
    }
}
function showList(req, res, searchValue) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let str = '<table class="table table-hover table-striped align-middle text-center">';
        productService.findAll(searchValue).then((products)=> {
            str += `<tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>`
            for (const product of products) {
                str += `
                   <div class="card" style="width: 18rem;">
  <img src="${product.image}" class="card-img-top-fluid" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.id}. ${product.name}</h5>
    <p class="card-text">$ ${product.price}</p>
    <p class="card-text">Số lượng: ${product.quantity}</p>
    <a href="/edit-product" class="btn btn-primary">Edit</a>
  </div>
</div>
                        `
            }
            stringHTML = stringHTML.replace('{listProduct}',str);
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
