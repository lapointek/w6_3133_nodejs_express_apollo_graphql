const express =require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const schema = buildSchema(
    `type Movie{
        id: ID!
        name: String!
        director_name: String
        production_house: String
        release_date: String
        rating: Float
        
    }
        type Query {
            getAllMovies: [Movie]
            getMovieById(id:ID!): Movie
        }

        type Mutation{
            addMovie(name: String!, director_name:String, production_house:String,
            release_date: String, rating: Float): Movie
            updateMovie(id: ID!, name: Stringm director_name:String, production_house:
            String, release_date: String, rating:Float): Movie
            deleteMovie(id:ID!):ID
        }
    `)