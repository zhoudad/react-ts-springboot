import React, { Component } from 'react';
import { Tag } from 'antd';
import { RichUtils } from 'draft-js';

const { CheckableTag } = Tag;

class BlockTypesControl extends Component<any, any> {
  handleTagChange = () => {
    let { onBlockTypeChange, tag, editorState } = this.props;
    const newEditState = RichUtils.toggleBlockType(editorState, tag);
    onBlockTypeChange(newEditState);
  };
  render() {
    let { editorState, tag, children } = this.props;
    const selection = editorState.getSelection();
    const blockStyle = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    let checked = blockStyle == tag ? true : false;
    return (
      <CheckableTag checked={checked} onChange={this.handleTagChange}>
        {children}
      </CheckableTag>
    );
  }
}

export default BlockTypesControl;
