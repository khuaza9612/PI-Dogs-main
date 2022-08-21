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
            image: el.image || 'https://st3.depositphotos.com/9494100/15431/i/600/depositphotos_154313516-stock-photo-pug-dog-with-yellow-constructor.jpg',
            temperament: el.temperament,
            name: el.name,
            weight_min: (el.weight.metric.split("-")[0] || 0),
            weight_max: (el.weight.metric.split("-")[1] || NaN),

            height_max: (el.height.metric.split("-")[1] || NaN),
            height_min: (el.height.metric.split("-")[0] || 0),
            
            life_span_min: (el. life_span.split("-")[0] || 0),
            life_span_max: (el. life_span.split("-")[1] || NaN),

      
            
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
        const newDB = dbInfo.map(e => {
            return {
                id: e.id,
                name: e.name,
                image: e.image || 'https://st3.depositphotos.com/9494100/15431/i/600/depositphotos_154313516-stock-photo-pug-dog-with-yellow-constructor.jpg',
                height_min: e.height_min,
                height_max: e.height_max,
                weight_min: e.weight_min,
                weight_max: e.weight_max,
               life_span_max: e.life_span_max,
                created: e.created,
                temperaments: e.temperaments.map(e => e.name).join(),
                life_span_min: e.life_span_min,
                
            }
        })
        const infoTotal= apiInfo.concat(newDB);
        return infoTotal
    }
    router.get('/dogs', async (req, res) => {
        const name=req.query.name; //parametros de
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
   


    router.get('/dogs/:id', async (req, res, next) => {

        const {id} = req.params// const id = req.query.id otra forma 
        // informacion de un solo elemento
        const allDogs = await getAllDogs()
        const dogById = allDogs.find(e => e.id == id)
        if(dogById) {
        res.json(dogById)
        } else {
        res.status(404).send('the id does not exist')
        }


    })
    

    router.post('/dogs', async(req, res) => {
        const {name, height_min, height_max, weight_min, weight_max, temperament} = req.body;
        if(!name || !height_min || !height_max || !weight_min || !weight_max) {
          return res
            .status(400)
            .send({msg: "Falta enviar datos obligatorios"})
        }
        try {
          const dog = await Dog.create(req.body)
      
          let tempDb = await Temperament.findAll({
            where: {id : temperament}
          })
      
          await dog.addTemperament(temperament)
      
          return res
            .status(201)
            .send({msg: "Perro creado correctamente"})
        } catch (error) {
          console.log(error)
        }
      })

      router.get('/dogs', async (req, res) => {
        const weight_min=req.query.weight_min;
        let dogsTotal=await getAllDogs();
        if(weight_min){
            let dogName=await dogsTotal.filter(el=>el.weight_min.toLowerCase().includes(weight_min.toLowerCase()));// poner lo que filtre en minuscula
            dogName.length?
            res.status(200).send(dogName):
            res.status(404).send('No hay perros con ese nombre');
    }else{
        res.status(200).send(dogsTotal);
    }
    })

    const getprueba=async(req,res)=>{
        const apiurl=await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo=await apiurl.data.map(el => {
            return{
               
                
                name: el.name,
               
          
            };

        })
        return apiInfo;
}; 
router.get('/dog', async (req, res) => {
    const name=req.query.name; //parametros de
    let dogsTotal=await getprueba();
    if(!name){
        let dogName=await dogsTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()));// poner lo que filtre en minuscula
        dogName.length?
        res.status(200).send(dogName):
        res.status(404).send('No hay perros con ese nombre');
}else{
    res.status(200).send(dogsTotal);
}
})

module.exports = router;
