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
            weight:  el.weight.metric.includes('NaN')? { metric:'No data'} : el.weight,
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
         

module.exports = router;
