module.exports = (login_signup,knex,jwt,secret_key)=>{
    login_signup.post("/ragister",(req,res)=>{
        let body = req.body;
        knex("users")
        .insert({
            'email' : body.email,
            'password' : body.password,
            'date' : new Date()
        })
        .then(()=>{
            res.send("ragister successful")
        })
        .catch((err)=>{
            res.send(err)
        })
    })


    login_signup.post("/login",(req,res)=>{
        let body = req.body;
        knex("users")
        .select("*")
        .where("email",body.email)
        .then((data)=>{
            if (data.length>0){
                if (body.password==data[0].password){
                    let token = jwt.sign({"email":body.email},secret_key)
                    res.cookie(token)
                    res.send("yes are logged in")
                }else{
                    res.send("wrong password")
                }
            }else{
                res.send("you are not ragisterd on this app")
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    })
}