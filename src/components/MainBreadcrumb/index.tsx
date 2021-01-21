import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { mapPaths } from '../../reducer/connect';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';

interface BreadcrumbState {}

class MainBreadcrumb extends Component<any, BreadcrumbState> {
  render() {
    let { paths, breadcrumb } = this.props;
    // console.log(this.props)
    if (breadcrumb) {
      return (
        <Breadcrumb style={{ margin: '16px 0' }}>
          {paths.map((path: string) => (
            <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      );
    } else {
      return <></>;
    }
  }
}

export default connect(
  mapPaths.mapStateToProps,
  mapPaths.mapDispatchToProps
)(withRouter(MainBreadcrumb));
