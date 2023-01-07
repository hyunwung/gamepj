import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./TextEditor.scss"
import axios from 'axios';

export class TextEditor extends Component {
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
    const submit = this.props.submit // 제출용
    const category = this.props.category // 카테고리
    const setSubmit = this.props.setSubmit // 제출용 수정함수

    // const contents = this.props.contents
    // console.log(contents)
    // if(contents !==undefined){
    //   this.setState({
    //     editorState : contents
    //   })
    // }    
    const postData = async () => {
      try{
        await axios.post(`/`,{
          title : title,
          content : draftToHtml(convertToRaw(editorState.getCurrentContent())),
          type : category,
        })
        setSubmit(false)
      }catch(error){
        console.log(error)
      }
    }
    
    if(submit === true){
      postData()
    }
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