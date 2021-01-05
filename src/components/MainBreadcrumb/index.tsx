import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { mapBreadcrumb } from '../../reducer/connect';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';

interface BreadcrumbState {}

class MainBreadcrumb extends Component<any, BreadcrumbState> {
  render() {
    let { paths } = this.props;
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {paths.map((path: string) => (
          <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}

export default connect(mapBreadcrumb.mapStateToProps, mapBreadcrumb.mapDispatchToProps)(withRouter(MainBreadcrumb));
