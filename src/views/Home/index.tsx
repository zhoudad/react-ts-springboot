import React, { Component } from 'react';
import { Menu, Layout, Breadcrumb, Button } from 'antd';
import { EditOutlined, PieChartOutlined, TableOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { RoutesRender } from '../../routes/utils';
import { routePropsInter } from '../../interfaces/routeInterface';
import * as _ from 'lodash';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

interface HomeProps {
  collapsed: boolean;
  routes: routePropsInter[];
}
interface HomeState {
  collapsed: boolean;
  openKeys: Array<string>;
  rootSubmenuKeys: Array<string>;
  paths: Array<string>;
  defaultSelectedKeys: Array<string>;
  defaultOpenKeys: Array<string>;
}

class Home extends Component<any, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: ['dashboard'],
      rootSubmenuKeys: ['dashboard', 'form', 'list', 'profile', 'account'],
      paths: [],
      defaultOpenKeys: ['analysis'],
      defaultSelectedKeys: ['analysis'],
    };
    this.munuClick = this.munuClick.bind(this);
    this.handlePathChange = this.handlePathChange.bind(this);
  }

  onOpenChange = (keys: any) => {
    let { openKeys, rootSubmenuKeys } = this.state;
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: keys,
      });
    } else {
      this.setState(() => {
        return {
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        };
      });
    }
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  munuClick({ keyPath }: { keyPath: any }) {
    this.handlePathChange(keyPath);
    let path = `/${keyPath.reverse().join('/')}`;
    this.props.history.push(path);
  }

  handlePathChange(keyPath?: any) {
    const { pathname } = this.props.location;
    let currentPaths = keyPath ? _.cloneDeep(keyPath).reverse() : pathname.split('/');
    let paths = currentPaths.map((path: string) => {
      path = path.slice(0, 1).toUpperCase() + path.slice(1);
      return path;
    });
    this.setState({
      defaultSelectedKeys: [paths[paths.length - 1].toLowerCase()],
      paths,
    });
  }

  componentDidMount() {
    this.handlePathChange();
  }

  render() {
    const { collapsed, openKeys, paths, defaultSelectedKeys } = this.state;
    const { routes } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className={styles.homeLogo} />
          <Menu theme="dark" defaultSelectedKeys={defaultSelectedKeys} mode="inline" onClick={this.munuClick} openKeys={openKeys} onOpenChange={this.onOpenChange}>
            <SubMenu key="dashboard" icon={<PieChartOutlined />} title="Dashboard">
              <Menu.Item key="analysis">分析页</Menu.Item>
              <Menu.Item key="monitor">监控页</Menu.Item>
              <Menu.Item key="workplace">工作台</Menu.Item>
            </SubMenu>
            <SubMenu key="form" icon={<EditOutlined />} title="表单页">
              <Menu.Item key="basic-form">基础表单</Menu.Item>
              <Menu.Item key="step-form">分布表单</Menu.Item>
              <Menu.Item key="advanced-form">高级表单</Menu.Item>
            </SubMenu>
            <SubMenu key="list" icon={<TableOutlined />} title="列表页">
              <SubMenu key="seach" title="搜索列表">
                <Menu.Item key="articles">文章</Menu.Item>
                <Menu.Item key="projects">应用</Menu.Item>
              </SubMenu>
              <Menu.Item key="table-list">查询列表</Menu.Item>
              <Menu.Item key="basic-list">标准列表</Menu.Item>
              <Menu.Item key="card-list">卡片列表</Menu.Item>
            </SubMenu>
            <SubMenu key="profile" icon={<ProfileOutlined />} title="详情页">
              <Menu.Item key="basic">基础详情页</Menu.Item>
              <Menu.Item key="advanced">高级详情页</Menu.Item>
            </SubMenu>
            <SubMenu key="account" icon={<UserOutlined />} title="个人页">
              <Menu.Item key="center">个人中心</Menu.Item>
              <Menu.Item key="settings">个人设置</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {paths.map((path) => (
                <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <RoutesRender routes={routes}></RoutesRender>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>ZhouDad ©2021 Created by Demo</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
