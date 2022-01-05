import { Layout, Menu } from "antd";
import styles from "./index.module.less";
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { routes } from "@/router/routes";
import { Link, Outlet } from "react-router-dom";

console.log(routes, "routes");

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

const BasicLayout = () => {
  return (
    <Layout>
      <Sider className={styles.sider}>
        <div className={styles.logo}>
          <h1>Antd-Admin</h1>
        </div>
        <Menu mode="inline" theme="dark">
          {routes.map((route) => (
            <SubMenu key={route.path} title={route.name}>
              {route.children.map((item) => (
                <Menu.Item key={item.path}>
                  <Link to={route.path + "/" + item.path}>{item.name}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>Header</Header>
        <Content><Outlet></Outlet></Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
