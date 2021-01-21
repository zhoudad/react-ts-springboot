import React, { Component } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1557462_ejd1lzrg3bu.js',
});

class CustomizeIcon extends Component<any, any> {
  render() {
    const { type, style } = this.props;
    return <IconFont type={type} style={style} />;
  }
}

export default CustomizeIcon;
