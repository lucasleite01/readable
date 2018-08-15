import React, { Component } from 'react';
import { ListGroup, Badge } from 'reactstrap';
import * as ReadableAPI from '../api-server/ReadableAPI';
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
    ReadableAPI.getCategories().then((data) => {
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
  // As postagens em lista possuem um link que levam à página de detalhes daquela postagem. DONE
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
    const { postList, detailPostPage } = this.props;
    const { categories } = this.state;

    let newCategories = categories.map((category) => {
      return {
        name: category.name,
        path: `/${category.path}`
      };
    });
    // console.log(newCategories);
    // console.log("this.state", this.state);
    // console.log('Props', this.props);
    // console.log("match", this.props.match.params);
    return (
      <div>
        <div>Categories:
          {
            newCategories.map((category) => (
              <Link to={category.path} key={category.name}>
                <Badge color="warning">{category.name}</Badge>
              </Link>
            ))
          }
        </div>
        {detailPostPage ?
          <h3>Post Details</h3>
          :
          <h3>Posts</h3>
        }
          <ListGroup>
          {
            postList.map(post => (
              <PostContent
              key={post.id}
              post={post}
              showBodyComments={detailPostPage}>
              </PostContent>
            ))
          }
          </ListGroup>
      </div>
    );
  }
}

function mapStateToProps({post, comment}, props) {
  const { orderBy, match } = props;
  let newPostList = [];

  // console.log(post);
  if (post !== null && post !== undefined) {
    Object.keys(post).forEach((key) => {
      newPostList.push(post[key]);
    });

    /*REMOVING DELETED POSTS FROM VIEW*/
    newPostList = newPostList.filter((post) => post.deleted !== true);

    /*FILTER BY CATEGORY*/
    if (match.params.category !== null && match.params.category !== undefined) {
      newPostList = newPostList.filter((post) => post.category === match.params.category);
    }

    /*ORDERING POSTS*/
    if (orderBy === 'vote') { //order posts by score
      newPostList.sort((a, b) => {return b.voteScore - a.voteScore;})
    } else if (orderBy === 'date') { //order posts by date
      newPostList.sort((a, b) => {return b.timestamp - a.timestamp;})
    } else if (orderBy === 'comment') { //order posts by comment
      newPostList.sort((a, b) => {return b.commentCount - a.commentCount;})
    }
  }

  return {
    postList: newPostList
  }
}

export default withRouter(connect(mapStateToProps)(PostList));

//export default PostList;
