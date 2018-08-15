import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import CommentContent from './CommentContent.js';
// import * as ReadableAPI from '../api-server/ReadableAPI';
import { connect } from 'react-redux';

class CommentList extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     comments: []
  //   };
  // }

  // componentDidMount() {
  //   ReadableAPI.getAllCommentsPost(this.props.parentId).then((data) => {
  //     console.log(data);
  //   });
  // }

  // TODO:
  // Os detalhes da postagem estão disponíveis em /:category/:post_id DONE
  //
  // A postagem é exibida com os seguintes itens:
  // 1) Título DONE
  // 2) Corpo DONE
  // 3) Autor DONE
  // 4) Número de comentários DONE
  // 5) Pontuação atual DONE
  // 6) Mecanismo de voto para votar positiva ou negativamente o post DONE
  // 7) Botões ou links para que o post possa ser editado ou removido. DONE
  //
  // Comentários listados são exibidos com os seguintes itens:
  // 1) Autor DONE
  // 2) Pontuação atual DONE
  // 3) Mecanismo de voto para votar positiva ou negativamente o comentário DONE
  //
  // O mecanismo de voto funciona e exibe corretamente a nova pontuação de votos ao clicar para votar na postagem e nos comentários. DONE
  //
  // Todos os comentários de uma postagem são exibidos abaixo do corpo de texto da postagem. DONE
  //
  // Um mecanismo para a adição de novos comentários está visível na página de detalhes e funciona. DONE

  render() {
    // console.log(this.props);
    const { commentList, parentId } = this.props;
    return (
      <ListGroup>
        {
          commentList.filter((comment) => comment.parentId === parentId).map((comment) => (
            <CommentContent
              key={comment.id}
              comment={comment}
            />
          ))
        }
      </ListGroup>
    )
  }
}

function mapStateToProps({post, comment}, props) {
  let newCommentList = [];

  // console.log(post);
  if (comment !== null && comment !== undefined) {
    Object.keys(comment).forEach((key) => {
      newCommentList.push(comment[key]);
    });
  }

  /*REMOVING DELETED COMMENTS FROM VIEW*/
  newCommentList = newCommentList.filter((cmt) => cmt.deleted !== true);

  return {
    commentList: newCommentList
  }
}

export default connect(mapStateToProps)(CommentList);
