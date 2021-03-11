const {db, syncAndSeed, models: {Pro, Brand}} = require('./db');
const { Op } = require("sequelize");
const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({extended: false}));

app.use(require('method-override')('_method'));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/font-awesome', express.static('node_modules/font-awesome-animation/css/'))
app.use(require('morgan')('dev'));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/joined', async (req, res, next) => {
    try {
        const pros = await Pro.findAll({
            include: Brand
        })

        res.send(pros)
    } catch (error) {
        console.error(error)
    }
})

app.get('/team', async (req, res, next) => {
    try {
        const pros = await Pro.findAll()
        res.send(pros)
    } catch (error) {
        console.error(error)
    }
});

app.get('/riders/:id', async (req, res, next) => {
    try {
        // const rider = await Pro.findByPk(req.params.id)
        const rider = await Pro.findAll({
            where: {
                id: req.params.id
            },
            include: Brand
        })
        console.log(rider[0].name)
        res.send(rider)
    } catch (error) {
        console.error(error)
    }
});

app.post('/riders/add-rider', async (req, res, next) => {
    try {
        // console.log(req.body)
        const newPro = await Pro.create({name: req.body.name, instagramUrl: `https://www.instagram.com/${req.body.igUrl}`, deletable: true})
        res.redirect(`/`);  
    } catch (error) {
        console.error(error)
    }
});

app.post('/riders/add-sponsor/:id', async (req, res, next) => {
    try {
        const pro = await Pro.findByPk(req.params.id)
        console.log("Body", req.body)
        const newBrands = req.body.sponsor.split(",")
        console.log(newBrands)

        const forLoop = async (arr) => {
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i])
                    const found = await Brand.findAll({
                        where: {
                            name: {
                                [Op.iLike]: `%${arr[i].trim()}%`
                            }
                        }
                    })

            console.log("FOUND-------->", found)

            if (found.length > 0) {
                found[0].addPro(pro.id)
                // found[0].deletable = true;
                // await found[0].save()
            } else {
                const newBrand = await Brand.create({name: arr[i], instagramUrl:null, deletable: true})
                newBrand.addPro(pro.id)
            }
        }
}

        forLoop(newBrands)
        res.redirect('/')
    } catch (error) {
        console.error(error)
    }
})

app.delete('/riders/delete-rider/:id', async (req, res, next) => {
    try {
        const toDelete = await Pro.findByPk(req.params.id)
        await toDelete.destroy()
        res.redirect('/')
    } catch (error) {
        console.error(error)
    }
})

app.delete('/riders/:proId/delete-sponsor/:brandId', async (req, res, next) => {
    try {
        const pro = await Pro.findByPk(req.params.proId)
        const brand = await Brand.findByPk(req.params.brandId)
        brand.removePro(pro.id)
        res.redirect('/');
    } catch (error) {
        console.error(error)
    }
})


const init = async () => {
    try {
        await db.authenticate();
        console.log("connected to Girl Skatebaords Database");

        await syncAndSeed();

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        });

    } catch (error) {
        console.error(error)
    }
}
init();