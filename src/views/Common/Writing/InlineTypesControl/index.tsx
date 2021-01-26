import React, { Component } from 'react';
import { Tag } from 'antd';
import { RichUtils } from 'draft-js';

const { CheckableTag } = Tag;

class InlineTypesControl extends Component<any, any> {
  handleTagChange = () => {
    let { onInlineTypeChange, tag, editorState } = this.props;
    const newEditState = RichUtils.toggleInlineStyle(editorState, tag);
    onInlineTypeChange(newEditState);
  };
  render() {
    let { editorState, tag, children } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();
    let checked = currentStyle.has(tag);
    return (
      <CheckableTag checked={checked} onChange={this.handleTagChange}>
        {children}
      </CheckableTag>
    );
  }
}

export default InlineTypesControl;
