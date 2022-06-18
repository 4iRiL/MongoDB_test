const {Router} = require('express')
const Prod = require('../models/products')
const Cat1 = require('../models/cat1.js')
const Cat2 = require('../models/cat2.js')
const Cat3 = require('../models/cat3.js')
const Cat4 = require('../models/cat4.js')
const util = require('util')

const router = Router()
const now = new Date()
const date = now.getDate() + '.' + now.getMonth() + '.' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

//INDEX GET

router.get('/', async (req, res) => 
{
    try {
        console.log('---------------------')
        console.log(date + '  index')
        const prods = await Prod.find({}).lean()

        res.render('index', {
            mainTitle: "Find",
            isIndex: true,
            prods
        })

    } catch (e) {
        console.log('err ' + e)
        res.status(500).send(e)
    }

})

// INDEX POST

router.post('/', async (req, res) => 
{
    try {
        // Получаем товары и сравниваем версии
        const prods = await Prod.find({}).lean()
        console.log('find_name: ' + req.body.submit)

        let verCompare = -9999999
        let ans
        let isAns = false

        let n = 0
        while (n < prods.length) {
            p = prods[n]

            if (p.title == req.body.prod_name) {
                ans = p
                isAns = true
                if (verCompare < p.version) {
                    verCompare = p.version
                    ans = p
                    isAns = true
                }
            }

            n++
        }

        if (ans === undefined) {
            ans = 'Nothing found'
        }

        //RENDER

        res.render('index', {
            mainTitle: "Find",
            isIndex: true,
            prods,
            find_name: req.query.prod_name,
            submit: req.query.submit,
            ans: ans,
            isAns
        })

        console.log('ans: ', ans)
    } catch (e) {
        console.log('err', e)
        res.status(500).send(e)
    }
})

//ADD GET

router.get('/add', async (req, res) => 
{
    try {
        console.log(date + '  /add')
        const prods = await Prod.find({}).lean()
        console.log('last prod: ' + util.inspect(prods[prods.length - 1]))

        res.render('add', {
            mainTitle: "add",
            isIndex: false
        })
        
        
    } catch (e) {
        console.log('err ' + e)
        res.status(500).send(e)
    }

})

//ADD POST

router.post('/add', async (req, res) => 
{
    try {
        console.log('-------POST-------')

        const prods = await Prod.find({}).lean()
        const prod = new Prod({
            title: req.body.title,
            price: req.body.price,
            date: date,
            version: req.body.ver
        })
        await prod.save( async (e) => {
            if (e) {
                return handleError(e)
            }
            const prod_id = prod._id
            if (req.body.cat1 != undefined) {
                const cat1 = new Cat1({
                product: {
                    prodId: prod._id,
                    prodTitele: prod.title,
                    prodVer: prod.version
                },
                date: date
                })

                await cat1.save( async (e) => {
                    if (e) {
                        return handeError(e)
                    }
                    const filter = { _id: prod_id}
                    const update = { cat1: cat1.title}
                    await Prod.updateOne(filter, update)
                })
            }

            if (req.body.cat2 != undefined) {
                const cat2 = new Cat2({
                product: {
                    prodId: prod._id,
                    prodTitele: prod.title,
                    prodVer: prod.version
                },
                date: date
                })

                await cat2.save( async (e) => {
                    if (e) {
                        return handeError(e)
                    }
                    const filter = { _id: prod_id}
                    const update = { cat2: cat2.title}
                    await Prod.updateOne(filter, update)
                })
            }
            
            if (req.body.cat3 != undefined) {
                const cat3 = new Cat3({
                product: {
                    prodId: prod._id,
                    prodTitele: prod.title,
                    prodVer: prod.version
                },
                date: date
                })

                await cat3.save( async (e) => {
                    if (e) {
                        return handeError(e)
                    }
                    const filter = { _id: prod_id}
                    const update = { cat3: cat3.title}
                    await Prod.updateOne(filter, update)
                })
            }

            if (req.body.cat4 != undefined) {
                const cat4 = new Cat4({
                product: {
                    prodId: prod._id,
                    prodTitele: prod.title,
                    prodVer: prod.version
                },
                date: date
                })

                await cat4.save( async (e) => {
                    if (e) {
                        return handeError(e)
                    }
                    const filter = { _id: prod_id}
                    const update = { cat4: cat4.title}
                    await Prod.updateOne(filter, update)
                })
            }
        })

        console.log('Saved')
        res.redirect('/')
    } catch (e) {
        console.log('err' + e)
        res.status(500).send(e)
    }
})

