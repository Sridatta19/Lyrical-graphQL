const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const SongType = require('./song_type');
const LyricType = require('./lyric_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return axios.post(`https://lyricalapi.herokuapp.com/songs/addSong?title=${title}`)
          .then(response =>  response.data);
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(parentValue, { content, songId }) {
        return axios.post(`https://lyricalapi.herokuapp.com/lyrics/addLyric?songId=${songId}&content=${content}`)
          .then(response =>  response.data);
      }
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return axios.post(`https://lyricalapi.herokuapp.com/lyrics/likeLyric/${id}`)
          .then(response =>  response.data);
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return axios.post(`https://lyricalapi.herokuapp.com/songs/deleteSong/${id}`)
          .then(response =>  response.data);
      }
    }
  }
});

module.exports = mutation;
