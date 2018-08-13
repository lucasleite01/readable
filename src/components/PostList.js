import React, { Component } from 'react';
import { Row, ListGroup } from 'reactstrap';
// import * as PostsAPI from '../api-server/PostsAPI';
import PostContent from './PostContent.js';
import { connect } from 'react-redux';

class PostList extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     postList: []
  //   };
  // }
  //
  // componentDidMount() {
  //   PostsAPI.getPosts().then((data) => {
  //     this.setState({postList: data});
  //   });
  // }

  render() {
// 1) Título OK
// 2) Autor OK
// 3) Número de comentários OK
// 4) Pontuação atual OK
// 5) Mecanismo de voto para votar post com positivo ou negativo OK
// 6) Mecanismo para ordená-las por data ou pontuação (não obrigatório ter ambos)
    // const { postList } = this.props;
    const { postList } = this.props;
    // console.log('Props', this.props);
    return (
      <Row>
      <ListGroup>
      {
        postList.map(post => (
          <PostContent
          key={post.id}
          post={post}
          showBody={true}>
          </PostContent>
        ))
      }
      </ListGroup>
      </Row>
    );
  }
}

function mapStateToProps(state, props) {
  let newState = [];
  Object.keys(state).forEach((key) => {
    newState.push(state[key]);
  });

  return {
    postList: newState
  }
}

export default connect(mapStateToProps)(PostList);

//export default PostList;
