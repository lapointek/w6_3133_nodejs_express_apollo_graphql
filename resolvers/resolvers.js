


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
    }
};