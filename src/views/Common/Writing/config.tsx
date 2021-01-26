import React from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  StrikethroughOutlined,
  LinkOutlined,
  PlayCircleOutlined,
  ColumnWidthOutlined,
  ColumnHeightOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import CustomizeIcon from '../../../components/CustomizeIcon';

// 行内样式
const inlineTypes = [
  {
    vNode: <BoldOutlined key="BoldOutlined" />,
    tag: 'BOLD',
  },
  {
    vNode: <ItalicOutlined key="ItalicOutlined" />,
    tag: 'ITALIC',
  },
  {
    vNode: <UnderlineOutlined key="UnderlineOutlined" />,
    tag: 'UNDERLINE',
  },
  {
    vNode: <StrikethroughOutlined key="StrikethroughOutlined" />,
    tag: '"strikethroug',
  },
];

// 块样式
const blockTypes = [
  // { label: '普通', style: 'unstyled' },
  // { label: 'h1', style: 'header-one' },
  // { label: 'h2', style: 'header-two' },
  // { label: 'h3', style: 'header-three' },
  // { label: 'h4', style: 'header-four' },
  // { label: 'h5', style: 'header-five' },
  // { label: 'h6', style: 'header-six' },
  // { label: '引用', style: 'blockquote' },
  // { label: '代码', style: 'code-block' },
  // { label: 'atomic', style: 'atomic' },这个有问题
  // { label: '有序列表', style: 'ordered-list-item' },
  // { label: '无序列表', style: 'unordered-list-item' },
  {
    vNode: <UnorderedListOutlined key="Unordere" />,
    tag: 'unordered-list-item',
  },
  {
    vNode: <OrderedListOutlined key="OrderedListOutlined" />,
    tag: 'ordered-list-item',
  },
  {
    vNode: <ColumnWidthOutlined key="ColumnWidthOutlined" />,
    tag: '"columnwidth',
  },
  {
    vNode: <ColumnHeightOutlined key="ColumnHeightOutlined" />,
    tag: '"columnHeight',
  },
  // {
  //   vNode: <LinkOutlined key="LinkOutlined" />,
  //   tag: '"line',
  // },
  // {
  //   vNode: <CustomizeIcon type="site-disconnect" key="SiteDisconnect" style={{ fontSize: 14 }} />,
  //   tag: '"disconnect',
  // },
  {
    vNode: <CustomizeIcon type="site-code" key="SiteCode" style={{ fontSize: 14 }} />,
    tag: '"code-block',
  },
  {
    vNode: <PlayCircleOutlined key="PlayCircleOutlined" />,
    tag: '"playCircle',
  },
  {
    vNode: <PictureOutlined key="PictureOutlined" />,
    tag: '"picture',
  },
];

export { inlineTypes, blockTypes };
