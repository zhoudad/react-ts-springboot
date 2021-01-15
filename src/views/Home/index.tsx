import React, { Component } from 'react';
import { Menu, Layout, Avatar, Tabs, Badge, Button, Typography, List, Card, Dropdown } from 'antd';
import {
  EditOutlined,
  PieChartOutlined,
  TableOutlined,
  ProfileOutlined,
  UserOutlined,
  BellOutlined,
  AntDesignOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import MainBreadcrumb from '../../components/MainBreadcrumb';
import CustomizeIcon from '../../components/CustomizeIcon';
import { RoutesRender } from '../../routes/utils';
import { routePropsInter } from '../../interfaces/routeInterface';
import { mapBreadcrumb } from '../../reducer/connect';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import './index.css';
import logo from '../../assets/svgs/logo.svg';

const { Header, Footer, Sider, Content } = Layout;

const { Paragraph } = Typography;
const { SubMenu } = Menu;

interface HomeProps {
  collapsed: boolean;
  routes: routePropsInter[];
}
interface HomeState {
  collapsed: boolean;
  openKeys: Array<string>;
  // rootSubmenuKeys: Array<string>;
  paths: Array<string>;
  selectedKeys: Array<string>;
  noTitleKey: any;
  tabListNoTitle: any;
}

class Home extends Component<any, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: ['dashboard'],
      // rootSubmenuKeys: ['dashboard', 'form', 'list', 'profile', 'account'],
      paths: [],
      selectedKeys: ['analysis'],
      noTitleKey: 'notice',
      tabListNoTitle: [
        {
          key: 'notice',
          tab: '通知',
        },
        {
          key: 'news',
          tab: '消息',
        },
        {
          key: 'upcoming',
          tab: '待办',
        },
      ],
    };
    this.munuClick = this.munuClick.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
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

  changeLanguage(language: string) {
    let { i18n } = this.props;
    i18n.changeLanguage(language);
    sessionStorage.setItem('language', language);
    // window.location.reload();
  }

  onTabChange = (key: any) => {
    this.setState({ noTitleKey: key });
  };

  componentDidMount() {
    this.handlePathChange();
  }

  render() {
    const { routes, t } = this.props;
    const { selectedKeys, tabListNoTitle } = this.state;
    const data = [
      {
        title: '邮件周报',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        tooltip: '2020-02-01',
      },
      {
        title: '重点通知',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        tooltip: '2020-02-01',
      },
      {
        title: '钉钉通知',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        tooltip: '2020-02-01',
      },
      {
        title: '钉钉通知',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        tooltip: '2020-02-01',
      },
    ];
    const Notice = () => (
      <div className="site-header-notice">
        <Card
          style={{ width: '100%' }}
          bodyStyle={{ padding: '0 20px' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          tabProps={{ centered: true }}
          onTabChange={(key) => {
            this.onTabChange(key);
          }}
          actions={[
            <Button type="text" key="setting">
              清空通知
            </Button>,
            <Button type="text" key="settsing">
              查看更多
            </Button>,
          ]}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={
                    <Paragraph ellipsis style={{ marginBottom: 0 }}>
                      {item.title}
                    </Paragraph>
                  }
                  description={
                    <Paragraph ellipsis style={{ marginBottom: 0 }}>
                      {item.tooltip}
                    </Paragraph>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="site-layout-header">
          <div className="site-header-logo">
            <img src={logo} alt="Logo" />
            <h1>{t('common.title')}</h1>
          </div>
          <Menu
            theme="light"
            selectedKeys={selectedKeys}
            mode="horizontal"
            onClick={this.munuClick}>
            <SubMenu key="dashboard" icon={<PieChartOutlined />} title={t('common.menus.dashboard.title')}>
              <Menu.Item key="analysis">{t('common.menus.dashboard.analysis')}</Menu.Item>
              <Menu.Item key="monitor">{t('common.menus.dashboard.monitor')}</Menu.Item>
              <Menu.Item key="workplace">{t('common.menus.dashboard.analysis')}</Menu.Item>
            </SubMenu>
            <SubMenu key="form" icon={<EditOutlined />} title={t('common.menus.form.title')}>
              <Menu.Item key="basic-form">{t('common.menus.form.basic')}</Menu.Item>
              <Menu.Item key="step-form">{t('common.menus.form.step')}</Menu.Item>
              <Menu.Item key="advanced-form">{t('common.menus.form.advanced')}</Menu.Item>
            </SubMenu>
            <SubMenu key="list" icon={<TableOutlined />} title={t('common.menus.list.title')}>
              <SubMenu key="seach" title={t('common.menus.list.searchList.title')}>
                <Menu.Item key="articles">{t('common.menus.list.searchList.articles')}</Menu.Item>
                <Menu.Item key="projects">{t('common.menus.list.searchList.projects')}</Menu.Item>
              </SubMenu>
              <Menu.Item key="table-list">{t('common.menus.list.table')}</Menu.Item>
              <Menu.Item key="basic-list">{t('common.menus.list.basic')}</Menu.Item>
              <Menu.Item key="card-list">{t('common.menus.list.card')}</Menu.Item>
            </SubMenu>
            <SubMenu key="profile" icon={<ProfileOutlined />} title={t('common.menus.profile.title')}>
              <Menu.Item key="basic">{t('common.menus.profile.basic')}</Menu.Item>
              <Menu.Item key="advanced">{t('common.menus.profile.advanced')}</Menu.Item>
            </SubMenu>
            <SubMenu key="account" icon={<UserOutlined />} title={t('common.menus.account.title')}>
              <Menu.Item key="center">{t('common.menus.account.center')}</Menu.Item>
              <Menu.Item key="settings">{t('common.menus.account.settings')}</Menu.Item>
            </SubMenu>
          </Menu>
          <div style={{ flex: 1 }}>
            <div className="site-header-right">
              <Dropdown trigger={['click']} placement="bottomRight" overlay={Notice}>
                <span className="site-global-header-index-action">
                  <Badge count={5}>
                    <BellOutlined style={{ fontSize: 16 }} />
                  </Badge>
                </span>
              </Dropdown>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer">
                        <UserOutlined />
                        个人中心
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer">
                        <SettingOutlined />
                        个人设置
                      </a>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer">
                        <PoweroffOutlined />
                        退出登录
                      </a>
                    </Menu.Item>
                  </Menu>
                }>
                <span className="site-global-header-index-action">
                  <Avatar size={32} icon={<AntDesignOutlined />} />
                  <span style={{ marginLeft: 6 }}>{t('common.user')}</span>
                </span>
              </Dropdown>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => this.changeLanguage('en_US')}>
                        {/* <span role="img" aria-label="English">
                          US
                        </span> */}
                        English
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => this.changeLanguage('zh_CN')}>
                        {/* <span role="img" aria-label="简体中文">
                          CN
                        </span> */}
                        简体中文
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => this.changeLanguage('hk_CN')}>
                        {/* <span role="img" aria-label="English">
                          Hk
                        </span> */}
                        繁体中文
                      </a>
                    </Menu.Item>
                  </Menu>
                }>
                <span className="site-global-header-index-action">
                  <CustomizeIcon type="site-yuyan1" style={{ fontSize: 16 }} />
                </span>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content className="site-layout-content">
          <MainBreadcrumb />
          <div className="site-layout-wrap">
            <RoutesRender routes={routes}></RoutesRender>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ZhouDad ©2021 Created by Demo</Footer>
      </Layout>
    );
  }
}

export default connect(
  mapBreadcrumb.mapStateToProps,
  mapBreadcrumb.mapDispatchToProps
)(withTranslation()(Home));
