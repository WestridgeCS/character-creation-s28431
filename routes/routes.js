import express from 'express';
import { Character } from '../models/Character.js';

export const router = express.Router();

// Home page: form + table
router.get('/', async(req,res,next)=>{
    try{
        const characters = await Character.find();

        res.render('index',{
            title: 'Character Creator',
            characters,
            types: ['druid', 'wizard', 'office worker', 'fighter'],
            traits: ['strong', 'weak', 'smart', 'sneaky', 'kind'],
            Alignment: ['chaotic good', 'lawful good', 'neutral good','chaotic evil', 'lawful evil', 'neutral evil','chaotic neutral', 'lawful neutral', 'neutral neutral'],
            
        })
    }
    catch(err){
        next(err);
    }
})

// Create character
router.post('/characters', async (req,res,next) =>{
    try{
        const name = req.body.name;
        const type = req.body.type;
        const trait = req.body.trait;
        const Alignment = req.body.Alignment;
        // or const {name,type,trait} = req.body //this only works if the names are the same

        await Character.create({name,type,trait,Alignment});

        //run route that exists
        res.redirect('/');
    }
    catch (err){
        next(err);
    }
})

// Show character page
router.get('/characters/:id', async(req,res,next)=>{
    try{
        const character = await Character.findById(req.params.id);

        //cant find it?
        if (!character){
            res.status(404).send('character not found');
            return;
        }

        res.render('character',{
            title: character.name,
            character: character, //or you could just write "character" its the same thing
        })
    }
    catch(err){
        next(err);
    }
});
