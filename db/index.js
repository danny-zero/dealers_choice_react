const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/girl_skateboards', {logging: false});

const Pro = db.define('pro', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        notEmpty: true,
        allowNull: false
    },
    img: {
        type: STRING,
        defaultValue: './assets/images/logo.png'
    },
    instagramUrl: STRING,
    deletable: {
        type: BOOLEAN,
        defaultValue: false
    }
},
{
    timestamps: false
});

const Brand = db.define('brand', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        notEmpty: true,
        allowNull: false
    },
    instagramUrl: STRING,
    deletable: {
        type: BOOLEAN,
        defaultValue: true
    }
},
{
    timestamps: false
});

const Sponsor = db.define('sponsor', {
    proId: {
        type: UUID
    },

    sponsorId: {
        type: UUID
    }
}, 
{
    timestamps: false
})

Pro.belongsToMany(Brand, {through: Sponsor, foreignKey: 'sponsorId'})
Brand.belongsToMany(Pro, {through: Sponsor, foreignKey: 'proId'})

// const gramize = (handle) => `https://www.instagram.com/${handle}`;

const syncAndSeed = async () => {
    await db.sync({force: true});

    const [malto, breana, brophy, mikemo, cory, mccrank, jeron, carroll, howard] = await Promise.all([
        Pro.create({name: 'Sean Malto', img: './assets/images/team/malto.jpg', instagramUrl: 'https://www.instagram.com/seanmalto'}),
        Pro.create({name: 'Breana Geering', img: './assets/images/team/geering.png', instagramUrl: 'https://www.instagram.com/breezeana'}),
        Pro.create({name: 'Andrew Brophy', img: './assets/images/team/brophy.jpg', instagramUrl: 'https://www.instagram.com/andrewbrophy'}),
        Pro.create({name: 'Mike Mo Capaldi', img: './assets/images/team/mikemo.jpg', instagramUrl: 'https://www.instagram.com/mikemo'}),
        Pro.create({name: 'Cory Kennedy', img: './assets/images/team/cory.jpg', instagramUrl: 'https://www.instagram.com/corykennedy'}),
        Pro.create({name: 'Rick McCrank', img: './assets/images/team/mccrank.jpg', instagramUrl: 'https://www.instagram.com/mccranker'}),
        Pro.create({name: 'Jeron Wilson', img: './assets/images/team/jeron.jpg', instagramUrl: 'https://www.instagram.com/jeronwilson'}),
        Pro.create({name: 'Mike Carroll', img: './assets/images/team/carroll.jpg', instagramUrl: 'https://www.instagram.com/furrycalamari'}),
        Pro.create({name: 'Rick Howard', img: './assets/images/team/howard.jpg', instagramUrl: 'https://www.instagram.com/girlskateboards'}),
    ]);

    const [girl, converse, wayward, royal, spitfire, bones, glassy, vans, antisocial, nineclub, diamond, lakai, independent, mob, nike, thunder] = await Promise.all([
        Brand.create({name:'Girl Skateboards', instagramUrl:'https://www.instagram.com/girlskateboards'}), 
        Brand.create({name: 'Converse', instagramUrl:'https://www.instagram.com/converse'}), 
        Brand.create({name:'Wayward Wheels', instagramUrl:'https://www.instagram.com/waywardwheels'}), 
        Brand.create({name:'Royal', instagramUrl:'https://www.instagram.com/royaltrucks'}), 
        Brand.create({name:'Spitfire Wheels', instagramUrl:'https://www.instagram.com/spitfirewheels'}), 
        Brand.create({name:'Bones Swiss Bearings', instagramUrl:'https://www.instagram.com/bonesbearings'}), 
        Brand.create({name:'Glassy', instagramUrl:'https://www.instagram.com/glassyeyewear'}), 
        Brand.create({name:'Vans', instagramUrl:'https://www.instagram.com/vans'}), 
        Brand.create({name:'Anti-Social Shop', instagramUrl:'https://www.instagram.com/antisocialshop'}), 
        Brand.create({name:'The Nine Club', instagramUrl:'https://www.instagram.com/thenineclub'}), 
        Brand.create({name:'Diamond Supply Co', instagramUrl:'https://www.instagram.com/diamondsupplyco'}), 
        Brand.create({name:'Lakai', instagramUrl:'https://www.instagram.com/lakailtd'}), 
        Brand.create({name: 'Independent Trucks', instagramUrl: 'https://www.instagram.com/independenttrucks'}), 
        Brand.create({name: 'Mob Grip', instagramUrl: 'https://www.instagram.com/mobgrip'}),
        Brand.create({name: 'Nike', instagramUrl: 'https://www.instagram.com/nikesb'}),
        Brand.create({name: 'Thunder', instagramUrl: 'https://www.instagram.com/thundertrucks'})
    ]);

    const girlPros = [malto, breana, brophy, mikemo, cory, mccrank, jeron, carroll, howard]
    girlPros.map((pro) => {
        girl.addPro(pro)
    });

    //Sean Malto
    nike.addPro(malto)
    spitfire.addPro(malto)
    thunder.addPro(malto)

    //Breana Geering
    independent.addPro(breana)
    vans.addPro(breana)
    mob.addPro(breana)
    antisocial.addPro(breana)

    //Andrew Brophy
    converse.addPro(brophy)
    wayward.addPro(brophy)

    //Mike Mo Capaldi
    royal.addPro(mikemo)
    spitfire.addPro(mikemo)
    bones.addPro(mikemo)
    glassy.addPro(mikemo)

    //Cory Kennedy
    royal.addPro(cory)
    spitfire.addPro(cory)
    glassy.addPro(cory)

    //Rick McCrank
    vans.addPro(mccrank)
    antisocial.addPro(mccrank)

    //Jeron Wilson
    nineclub.addPro(jeron)
    diamond.addPro(jeron)

    //Mike Carroll
    lakai.addPro(carroll)
    royal.addPro(carroll)

    //Rick Howard
    lakai.addPro(howard)
    royal.addPro(howard)






}


module.exports = {
    db,
    syncAndSeed,
    models: {
        Pro,
        Brand
    }
}