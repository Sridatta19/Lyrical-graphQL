const axios = require('axios');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const LyricType = new GraphQLObjectType({
  name:  'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require('./song_type'),
      resolve(parentValue) {
        return axios.get(`https://lyricalapi.herokuapp.com/lyrics/${parentValue.id}`)
          .then(response =>  axios.get(`https://lyricalapi.herokuapp.com/songs/${response.data.songId}`))
          .then(response => response.data);
      }
    }
  })
});

module.exports = LyricType;
