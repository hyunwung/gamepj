import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./TextEditor.scss"
import axios from 'axios';

export class ModiEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  
  render() {
    
    const { editorState } = this.state;
    const title = this.props.title // 타이틀
    const modi = this.props.modi // 수정용
    const setModi = this.props.setModi // 수정용 함수
    const category = this.props.category // 카테고리
    const id = this.props.id // 아이디            // 전부 통일 가능

    // const contents = this.props.contents
    // console.log(contents)
    // if(contents !==undefined){
    //   this.setState({
    //     editorState : contents
    //   })
    // }

    const modiData = async () => {
        try{
            await axios.patch(`/${id}`,{
                title : title,
                content : draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
        alert("수정완료?")
        setModi(false)
      }catch(error){
        console.log(error)
        alert("멈춰")
      }
    }
    // if(modi === true){   
    //   modiData()
    // }
    return (
      <div className='editor'>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}