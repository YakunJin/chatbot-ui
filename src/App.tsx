import React from 'react';
import './App.css';
import { ConfigProvider, theme, Breadcrumb, Layout, Menu, message } from 'antd';
import { useNavigate, useRoutes, useLocation } from "react-router-dom";
import { MessageOutlined } from '@ant-design/icons';
import { ItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import ChatRoom from './pages/ChatRoom';
import IconBot1 from './res/icon_bot_1.png';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';

const { Header, Content, Sider } = Layout;
interface IPage {
  path: string,
  redirect?: string,
  label: string,
  icon: any,
  element: any,
  breadCrumbItems: Array<BreadcrumbItemType>,
  isShow: boolean,
  children?: Array<IPage>,
}
const pages: Array<IPage> = [
  {
    path: '/',
    label: '聊天',
    icon: <MessageOutlined />,
    element: <ChatRoom />,
    breadCrumbItems: [{ title: '聊天' }],
    isShow: false,
  },
]

// const excludeLayoutPage = [
//   '/chat-room'
// ]

const getMenuItem = (props: ItemType | SubMenuType): ItemType | SubMenuType => {
  return props;
}

const menuItems = pages.filter(page => page.isShow).map(page => getMenuItem({
  label: page.label,
  key: page.path,
  icon: page.icon,
  children: page.children?.filter(child => child.isShow).map(child => {
    return {
      label: child.label,
      key: child.path,
      icon: child.icon,
    }
  })
}));

const App: React.FC = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  
  window.addEventListener('unhandledrejection', (error) => {
    messageApi.open({
      type: 'error',
      content: error?.reason?.message || '系统错误，请联系管理员',
    });
  })

  let targetPage: IPage | undefined;
  pages.forEach(page => {
    if (page.path === location.pathname) {
      targetPage = page;
      return;
    } else {
      page.children?.forEach(child => {
        if (child.path === location.pathname) {
          targetPage = child;
          return;
        }
      })
    }
  });

  const routes = useRoutes([
    {
      element: <>
        <App />
      </>
    },
    ...pages
  ]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const onClick = (e: any) => {
    navigate(e.key, { replace: true })
  }

  // const isOutLayout = excludeLayoutPage.find(x => x === location.pathname);

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#335DFF',
      },
    }}>
      {contextHolder}
      {routes}
    </ConfigProvider>
  );
};

export default App;
