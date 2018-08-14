import React, { Component } from 'react';
import { Row, ListGroup } from 'reactstrap';
// import * as PostsAPI from '../api-server/PostsAPI';
import PostContent from './PostContent.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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

  // TODO:
  // Postagens listadas são exibidas com os seguintes itens:
  // 1) Título DONE
  // 2) Autor DONE
  // 3) Número de comentários DONE
  // 4) Pontuação atual DONE
  // 5) Mecanismo de voto para votar post com positivo ou negativo DONE
  // 6) Mecanismo para ordená-las por data ou pontuação (não obrigatório ter ambos) DONE
  //
  // Os recursos de contador de comentários, edit/delete, e upvote/downvote são necessários nesta página para permitir que o usuário gerencie os posts sem navegar para outras páginas. OK
  //
  // O mecanismo de votos funciona e exibe corretamente a nova pontuação dos votos após um clique. DONE
  //
  // As postagens em lista possuem um link que levam à página de detalhes daquela postagem.
  //
  // Todas as postagens estão listadas na raíz (/). OK
  //
  // Todas as postagens de uma categoria estão listadas em /:category OK
  //
  // As páginas de lista das postagens (raíz / e categoria /:category) incluem um mecanismo para ordená-las por data ou pontuação (não obrigatório ter ambos), e essa ordenação funciona corretamente. OK
  //
  // As páginas de lista de postagens incluem um botão para adicionar um novo post.
  //
  // Todas as categorias disponíveis são visíveis em qualquer página de lista de postagens.
  render() {
    // const { postList } = this.props;
    const { postList } = this.props;
    console.log('Props', this.props);
    // console.log("match", this.props.match.params);
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
  const { orderBy, match } = props;
  let newState = [];

  // console.log(state);
  if (state !== null && state !== undefined) {
    Object.keys(state).forEach((key) => {
      newState.push(state[key]);
    });

    /*REMOVING DELETED POSTS FROM VIEW*/
    newState = newState.filter((post) => post.deleted !== true);

    /*FILTER BY CATEGORY*/
    if (match.params.category !== null && match.params.category !== undefined) {
      newState = newState.filter((post) => post.category === match.params.category);
    }

    /*ORDERING POSTS*/
    if (orderBy === 'vote') { //order posts by score
      newState.sort((a, b) => {return b.voteScore - a.voteScore;})
    } else if (orderBy === 'date') { //order posts by date
      newState.sort((a, b) => {return b.timestamp - a.timestamp;})
    } else if (orderBy === 'comment') { //order posts by comment
      newState.sort((a, b) => {return b.commentCount - a.commentCount;})
    }
  }

  return {
    postList: newState
  }
}

export default withRouter(connect(mapStateToProps)(PostList));

//export default PostList;
