import React, { Component } from 'react';
import { Tabs, Row, Col, Form, Input, Button, Select, Cascader } from 'antd';
import { FormInstance } from 'antd/lib/form';
import pcas from '../../../assets/data/pcas-code.json';

const { Option } = Select;

import './index.css';

const { TabPane } = Tabs;
const { TextArea } = Input;

class Setting extends Component<any, any> {
  formRef = React.createRef<FormInstance>();
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  onFinish = (values: any) => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current!.resetFields();
  };

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    return (
      <div id="setting">
        <Tabs defaultActiveKey="basic-setting" tabPosition={'left'}>
          <TabPane tab="基本设置" key="basic-setting">
            <h2>基本设置</h2>
            <Form {...layout} initialValues={{ email: 'zhoudad@foxmail.com', nickname: '周大大', profile: '' }} ref={this.formRef} layout={'vertical'} name="control-ref" onFinish={this.onFinish}>
              <Form.Item name="email" label="邮箱">
                <Input />
              </Form.Item>
              <Form.Item name="nickname" label="昵称">
                <Input />
              </Form.Item>
              <Form.Item name="profile" label="个人简介">
                <TextArea rows={4} showCount maxLength={100} />
              </Form.Item>
              <Form.Item name="country" label="国家/地区">
                <Select>
                  <Option value="china">中国</Option>
                </Select>
              </Form.Item>
              <Form.Item name="province" label="所在省份">
                <Cascader fieldNames={{ label: 'name', value: 'code', children: 'childs' }} options={pcas} placeholder="省份" />
              </Form.Item>
              <Form.Item name="streetAddress" label="街道地址">
                <Input />
              </Form.Item>
              <Form.Item name="telphone" label="联系电话">
                <Input.Group size="large">
                  <Row gutter={8}>
                    <Col span={5}>
                      <Input />
                    </Col>
                    <Col span={8}>
                      <Input />
                    </Col>
                  </Row>
                </Input.Group>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 12 }}>
                  确认
                </Button>
                <Button htmlType="button" onClick={this.onReset}>
                  重置
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="安全设置" key="security-setting">
            <h2>安全设置</h2>
          </TabPane>
          <TabPane tab="账号绑定" key="account-binding">
            <h2>账号绑定</h2>
          </TabPane>
          <TabPane tab="新消息通知" key="notification">
            <h2>新消息通知</h2>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Setting;
