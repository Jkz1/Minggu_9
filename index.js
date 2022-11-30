const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const mysql = require("mysql2")

app.use(bodyParser.json())

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'lola'
})

conn.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected...');
})

app.get('/api/comments', (req, res) =>{
    let sql = "SELECT * FROM table";
    let query = conn.query(sql, (err, results) => {
        res.send(JSON.stringify(results))
    })
})

app.get('/api/comment/:id', (req,res) => {
    let sql = "SELECT * FROM table WHERE comment_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify(results))
    })
})
app.get('/api/comments/costumer/:id', (req,res) => {
    let sql = "SELECT * FROM table WHERE cust_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify(results))
    })
})

app.post('/api/comment', (req,res) => {
    let data = {cust_id : req.body.customer_id, product_id : req.body.product_id, comment_text : req.body.comment_text}
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql,data,(err, results) => {
        if(err) throw err
        res.send(JSON.stringify(results))
    })
})

app.delete('/api/comment/:id', (req, res) => {
    let sql = "DELETE FROM table WHERE comment_id="+req.params.id+"";
    let query = conn.query(sql,(err, results) => {
        res.send(JSON.stringify(results))
    })
})

app.listen(3000, ()=>{
    console.log("server run")
})