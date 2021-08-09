<Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.pathname]}>
            <Menu.Item key="/">
              <Link to="/console">控制台</Link>
            </Menu.Item>
            <Menu.Item key="/shop">
              <Link to="/shop">
                商城管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/user">
              <Link to="/user">
                会员管理
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
    <Layout>
      <Switch>
        <Route path="/" component={Console} exact></Route>
        <Route path="/shop" component={Shop}></Route>
        <Route path="/user" component={User}></Route>
      </Switch>
      <Layout style={{ padding: '24px 24px' }}>
        
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  </Layout>