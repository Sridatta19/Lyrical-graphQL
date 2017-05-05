const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const LyricType = require('./lyric_type');

const SongType = new GraphQLObjectType({
  name:  'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue) {
        return axios.get(`https://lyricalapi.herokuapp.com/songs/lyrics/${parentValue.id}`)
          .then(response =>  response.data);
      }
    }
  })
});

module.exports = SongType;
