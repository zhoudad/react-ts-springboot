import React, { Component } from 'react';
import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.module.css';

const { Paragraph, Text } = Typography;
interface ErrorBoundaryProps {}
interface ErrorBoundaryState {
  hasError: boolean;
  errorList: Array<any>;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorList: [],
    };
  }

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    let {errorList} = this.state
    errorList.push({error, errorInfo})
    this.setState({errorList});
    // console.group();
    // console.log('ErrorBoundary catch a error:');
    // console.info('error', error);
    // console.info('error info', errorInfo);
    // console.groupEnd();
  };

  render() {
    let { errorList } = this.state;
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <Result
          status="error"
          title="error"
          subTitle="页面存在错误语法，请检查语法！"
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}>
                页面错误信息:
              </Text>
            </Paragraph>
            {
              errorList.map((error,index) => {
                return(
                  <Paragraph key={index}>
                  <CloseCircleOutlined className={styles.resultRrrorIcon} /> {error.error.message} <br/><a >{error.errorInfo.componentStack}</a>
                </Paragraph>
                )
              })
            }
          </div>
        </Result>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
