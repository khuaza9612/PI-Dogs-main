const { Router } = require('express');
const axios = require('axios')
const {Dog, Temperament} = require('../db')
const {API_KEY} = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// funcion de api para obtener todos los dogs
const getApiInfo=async(req,res)=>{
    const apiurl=await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo=await apiurl.data.map(el => {
        return{
            id: el.id,
            image: el.image,
            temperament: el.temperament,
            name: el.name,
            weight_min: Number(el.weight.metric.split("-")[0] || 0),
            weight_max: Number(el.weight.metric.split("-")[1] || NaN),
            height: el.height,
            life_span: el.life_span,
        };

        })
        return apiInfo;
};

    const getDbInfo=async()=>{
        return await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                },
            }
        })
    };

    const getAllDogs=async(req,res)=>{
        const apiInfo= await getApiInfo();
        const dbInfo= await getDbInfo(); 
        const infoTotal= apiInfo.concat(dbInfo);
        return infoTotal
    }
    router.get('/dogs', async (req, res) => {
        const name=req.query.name;
        let dogsTotal=await getAllDogs();
        if(name){
            let dogName=await dogsTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()));// poner lo que filtre en minuscula
            dogName.length?
            res.status(200).send(dogName):
            res.status(404).send('No hay perros con ese nombre');
    }else{
        res.status(200).send(dogsTotal);
    }
    })
    router.get("/temperaments", async (req, res) => {
        const val = await Temperament.findAll();
        if (val.length === 0) {
            const tempAPI = await axios.get("https://api.thedogapi.com/v1/breeds")
            .catch((error) => {
                return res.status(500).send(error);
            });
            var tempList = await tempAPI.data
            .map((e) => e.temperament)
            .join()
            .split(", ")
            .join()
            .split(",");
            const list = new Set(tempList);
            for (let item of list) {
                await Temperament.create({ name: item});
            }
        }
        var temp = await Temperament.findAll();
        res.json(temp)  
    })
    // router.get('/dogs/:id', async (req, res) => {
    //     const id = req.params.id;// const {id} = req.params;otra forma
    //     const dogsTotal=await getAllDogs();
    //     if(id){
    //         let dogId=await dogsTotal.filter(el=>el.id===id);
    //         dogId.length?
    //         res.status(200).json(dogId) :    
    //         res.status(404).send('No hay perros con ese id');
    //     }
    // })

    
    router.get('/dogs/:id', async (req, res, next) => {
        
        const {id} = req.params// const id = req.params.id otra forma
        const allDogs = await getAllDogs()
        const dogById = allDogs.find(e => e.id == id)
        if(dogById) {
        res.json(dogById) 
        } else {
        res.status(404).send('the id does not exist')
        }
        
       
    })
    router.post('/dogs', async (req, res) => {
        const {name, height,  height_min, life_span, temperament,created,image, height_max} = req.body
        let dogCreated=await Dog.create({name, height, height_min, life_span,created,image,height_max})
        let temperamentdb=await Temperament.findAll({where:{name:temperament}})
        dogCreated.addTemperament(temperamentdb)
        res.send('dog created')
    })



         

module.exports = router;
