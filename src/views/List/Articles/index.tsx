import React, { Component } from 'react';
import { Row, Input, Button, Col, Layout, Form, Radio, Checkbox, Space } from 'antd';
import { FormOutlined, SearchOutlined } from '@ant-design/icons';

const { Content } = Layout;

class Articles extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onSearch = () => {};

  toWriting = () => {
    this.props.history.push('/common/writing');
  };

  render() {
    return (
      <Layout>
        <Row style={{ marginBottom: 16 }}>
          <Col span={12} offset={0}>
            <Space>
              <Input placeholder="请输入" style={{ width: 360 }} />
              <Button type="primary" icon={<SearchOutlined />}>
                搜索
              </Button>
              <Button type="primary" icon={<FormOutlined />} onClick={this.toWriting}>
                创作
              </Button>
            </Space>
          </Col>
        </Row>
        <Content style={{ padding: 16, backgroundColor: '#fff' }}>
          <Form labelCol={{ span: 2 }} wrapperCol={{ span: 14 }}>
            <Form.Item label="中国文学史">
              <Radio.Group>
                <Radio value="a">古代文学</Radio>
                <Radio value="b">近代文学</Radio>
                <Radio value="c">现代文学</Radio>
                <Radio value="d">当代文学</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="文学类别">
              <Checkbox.Group options={['小说', '散文', '戏剧', '诗歌']} defaultValue={['诗歌']} />
            </Form.Item>
            <Form.Item label="著名作家">
              <Checkbox.Group
                options={[
                  '张爱玲',
                  '钱钟书',
                  '巴金',
                  '鲁迅',
                  '冰心',
                  '郭沫若',
                  '叶圣陶',
                  '朱自清',
                  '老舍',
                ]}
                defaultValue={['老舍']}
              />
            </Form.Item>
          </Form>
        </Content>
        <Content></Content>
      </Layout>
    );
  }
}

export default Articles;
