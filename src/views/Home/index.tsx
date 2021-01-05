import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import { EditOutlined, PieChartOutlined, TableOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import MainBreadcrumb from '../../components/MainBreadcrumb';
import { RoutesRender } from '../../routes/utils';
import { routePropsInter } from '../../interfaces/routeInterface';
import { mapBreadcrumb } from '../../reducer/connect';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import './index.css';
import logo from '../../assets/svgs/logo.svg';

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
  selectedKeys: Array<string>;
}

class Home extends Component<any, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: ['dashboard'],
      rootSubmenuKeys: ['dashboard', 'form', 'list', 'profile', 'account'],
      paths: [],
      selectedKeys: ['analysis'],
    };
    this.munuClick = this.munuClick.bind(this);
  }

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
    this.props.handlePaths(paths);
    this.setState({
      selectedKeys: [paths[paths.length - 1].toLowerCase()],
    });
  }

  componentDidMount() {
    this.handlePathChange();
  }

  render() {
    const { routes } = this.props;
    const { selectedKeys } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="site-layout-header" style={{ padding: 0 }}>
          <div className="site-header-logo">
            <img src={logo} alt="Logo" />
            <h1>周大大</h1>
          </div>
          <Menu theme="light" selectedKeys={selectedKeys} mode="horizontal" onClick={this.munuClick}>
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
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <MainBreadcrumb />
          <div className="site-layout-content" style={{ padding: 24, minHeight: 360 }}>
            <RoutesRender routes={routes}></RoutesRender>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ZhouDad ©2021 Created by Demo</Footer>
      </Layout>
    );
  }
}

export default connect(mapBreadcrumb.mapStateToProps, mapBreadcrumb.mapDispatchToProps)(Home);
