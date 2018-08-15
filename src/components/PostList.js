import React, { Component } from 'react';
import { ListGroup, Badge } from 'reactstrap';
import * as PostsAPI from '../api-server/PostsAPI';
import PostContent from './PostContent.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    PostsAPI.getCategories().then((data) => {
      this.setState({
        categories: data,
      });
    });
  }

  // TODO:
  // Postagens listadas são exibidas com os seguintes itens:
  // 1) Título DONE
  // 2) Autor DONE
  // 3) Número de comentários DONE
  // 4) Pontuação atual DONE
  // 5) Mecanismo de voto para votar post com positivo ou negativo DONE
  // 6) Mecanismo para ordená-las por data ou pontuação (não obrigatório ter ambos) DONE
  //
  // Os recursos de contador de comentários, edit/delete, e upvote/downvote são necessários nesta página para permitir que o usuário gerencie os posts sem navegar para outras páginas. DONE
  //
  // O mecanismo de votos funciona e exibe corretamente a nova pontuação dos votos após um clique. DONE
  //
  // As postagens em lista possuem um link que levam à página de detalhes daquela postagem.
  //
  // Todas as postagens estão listadas na raíz (/). DONE
  //
  // Todas as postagens de uma categoria estão listadas em /:category DONE
  //
  // As páginas de lista das postagens (raíz / e categoria /:category) incluem um mecanismo para ordená-las por data ou pontuação (não obrigatório ter ambos), e essa ordenação funciona corretamente. DONE
  //
  // As páginas de lista de postagens incluem um botão para adicionar um novo post. DONE
  //
  // Todas as categorias disponíveis são visíveis em qualquer página de lista de postagens. DONE
  render() {
    // const { postList } = this.props;
    const { postList } = this.props;
    // console.log('Props', this.props);
    // console.log("match", this.props.match.params);
    return (
      <div>
        <div>Categories:
          {
            this.state.categories.map((category) => (
              <Link to={category.path} key={category.name}>
                <Badge color="warning">{category.name}</Badge>
              </Link>
            ))
          }
        </div>
        <h3>Posts</h3>
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
      </div>
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
