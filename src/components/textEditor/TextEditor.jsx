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
    const title = this.props.title
    const submit = this.props.submit
    const category = this.props.category
    const setSubmit = this.props.setSubmit
    const id = this.props.id
    console.log(id)
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
          content : draftToHtml(convertToRaw(editorState.getCurrentContent())),
          type : category,
        })
        setSubmit(false)
      }catch(error){
        console.log(error)
      }
    }
    if(submit === true){
      modiData()
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