
const express = require('express')
const router = new express.Router()
const MensRanking= require('../models/mens');

router.post("/mens", async (req, res) => {
    try {
      
      const addingMensRecords = new MensRanking(req.body);
      console.log(req.body);
      
      const insertMens=await addingMensRecords.save();
  
      
      res.status(201).send(insertMens);
    } catch (e) {
     
      res.status(400).send(e.message);
    }
  });
  

  router.get("/mens", async (req, res) => {
    try {
      
     const getMens= await MensRanking.find({}).sort({"ranking":1});//commit .sort ranking
  
      
      res.status(201).send(getMens);
    } catch (e) {
     
      res.status(400).send(e.message);
    }
  });
  
  
  router.get("/mens/:id", async (req, res) => {
    try {
      const _id=req.params.id;
     const getMen= await MensRanking.findById(_id);
  
      
      res.status(201).send(getMen);
    } catch (e) {
     
      res.status(400).send(e.message);
    }
  });
  
  
  router.patch("/mens/:id", async (req, res) => {
    try {
      const _id=req.params.id;
     const getMen= await MensRanking.findByIdAndUpdate(_id,req.body,{new:true});
     
  
      
      res.status(201).send(getMen);
    } catch (e) {
     
      res.status(500).send(e.message);
    }
  });
  
  router.delete("/mens/:id", async (req, res) => {
    try {
      const _id=req.params.id;
     const getMen= await MensRanking.findByIdAndDelete(req.params.id);
      res.status(201).send(getMen);
    } catch (e) {
     
      res.status(500).send(e.message);
    }
  });
  
  module.exports=router;