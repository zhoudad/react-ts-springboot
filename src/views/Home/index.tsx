import React, { Component } from 'react';
import { Menu, Layout, Breadcrumb, Button } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.css';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

interface HomeProps {
  collapsed: boolean;
}

class Home extends Component<HomeProps, any> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      collapsed: false,
      counter: 0,
    };
  }

  handleClick = () => {
    // 事件处理的错误，ErrorBoundary无法捕捉
    // if (this.state.counter === 5) {
    //     throw new Error();
    // }
    
    this.setState((state:any, props:HomeProps) => ({
      counter: state.counter + 1
    }));
  }

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { collapsed, counter } = this.state;
    console.log(this.props)
    if (counter === 5) {
      throw new Error('有错误!');
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className={styles.homeLogo} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Button type="primary" onClick={this.handleClick}>Button{counter}</Button>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
