module.exports = (like_dislike,knex,jwt,secret_key)=>{
    like_dislike.post("/like",(req,res)=>{
        let body = req.body;
        let token = req.headers.cookie.slice(0,-10);
        let t_data = jwt.verify(token,secret_key);
        knex('likes_dislikes')
        .select('*')
        .where({'email':t_data.email,'post_id': body.post_id})
        .then((data)=>{
            if (data.length>0){
                knex("likes_dislikes")
                .update({
                    'like':"yes",
                    'dislike':"no"
                })
                .where({'email':t_data.email,'post_id':body.post_id})
                .then(()=>{res.send("liked")})
                .catch((err)=>{res.send(err)})
            }
            else{
                knex('likes_dislikes')
                .insert({
                    'post_id' : body.post_id,
                    'email' : t_data.email,
                    'like' : "yes",
                    'dislike' : "no"
                })
                .then(()=>{res.send("liked")})
                .catch((err)=>{res.send(err)})
            }
        })
    })

    like_dislike.post("/dislike",(req,res)=>{
        let body = req.body;
        let token = req.headers.cookie.slice(0,-10);
        let t_data = jwt.verify(token,secret_key);
        knex('likes_dislikes')
        .select('*')
        .where({'email':t_data.email,'post_id': body.post_id})
        .then((data)=>{
            if (data.length>0){
                knex("likes_dislikes")
                .update({
                    'like':"no",
                    'dislike':"yes"
                })
                .where({'email':t_data.email,'post_id':body.post_id})
                .then(()=>{res.send("disliked")})
                .catch((err)=>{res.send(err)})
            }
            else{
                knex('likes_dislikes')
                .insert({
                    'post_id' : body.post_id,
                    'email' : t_data.email,
                    'like' : "no",
                    'dislike' : "yes"
                })
                .then(()=>{res.send("disliked")})
                .catch((err)=>{res.send(err)})
            }
        })
    })

    like_dislike.get("/like_dislike",(req,res)=>{
        let body = req.body;
        let token = req.headers.cookie.slice(0,-10);
        let t_data = jwt.verify(token,secret_key);
        knex('likes_dislikes')
        .select('*')
        .where({
            'post_id':body.post_id,
            'like' : "yes"
        })
        .then((data)=>{
            const like = data.length
            knex('likes_dislikes')
            .select('*')
            .where({
                'post_id' : body.post_id,
                'dislike' : "yes"
            })
            .then((data1)=>{
                const dislike = data1.length;
                res.send({"like":like,"dislike":dislike})
            })
            .catch((err)=>{
                res.send(err)
            })
        })
        .catch((err)=>{
            res.send(err)
        })

    })
}