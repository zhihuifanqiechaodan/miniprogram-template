interface LoadingOptions {
  selector?: string;
  loading?: boolean;
}

const defaultOptions: LoadingOptions = {
  selector: '#custom-loading',
};

function getContext(): WechatMiniprogram.Page.Instance<any, any> {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Loading = (options: LoadingOptions = {}): Promise<void> => {
  options = Object.assign(Object.assign({}, defaultOptions), options);

  return new Promise(() => {
    const content = getContext();
    if (content) {
      const loading = content.selectComponent(
        options.selector as string
      ) as WechatMiniprogram.Component.TrivialInstance;
      delete options.selector;
      if (loading) {
        loading.setData(options);
      } else {
        console.warn('未找到 custom-loading 节点，请确认 selector 及 context 是否正确');
      }
    } else {
      console.warn('未找到 custom-loading 节点所在的页面栈信息');
    }
  });
};
Loading.show = function (): Promise<void> {
  return Loading({
    loading: true,
  });
};

Loading.clear = function (): Promise<void> {
  return Loading({
    loading: false,
  });
};

export { Loading };
