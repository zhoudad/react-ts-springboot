import React, { Component } from 'react';
import { Tag } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
const { CheckableTag } = Tag;
class LinkControl extends Component<any, any> {
  render() {
    let { onChange,editorState } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle()
    let checked = currentStyle.has("LINK")
    return (
      <CheckableTag checked={checked} onChange={onChange}>
        <LinkOutlined key="LinkOutlined" />
      </CheckableTag>
    );
  }
}

export default LinkControl;
