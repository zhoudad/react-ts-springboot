import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

class CustomizeDraft extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }

  onChange = (editorState:any) => {
    this.setState({editorState})
    console.log(editorState)
  } 

  render() {
    return (
      <div>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}

export default CustomizeDraft;
