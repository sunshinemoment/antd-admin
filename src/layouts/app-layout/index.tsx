import { Layout, Menu } from "antd";
import styles from "./index.module.less";
import router from "@/router";
import { routes } from "@/router/routes";
import { RouteConfig } from "@/router/helper";
import { Link, Outlet, matchRoutes, useLocation } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

function getNavMenuItems(menus: RouteConfig[]) {
  return menus.map(({ children, name, realPath }) => {
    if (children) {
      return (
        <SubMenu title={name} key={realPath as string}>
          {getNavMenuItems(children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={realPath as string}>
        <Link to={realPath as string}>{name}</Link>
      </Menu.Item>
    );
  });
}

const BasicLayout = () => {
  const matched = matchRoutes(router, useLocation().pathname) || [];
  const selectedKeys = matched[matched.length - 1].pathname || "";
  const openKeys = matched.map((item) => item.pathname);
  return (
    <Layout>
      <Sider className={styles.sider}>
        <div className={styles.logo}>
          <h1>Antd-Admin</h1>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          selectedKeys={[selectedKeys]}
        >
          {getNavMenuItems(routes)}
        </Menu>
      </Sider>
      <Layout className={styles.main}>
        <Header className={styles.header}>Header</Header>
        <Content className={styles.content}>
          <Outlet></Outlet>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
