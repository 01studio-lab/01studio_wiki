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
    locales: ['en','zh'],
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
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'CanMV-K210教程',
          },
          /*
          {
            type: 'docSidebar',
            sidebarId: 'newSidebar',
            position: 'left',
            label: 'NEW',
          },*/
          {
            href: 'https://forum.01studio.cc',
            label: '论坛',
            position: 'left',
          },
          {
            href: 'https://item.taobao.com/item.htm?id=686202955706',
            label: '购买',
            position: 'right',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          /*{
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                href: 'https://github.com/facebook/docusaurus/issues/3526',
                label: 'Help Us Translate',
              },
            ],
          },*/
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
                label: '教程',
                to: '/docs/canmv_k210',
                
              },
              {
                label: '论坛',
                href: 'https://forum.01studio.cc',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/01studio-lab',
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
                label: 'QQ群: 759452434',
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
    }),
};

module.exports = config;