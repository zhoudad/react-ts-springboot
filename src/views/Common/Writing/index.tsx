import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Tag, Divider, Space } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  StrikethroughOutlined,
  LinkOutlined,
  RedoOutlined,
  UndoOutlined,
  PlayCircleOutlined,
  ColumnWidthOutlined,
  ColumnHeightOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import CustomizeIcon from '../../../components/CustomizeIcon';

import 'draft-js/dist/Draft.css';
import './index.css';

const { CheckableTag } = Tag;

class Writing extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      selectedTags: [],
    };
  }

  onChange = (editorState: any) => {
    // console.log(editorState);
    this.setState({ editorState });
  };

  toggleInlineStyle = (style: any) => {
    let state = RichUtils.toggleInlineStyle(this.state.editorState, style);
    this.onChange(state);
  };

  handleTagChange = (tag: any, checked: any) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t: string) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  };

  render() {
    const btnGroup = ['B', 'I', 'H1', 'H2', 'H3', 'H4', 'H5', '</>'];
    let { selectedTags } = this.state;
    return (
      <div className="writing">
        <div className="writing-up-image">
          <CustomizeIcon type="site-camera-fill" style={{ fontSize: 72}} />
        </div>
        <div className="writing-wrap">
          <div className="writing-btn-group">
            <Space size="large">
              <UndoOutlined />
              <RedoOutlined />
              <BoldOutlined />
              <ItalicOutlined />
              <UnorderedListOutlined />
              <OrderedListOutlined />
              <CustomizeIcon type="site-code" />
              <UnderlineOutlined />
              <ColumnWidthOutlined />
              <ColumnHeightOutlined />
              <StrikethroughOutlined />
              <LinkOutlined />
              <CustomizeIcon type="site-disconnect" />
              <PlayCircleOutlined />
              <PictureOutlined />
            </Space>
            {/* {btnGroup.map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => this.handleTagChange(tag, checked)}>
                {tag}
              </CheckableTag>
            ))} */}
          </div>
          <Divider />
          <Editor
            placeholder={'请输入正文.'}
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default Writing;
