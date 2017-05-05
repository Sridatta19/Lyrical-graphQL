
import React, { Component } from 'react';
import gql from 'graphql-tag';
import fetchSongs from '../queries/fetchSongs'
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

class SongCreate extends Component {

  constructor(props){
    super(props)
    this.state = {
      title: ''
    }
  }

  titleChange(evt) {
    this.setState({ title: evt.target.value })
  }

  onSubmit(evt) {
    evt.preventDefault()
    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query: fetchSongs }]
    }).then(() => hashHistory.push('/'))
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title: </label>
          <input type="text" value={this.state.title} onChange={this.titleChange.bind(this)}></input>
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title){
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
