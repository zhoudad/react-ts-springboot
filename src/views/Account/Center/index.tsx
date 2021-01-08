import React, { Component } from 'react';
import { Row, Col, Card, Avatar, Tabs, List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import './index.css';

const { Meta } = Card;
const { TabPane } = Tabs;

const listData: any = [];
for (let i = 0; i < 12; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }: { icon: any; text: any }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class Center extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      listData,
    };
    this.tabCallback = this.tabCallback.bind(this);
  }

  tabCallback() {}
  render() {
    return (
      <div id="center">
        <div className="center-info">
          <Card cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}>
            <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} title="Card title" description="This is the description" />
          </Card>
        </div>
        <div className="center-experience">
          <Tabs defaultActiveKey="1" onChange={this.tabCallback}>
            <TabPane tab="文章" key="1">
              <List
                itemLayout="vertical"
                //   size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={listData}
                footer={
                  <div>
                    <b>ant design</b> footer part
                  </div>
                }
                renderItem={(item: any) => (
                  <List.Item key={item.title} actions={[<IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />, <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />, <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />]} extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}>
                    <List.Item.Meta title={<a href={item.href}>{item.title}</a>} description={item.description} />
                    {item.content}
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="项目" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="应用" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Center;
