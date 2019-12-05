module.exports = (post,knex,jwt,secret_key)=>{
    post.post('/post',(req,res)=>{
        let body = req.body;
        let token = req.headers.cookie.slice(0,-10);
        let t_data = jwt.verify(token,secret_key);
        knex('posts')
        .insert({
            'post' : body.post,
            "user_email" : t_data.email,
            'date' : new Date()
        })
        .then(()=>{
            res.send("post successfully submit")
        })
        .catch((err)=>{
            res.send(err)
        })
    })


    post.get("/post",(req,res)=>{
        let token = req.headers.cookie.slice(0,-10);
        let t_data = jwt.verify(token,secret_key);
        knex('posts')
        .select("*")
        .orderBy('post_id','desc')
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        })
    })
}