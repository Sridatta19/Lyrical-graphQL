const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const SongType = require('./song_type');
const LyricType = require('./lyric_type');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return axios.get('https://lyricalapi.herokuapp.com/songs')
          .then(response =>  response.data);
      }
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return axios.get(`https://lyricalapi.herokuapp.com/songs/${id}`)
          .then(response =>  response.data);
      }
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return axios.get(`https://lyricalapi.herokuapp.com/lyrics/${id}`)
        .then(response =>  response.data);
      }
    }
  })
});

module.exports = RootQuery;
