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
    sortByPrice(req, res) {
        fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            const urlObject = url.parse(req.url, true);
            productService.findByPrice().then((products) => {
                for (const product of products) {
                    str +=`
                <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                            <!-- Sale badge-->
                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Hot</div>
                            <!-- Product image-->
                            <img class="card-img-top img-fluid" style="height: 350px" src="${product.image}" alt="...">
                            <!-- Product details-->
<!--                            <div class="card-body p-4">-->

<!--                            </div>-->
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center" style="min-height: 125px">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${product.id}.${product.name}</h5>
                                    <!-- Product price-->
                                    <span class="text-decoration">${product.price}$</span>
                                    <br>
                                    <span class="text-decoration">Số lượng :${product.quantity}</span>
                                </div>
                                <div class="d-flex justify-content-center mt-3">
                                    <a href="/edit-product?idEdit=${product.id}" class="btn btn-primary me-1"><i class="fa-solid fa-pencil"></i>
                                    </a>
                                    <a onclick="return confirm('Bạn có chắc chắn muốn xóa không?')"
                             href="/delete-product?idDelete=${product.id}" class="btn btn-danger ms-1"><i class="fa-solid fa-trash-can"></i>
                                    </a>
                                </div>
                           </div>
                        </div>
                    </div>`
                }
                stringHTML = stringHTML.replace('{listProduct}', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }

    sortByQuantity(req, res) {
        fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            const urlObject = url.parse(req.url, true);
            productService.findByQuantity().then((products) => {
                for (const product of products) {
                    str +=`
                <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                            <!-- Sale badge-->
                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Hot</div>
                            <!-- Product image-->
                            <img class="card-img-top img-fluid" style="height: 350px" src="${product.image}" alt="...">
                            <!-- Product details-->
<!--                            <div class="card-body p-4">-->

<!--                            </div>-->
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center" style="min-height: 125px">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${product.id}.${product.name}</h5>
                                    <!-- Product price-->
                                    <span class="text-decoration">${product.price}$</span>
                                    <br>
                                    <span class="text-decoration">Số lượng :${product.quantity}</span>
                                </div>
                                <div class="d-flex justify-content-center mt-3">
                                    <a href="/edit-product?idEdit=${product.id}" class="btn btn-primary me-1"><i class="fa-solid fa-pencil"></i>
                                    </a>
                                    <a onclick="return confirm('Bạn có chắc chắn muốn xóa không?')"
                             href="/delete-product?idDelete=${product.id}" class="btn btn-danger ms-1"><i class="fa-solid fa-trash-can"></i>
                                    </a>
                                </div>
                           </div>
                        </div>
                    </div>`
                }
                stringHTML = stringHTML.replace('{listProduct}', str)
                res.write(stringHTML);
                res.end();
            })
        })
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
                        stringHTML = stringHTML.replace('{price}', product.price);
                        stringHTML = stringHTML.replace('{quantity}', product.quantity);
                        stringHTML = stringHTML.replace('{image}', product.image);
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
        let str = '';
        productService.findAll(searchValue).then((products)=> {
            for (const product of products) {
                str +=`
                <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                            <!-- Sale badge-->
                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Hot</div>
                            <!-- Product image-->
                            <img class="card-img-top img-fluid" style="height: 350px" src="${product.image}" alt="...">
                            <!-- Product details-->
<!--                            <div class="card-body p-4">-->

<!--                            </div>-->
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center" style="min-height: 125px">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${product.id}.${product.name}</h5>
                                    <!-- Product price-->
                                    <span class="text-decoration">${product.price}$</span>
                                    <br>
                                    <span class="text-decoration">Số lượng :${product.quantity}</span>
                                </div>
                                <div class="d-flex justify-content-center mt-3">
                                    <a href="/edit-product?idEdit=${product.id}" class="btn btn-primary me-1"><i class="fa-solid fa-pencil"></i>
                                    </a>
                                    <a onclick="return confirm('Bạn có chắc chắn muốn xóa không?')"
                             href="/delete-product?idDelete=${product.id}" class="btn btn-danger ms-1"><i class="fa-solid fa-trash-can"></i>
                                    </a>
                                </div>
                           </div>
                        </div>
                    </div>
                `
//                 str += `
// //             <div class="col-lg-4 col-md-6 mb-4">
// //                 <div class="package-item bg-white mb-2">
// //                     <img class="img-fluid" src="${product.image}" alt="">
// //                     <div class="p-4">
// //                         <div class="d-flex justify-content-between mb-3">
// //                             <small class="m-0"><i class="fa fa-map-marker-alt text-primary mr-2"></i>${product.id}. ${product.name}</small>
// //                             <small class="m-0"><i class="fa fa-calendar-alt text-primary mr-2"></i>Quantity: ${product.quantity}</small>
// //                             <small class="m-0"><i class="fa fa-user text-primary mr-2"></i></small>
// //                         </div>
// //                         <div class="border-top mt-4 pt-4">
// //                             <div class="d-flex justify-content-between">
// //                                 <h5 class="m-0">Price: ${product.price}</h5>
// //                             </div>
// //                             <div>
//                             <a href="/edit-product?idEdit=${product.id}"><i class="fa-solid fa-pencil"></i>
//                             <button class="btn btn-primary">Edit</button>
//                             </a>
//                             <a onclick="return confirm('Bạn có chắc chắn muốn xóa không?')"
//                      href="/delete-product?idDelete=${product.id}"><i class="fa-solid fa-trash-can"></i>
//                       <button class="btn btn-primary">Delete</button>
//                      </a>
// //
// //
// // </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //         </div>`
            }
            stringHTML = stringHTML.replace('{listProduct}',str);
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
