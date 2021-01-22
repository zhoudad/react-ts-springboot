import React, { Component } from 'react';
import { Column } from '@ant-design/charts';
import './index.css';

class Analysis extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
      .then((response) => response.json())
      .then((json) => this.setState({ data: json }))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  componentDidMount() {
    this.asyncFetch();
  }

  render() {
    // console.log(this.state.data)
    let config = {
      data: this.state.data,
      xField: '城市',
      yField: '销售额',
      xAxis: { label: { autoRotate: false } },
      slider: {
        start: 0.1,
        end: 0.2,
      },
    };
    return (
      <div id="analysis">
        <div className="access-total">
          <Column {...config} />
        </div>
      </div>
    );
  }
}

export default Analysis;
