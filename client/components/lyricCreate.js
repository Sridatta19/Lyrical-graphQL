
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';

class LyricCreate extends Component {

  constructor(props){
    super(props)
    this.state = {
      content: ''
    }
  }

  onSubmit(evt) {
    evt.preventDefault()
    this.props.mutate({
      variables: {
        content: this.state.content,
        id: this.props.songId
      }
    }).then(() => this.setState({ content: '' }))
  }

  render(){
    return <form onSubmit={this.onSubmit.bind(this)}>
      <label>Add a Lyric</label>
      <input value={this.state.content} onChange={evt => this.setState({ content: evt.target.value })} />
    </form>
  }
}

const mutation = gql`
  mutation addLyric($content: String, $id: ID){
    addLyricToSong(content: $content, songId: $id){
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
