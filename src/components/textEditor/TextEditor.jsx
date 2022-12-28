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

    const submitData = async () => {
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
    if (submit === true){
      submitData()
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