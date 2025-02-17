const resolvers = {
    Query: {
        allMovies: async (parent, args, context) => {
            const db = await context.db;
            let movies = await db.query('SELECT * FROM Movies')
            return movies.rows;
        },
        MovieById: async (parent, {id}, context) => {
            const db = await context.db
            let movie = await db.query('SELECT * FROM Movies WHERE id = $1', [id])
            if(!movie.rows[0]){
                throw new Error('Movie not found')
            }
            return movie.rows[0];
        }
    },
    Mutation: {
        // insert movie
        async addMovie(parent, {name, director_name, production_house, release_date, rating}, context) {
            const db = await context.db;
            const query = {
                text: 'INSERT INTO Movies (name, director_name, production_house, release_date, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [name, director_name, production_house, release_date, rating]
            };
            const result = await db.query(query)
            return result.rows[0]
        },
        // update movie
        async updateMovie(parent, {id, name, director_name, production_house, release_date, rating}, context){
            const db = await context.db
            let query = {
                text: `UPDATE Movies SET name = $2, director_name = $3, 
                production_house = $4, release_date = $5, rating = $6 WHERE id = $1 RETURNING *`,
                values: [id, name, director_name, production_house, release_date, rating]
            };
                let result = await db.query(query)
                return result.rows[0]
            },

            // delete movie
            async deleteMovie(parent, {id}, context){
                const db = await context.db;
                let query = {
                    text: 'DELETE FROM Movies WHERE id = $1 RETURNING *',
                    values: [id]
                };
                let result = await db.query(query)
                return result.rows.length > 0;
            }

    }
};