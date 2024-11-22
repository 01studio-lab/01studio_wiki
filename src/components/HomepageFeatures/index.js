import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate>超强算力</Translate>,
    Svg: require('@site/static/img/canmv_k210.svg').default,
    description: (
      <>* <Translate>K210双核RISC-V高性能处理器</Translate><br></br>
        * <Translate>主频400MHz，算力1TOPS</Translate><br></br>
        * <Translate>摄像头LCD一体化设计</Translate><br></br>
      </>
    ),
  },
  {
    title: <Translate>模块堆叠</Translate>,
    Svg: require('@site/static/img/module.svg').default,
    description: (
      <>
        <Translate>支持WiFi、红外测温、MPU6050六轴、TOF激光测距等多款模块拓展</Translate>
      </>
    ),
  },
  {
    title: <Translate>Python开发</Translate>,
    Svg: require('@site/static/img/ide.svg').default,
    description: (
      <>
        * <Translate>CanMV IDE可视化编程，实时查看图像识别结果</Translate><br></br>
        * <Translate>Python开发，快速上手</Translate>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
        <rect width="100%" height="100%"/>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
