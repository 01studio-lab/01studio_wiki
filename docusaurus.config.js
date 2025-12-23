
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '01Studio',
  tagline: '- 专注Python嵌入式编程 -',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://wiki.01studio.cc',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  //baseUrl: '/E:/docusaurus/walnutpi_wiki/build/index.html/',
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '01studio', // Usually your GitHub org/user name.
  projectName: '01studio_wiki', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh','en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          //sidebarCollapsible: false, //全部导航栏展开
          sidebarPath: require.resolve('./sidebars.js'),
          //routeBasePath: '/', // 设置首页路径
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.

          //编辑开放
          //editUrl:
            //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '01Studio',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'dropdown',
            label: 'AI视觉系列',
            position: 'left',
            className: 'navbar_dorp_items',
            items: [
              {
              type: 'docSidebar',
              sidebarId: 'newSidebar',
              label: 'CanMV K230',
              },
              {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              label: 'CanMV K210',
              },
            ],
          },                   
          {
            type: 'dropdown',
            label: 'STM32系列',
            position: 'left',
            className: 'navbar_dorp_items',
            items: [
              {
              type: 'docSidebar',
              sidebarId: 'pyboardSidebar',
              label: 'pyBoard (STM32F405)',
              },
              {
              type: 'docSidebar',
              sidebarId: 'columbusSidebar',
              label: '哥伦布 (STM32F407)',
              },
                            {
              type: 'docSidebar',
              sidebarId: 'magellanSidebar',
              label: '麦哲伦 (STM32H743)',
              },
            ],
          },    
          {
            type: 'dropdown',
            label: 'ESP32系列',
            position: 'left',
            className: 'navbar_dorp_items',
            items: [
              {
              type: 'docSidebar',
              sidebarId: 'pyWiFi_ESP32_S3Sidebar',
              label: 'pyWiFi ESP32-S3',
              },
            ],
          },                       
          {
            type: 'dropdown',
            label: '开源项目',
            position: 'left',
            className: 'navbar_dorp_items',
            items: [
              {
              type: 'docSidebar',
              sidebarId: 'pyCarSidebar',
              label: 'pyCar小车',
              },
              {
              type: 'docSidebar',
              sidebarId: 'pyDroneSidebar',
              label: 'pyDrone四轴飞行器',
              },
              {
              type: 'docSidebar',
              sidebarId: 'pyControllerSidebar',
              label: 'pyController遥控手柄',
              },
              {
              type: 'docSidebar',
              sidebarId: 'pyClockSidebar',
              label: 'pyClock天气时钟',
              },
            ],
          },
          {
            href: 'https://ai.01studio.cc',
            label: 'AI模型训练',
            position: 'right',
          },
          {
            href: 'https://www.01studio.cc',
            label: '01官网',
            position: 'right',
          },
          {
            href: 'https://forum.01studio.cc',
            label: '论坛',
            position: 'right',
          },
          /*{
            href: 'https://item.taobao.com/item.htm?id=821397288809',
            label: '购买',
            position: 'right',
          },*/
          {
            type: 'dropdown',
            label: '购买',
            position: 'right',
            className: 'navbar_dorp_items',
            items: [
              {
                label: '淘宝店铺',
                href: 'https://item.taobao.com/item.htm?id=821397288809',
              },
              {
                label: 'AliExpress',
                href: 'https://www.aliexpress.com/item/1005007573129445.html',
              },
            ],
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                href: 'https://github.com/01studio-lab/01studio_wiki',
                label: 'Help Us Translate',
              },
            ],
          },
          {
            href: 'https://github.com/01studio-lab',
            //label: 'GitHub',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '开发者资源',
            items: [
              {
                label: '技术论坛',
                href: 'https://forum.01studio.cc',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/01studio-lab',
              },
              {
                label: '核桃派',
                href: 'https://www.walnutpi.com',
              },
            ],
          },
          {
            title: '联系我们',
            items: [
              {
                label: '电话: +86-18123953882 (微信同号)',
                to: '/',              
              },
              {
                label: '邮箱: support@01studio.cc',
                href: '/',
              },
            ],
          },
          {
            title: '社区',
            items: [
              /*{
                label: 'Blog',
                to: '/blog',
              },*/
              {
                label: 'Discord',
                href: 'https://discord.gg/QxHYBxSzMG',
              },
              {
                label: 'CanMV QQ群: 578895334',
                to: '/',
              },
              {
                label: '微信公众号: 01Studio社区',
                to:'/'
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 01Studio, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'CBRI4D5J5W',
  
        // Public API key: it is safe to commit it
        apiKey: 'a4332836df0f6e8e381b4083d3bf0639',
  
        indexName: '01studio',
  
        // Optional: see doc section below
        contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        //replaceSearchResultPathname: {
         // from: '/docs/', // or as RegExp: /\/docs\//
        //  to: '/',
       // },
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
  
        //... other Algolia params
      },
    }),
};

module.exports = config;