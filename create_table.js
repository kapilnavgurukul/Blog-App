module.exports = (knex)=>{
    knex.schema.hasTable("users")
    .then((exists)=>{
        if (!exists){
            knex.schema.createTable("users", (u)=>{
                u.increments("user_id").primary();
                u.string("email").unique().notNullable();
                u.string("password",20).notNullable()
                u.string("date")
            })
            .then(()=>{
                console.log(" users table created")
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            console.log("table already created")
        }   
    }).catch((err)=>{console.log(err)})

    knex.schema.hasTable('posts')
    .then((exists)=>{
        if (!exists){
            knex.schema.createTable("posts",(p)=>{
                p.increments("post_id").primary();
                p.string("user_email").notNullable();
                p.text("post")
                p.date("date")
            })
            .then(()=>{
                console.log("posts table created")
            })
            .catch((err)=>{
                console.log(err)
            })

        }else{
            console.log("table already created")
        }
    }).catch((err)=>{console.log(err)})

    knex.schema.hasTable("likes_dislikes")
    .then((exists)=>{
        if (!exists){
            knex.schema.createTable("likes_dislikes",(l)=>{
                l.increments('id').primary();
                l.string("email")
                l.text('post_id').notNullable();
                l.string("like").defaultTo("no");
                l.string("dislike").defaultTo("no")
            })
            .then(()=>{
                console.log("likes_dislikes created")
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            console.log("table already created")
        }
    }).catch((err)=>{console.log(err)})
}