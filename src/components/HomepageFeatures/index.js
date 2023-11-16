import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '超强算力',
    Svg: require('@site/static/img/canmv_k210.svg').default,
    description: (
      <>* K210双核RISC-V高性能处理器<br></br>
        * 主频400MHz，算力1TOPS<br></br>
        * 摄像头LCD一体化设计<br></br>
      </>
    ),
  },
  {
    title: '模块堆叠',
    Svg: require('@site/static/img/module.svg').default,
    description: (
      <>
        支持WiFi、红外测温、MPU6050六轴、TOF激光测距等多款模块拓展
      </>
    ),
  },
  {
    title: 'Python开发',
    Svg: require('@site/static/img/ide.svg').default,
    description: (
      <>
        * CanMV IDE可视化编程，实时查看图像识别结果<br></br>
        * Python开发，快速上手
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
