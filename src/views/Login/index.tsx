import React, { Component } from 'react';
import { Tabs, Row, Col, Layout, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, TabletOutlined } from '@ant-design/icons';
import { mapLogin } from '../../reducer/connect';
import { connect } from 'react-redux';
import styles from './index.module.css';

const { TabPane } = Tabs;
const { Content } = Layout;
interface InfoValue {
  username: string;
  password: string;
}
interface LoginProps { };
interface LoginState {
    hasError: boolean;
};
class Login extends Component<any,LoginState> {
  constructor(props: any) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
  }
  callback(key: string) {
    console.log(key);
  }

  onFinish(info: InfoValue) {
    // TODO:结合后端接口做验证
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (info && info.username === 'admin' && info.password === '123456') {
      from.pathname = from.pathname === '/login' ? '/' : from.pathname;
      this.props.history.replace(from)
    }
  }
  render() {
    const layout = {
      xl: {
        span: 5,
      },
      lg: {
        span: 5,
      },
      sm: {
        span: 6,
      },
    };
    return (
      <div className={styles.login}>
        <Layout className={styles.userLayoutContainer}>
          {/* <Header>Header</Header> */}
          <Content>
            <Row justify="center" align="middle" className={styles.loginRow}>
              <Col {...layout}>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                  <TabPane tab="账户密码登录" key="1">
                    <Form initialValues={{ remember: true }} onFinish={this.onFinish}>
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: '请输入用户名称！',
                          },
                        ]}>
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: '请输入用户密码！',
                          },
                        ]}>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                      </Form.Item>
                      <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>记住密码</Checkbox>
                        </Form.Item>

                        <span className={styles.loginFormForgot}>忘记密码</span>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                          登录
                        </Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                  <TabPane tab="手机号登陆" key="2">
                    <Form initialValues={{ remember: true }} onFinish={this.onFinish}>
                      <Form.Item
                        name="telphone"
                        rules={[
                          {
                            required: true,
                            message: '请输入手机号！',
                          },
                        ]}>
                        <Input prefix={<TabletOutlined />} placeholder="手机号" />
                      </Form.Item>
                      <Form.Item>
                        <Row gutter={8}>
                          <Col span={16}>
                            <Form.Item name="captcha" noStyle rules={[{ required: true, message: '请输入验证码！' }]}>
                              <Input prefix={<MailOutlined />} placeholder="验证码" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Button className={styles.loginFormButton}>获取验证码</Button>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>自动登录</Checkbox>
                        </Form.Item>

                        <span className={styles.loginFormForgot}>忘记密码</span>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                          登录
                        </Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </div>
    );
  }
}

// export default Login;
export default connect(mapLogin.mapStateToProps, mapLogin.mapDispatchToProps)(Login);
