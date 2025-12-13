const defaultOptions = {
  selector: '#custom-dialog',
  show: false,
  title: '',
  message: '',
  cancelButtonText: '取消',
  confirmButtonText: '确认',
  showCancelButton: false,
  confirmButtonOpenType: '',
  cancelButtonOpenType: '',
  customStyle: '',
  type: 0, // 0默认，1 用户协议弹窗 2: 调起客户端小程序设置界面，返回用户设置的操作结果 3: 内购须知
};

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Dialog = (options: any) => {
  options = Object.assign(Object.assign({}, defaultOptions), options);

  return new Promise((resolve, reject) => {
    const content = getContext();
    const dialog = content.selectComponent(options.selector);
    delete options.selector;
    if (dialog) {
      dialog.setData(
        Object.assign(
          {
            callback: function (action: string, instance: any) {
              if (action === 'confirm') {
                resolve(instance);
              } else {
                reject(instance);
              }
            },
          },
          options
        )
      );
      wx.nextTick(() => {
        dialog.setData({ show: true });
      });
    } else {
      console.warn('未找到 custom-dialog 节点，请确认 selector 及 context 是否正确');
    }
  });
};

Dialog.alert = function (options: any) {
  return Dialog(options);
};

Dialog.confirm = function (options: any) {
  return Dialog(Object.assign({ showCancelButton: true }, options));
};

export { Dialog };