router.get('/categories', async (req, res) => {
    res.render('categories', {
        mainTitle: "Categories"
    })
})

router.post('/categories', async (req, res) => 
{
    try {
        const prods = await Prod.find({}).lean()
        const cat1 = await Cat1.find({}).lean()
        const cat2 = await Cat2.find({}).lean()
        const cat3 = await Cat3.find({}).lean()
        const cat4 = await Cat4.find({}).lean()

        const showCat1 = req.body.showCat1 == 'cat1' ? true : false
        const showCat2 = req.body.showCat2 == 'cat2' ? true : false
        const showCat3 = req.body.showCat3 == 'cat3' ? true : false
        const showCat4 = req.body.showCat4 == 'cat4' ? true : false
        const showAvgPrice = req.body.avgPrice == 'avgPrice' ? true : false
        let ansCat1 = []
        let cat1Id = []
        let ansCat2 = []
        let cat2Id = []
        let ansCat3 = []
        let cat3Id = []
        let ansCat4 = []
        let cat4Id = []
        let ansAvgPrice = 0

        //Показать cat1
        if (showCat1) {
            let n = 0
            while (n < cat1.length) {
                if (cat1[n].product != undefined) {
                    if (cat1[n].product.prodId != undefined) {
                        let prodCont = cat1[n].product.prodId
                        cat1Id.push(util.inspect(prodCont))
                    }
                }
                n++
            }
        }

        for (let i = 0; i < prods.length;i++) {
            if (cat1Id.includes(util.inspect(prods[i]._id))) {
                ansCat1.push(prods[i])
            }
        }

        //Показать cat2
        if (showCat2) {
            let n = 0
            while (n < cat2.length) {
                if (cat2[n].product != undefined) {
                    if (cat2[n].product.prodId != undefined) {
                        let prodCont = cat2[n].product.prodId
                        cat2Id.push(util.inspect(prodCont))
                    }
                }
                n++
            }
        }

        for (let i = 0; i < prods.length;i++) {
            if (cat2Id.includes(util.inspect(prods[i]._id))) {
                ansCat2.push(prods[i])
            }
        }
        
        //Показать cat3
        if (showCat3) {
            let n = 0
            while (n < cat3.length) {
                if (cat3[n].product != undefined) {
                    if (cat3[n].product.prodId != undefined) {
                        let prodCont = cat3[n].product.prodId
                        cat3Id.push(util.inspect(prodCont))
                    }
                }
                n++
            }
        }

        for (let i = 0; i < prods.length;i++) {
            if (cat3Id.includes(util.inspect(prods[i]._id))) {
                ansCat3.push(prods[i])
            }
        }

        //Показать cat3
        if (showCat4) {
            let n = 0
            while (n < cat4.length) {
                if (cat4[n].product != undefined) {
                    if (cat4[n].product.prodId != undefined) {
                        let prodCont = cat4[n].product.prodId
                        cat4Id.push(util.inspect(prodCont))
                    }
                }
                n++
            }
        }

        for (let i = 0; i < prods.length;i++) {
            if (cat4Id.includes(util.inspect(prods[i]._id))) {
                ansCat4.push(prods[i])
            }
        }

        let notErrProds = 0

        if (showAvgPrice) {
            let n = 0
            while (n < prods.length) {
            p = prods[n]
            if (p.price != undefined && p.price > 0) {
                ansAvgPrice += p.price * 1
                notErrProds += 1
                console.log(ansAvgPrice)
            }
            n++
            }
            ansAvgPrice = Math.round(ansAvgPrice / notErrProds)
        }

        res.render('categories', {
            mainTitle: "Categories",
            showCat1,
            ansCat1,
            showCat2,
            ansCat2,
            showCat3,
            ansCat3,
            showCat4,
            ansCat4,
            showAvgPrice,
            ansAvgPrice
        })
        console.log(date + '  /categories')

    } catch (e) {
        console.log('err: ' + e)
        res.status(500).send(e)
    }
})


module.exports = router
