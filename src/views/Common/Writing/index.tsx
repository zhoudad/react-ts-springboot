import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, Entity, CompositeDecorator, ContentBlock } from 'draft-js';
import { Tag, Divider, Button, Modal, Form, Input } from 'antd';
import {
  // BoldOutlined,
  // ItalicOutlined,
  // UnderlineOutlined,
  // OrderedListOutlined,
  // UnorderedListOutlined,
  // StrikethroughOutlined,
  LinkOutlined,
  DisconnectOutlined,
  RedoOutlined,
  UndoOutlined,
  // PlayCircleOutlined,
  // ColumnWidthOutlined,
  // ColumnHeightOutlined,
  // PictureOutlined,
} from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import CustomizeIcon from '../../../components/CustomizeIcon';
import InlineTypesControl from './InlineTypesControl';
import BlockTypesControl from './BlockTypesControl';

import 'draft-js/dist/Draft.css';
import './index.css';

import { inlineTypes, blockTypes } from './config';

const { CheckableTag } = Tag;

function findLinkEntities(contentBlock: any, callback: any) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
  }, callback);
}

const Link = (props: any) => {
  // console.log(Entity.get(props.entityKey).getData())
  const { url } = Entity.get(props.entityKey).getData();
  return <a href={url}>{props.children}</a>;
};

class Writing extends Component<any, any> {
  editor: React.RefObject<Editor>;
  linkFormRef = React.createRef<FormInstance>();
  constructor(props: any) {
    super(props);
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      selectedTags: [],
      urlLink: 'https://zhoudad.com/',
      urlTitle: '',
      urlVisible: false,
      dymanicCssList: [],
    };
    this.editor = React.createRef();
  }

  onEditorStateChange = (editorState: any) => {
    // console.log(editorState);
    this.setState({ editorState });
  };

  // 行内样式改变
  onInlineTypeChange = (newEditState: any) => {
    this.onEditorStateChange(newEditState);
  };

  // 块样式改变
  onBlockTypeChange = (editorState: any) => {
    this.setState({ editorState }, () => {
      this.onEditorFocus();
    });
  };

  // 获取光标current
  onEditorFocus = () => {
    // console.log('获取光标');
    this.editor.current?.focus();
  };

  // 控制按钮点击事件
  handleTagChange = (tag: string, checked: boolean) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t: string) => t !== tag);
    // console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  };

  // 快捷键事件
  handleKeyCommand = (command: string) => {
    // console.log(command);
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onEditorStateChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // link

  _increaseLink = () => {
    this.setState({ urlVisible: true });
  };

  _confirmLink = () => {
    const { editorState } = this.state;
    this.linkFormRef.current
      ?.validateFields()
      .then((values) => {
        const entityKey = Entity.create('LINK', 'MUTABLE', values.link);
        const newState = RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
        this.onInlineTypeChange(newState);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  _cancelLink = () => {
    this.setState({ urlVisible: false });
  };

  // 移除link
  _removeLink = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.onInlineTypeChange(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  getBlockStyle = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    const metaData = contentBlock.getData();

    const textIndent = metaData.get('text-indent');
    const lineHeight = metaData.get('line-height');
    const letterSpacing = metaData.get('letter-spacing');
    const textAlign = metaData.get('text-align');
    // console.log(type, metaData, textIndent, lineHeight, letterSpacing, textAlign);
    if (textIndent || lineHeight || letterSpacing || textAlign) {
      let letterSpacingName = '';
      if (!letterSpacing) {
        letterSpacingName = letterSpacing;
      } else {
        letterSpacingName = Math.round(
          Number(letterSpacing.substring(0, letterSpacing.indexOf('px'))) * 100
        ).toString();
      }
      const className =
        'custom' + textIndent + Math.round(lineHeight * 100) + letterSpacingName + textAlign;
      const { dymanicCssList } = this.state;
      let classIsExist = false;

      for (const dymanicCss of dymanicCssList) {
        if (dymanicCss === className) {
          classIsExist = true;
          break;
        }
      }
      if (!classIsExist) {
        // console.log(className,textIndent,lineHeight,letterSpacing)
        dymanicCssList.push(className);
        this.loadCssCode(`.${className} {
            text-indent: ${textIndent};
            line-height: ${lineHeight};
            letter-spacing: ${letterSpacing};
            text-align: ${textAlign};
        }`);
      }
      return className;
    }
    return 'classname';
  };

  // 动态创建css
  loadCssCode = (className: string) => {
    const style = document.createElement('style');
    // style.type = 'text/css';
    // style.rel = 'stylesheet';
    // for Chrome Firefox Opera Safari
    style.appendChild(document.createTextNode(className));
    console.log(style)
    // for IE
    // style.styleSheet.cssText = className;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  };

  render() {
    let { selectedTags, urlVisible} = this.state;
    return (
      <div className="writing">
        <div className="writing-up-image">
          <CustomizeIcon type="site-camera-fill" style={{ fontSize: 72 }} />
        </div>
        {/* <Button type="primary" onClick={this._confirmLink}>测试</Button> */}
        <div className="writing-wrap">
          <div className="writing-btn-group">
            <CheckableTag
              checked={selectedTags.indexOf('UNDO') > -1}
              onChange={(checked) => this.handleTagChange('UNDO', checked)}>
              <UndoOutlined key="UndoOutlined" />
            </CheckableTag>
            <CheckableTag
              checked={selectedTags.indexOf('REDO') > -1}
              onChange={(checked) => this.handleTagChange('REDO', checked)}>
              <RedoOutlined key="RedoOutlined" />
            </CheckableTag>
            {inlineTypes.map((tagObj, i) => (
              <InlineTypesControl
                key={i}
                editorState={this.state.editorState}
                tag={tagObj.tag}
                onInlineTypeChange={this.onInlineTypeChange}>
                {tagObj.vNode}
              </InlineTypesControl>
            ))}
            {blockTypes.map((tagObj, i) => (
              <BlockTypesControl
                key={i}
                editorState={this.state.editorState}
                tag={tagObj.tag}
                onBlockTypeChange={this.onBlockTypeChange}>
                {tagObj.vNode}
              </BlockTypesControl>
            ))}
            <CheckableTag checked={false} onChange={this._increaseLink}>
              <LinkOutlined key="LinkOutlined" />
            </CheckableTag>
            <CheckableTag checked={false} onChange={this._removeLink}>
              <DisconnectOutlined key="DisconnectOutlined" />
            </CheckableTag>
          </div>
          <Divider />
          <Editor
            ref={this.editor}
            placeholder={'请输入正文.'}
            editorState={this.state.editorState}
            onChange={this.onEditorStateChange}
            handleKeyCommand={this.handleKeyCommand}
            blockStyleFn={this.getBlockStyle}
          />
        </div>
        <Modal
          title="插入链接"
          centered
          visible={urlVisible}
          cancelText="取消"
          destroyOnClose
          okText="确认"
          onOk={this._confirmLink}
          onCancel={this._cancelLink}>
          <Form name="link" ref={this.linkFormRef}>
            <Form.Item name="title" rules={[{ required: true, message: '输入连接文本' }]}>
              <Input
                placeholder="输入连接文本"
                allowClear
                prefix={<CustomizeIcon type="site-wenben" />}
              />
            </Form.Item>
            <Form.Item
              name="link"
              rules={[
                { required: true, message: '输入链接地址' },
                {
                  pattern: /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/,
                  message: '输入正确链接地址',
                },
              ]}>
              <Input placeholder="输入链接地址" allowClear prefix={<LinkOutlined />} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Writing;
