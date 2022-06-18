/**
 * 用于管理弹窗展示优先级
 */
interface IModalItem {
  /**
   * 展示优先级
   */
  level: number;
  /**
   * 真实状态：是否展示。永远只有一个true
   */
  show: boolean;
  /**
   * 虚拟状态：是否应该展示
   * 0:隐藏；1:展示
   * 有可能应该展示，但由于优先级问题暂时未展示。
   */
  state: number;
  /**
   * 真实展示状态改变时的回调函数
   */
  cb: (state: boolean) => void;
}

interface IModalMethods {
  subscribe: (
    name: string,
    level: number,
    cb: (state: boolean) => void
  ) => void;
  notify: (name: string, show: boolean) => void;
}

/**
 * 展示状态
 */
enum EShowState {
  Hide,
  Show,
}

const modalManager = (): IModalMethods => {
  const _modalList: Record<string, IModalItem> = {};
  const _sortByLevel: IModalItem[] = [];

  return {
    /**
     * 订阅
     */
    subscribe(name: string, level: number, cb: (state: boolean) => void) {
      if (!_modalList[name]) {
        _modalList[name] = {
          level,
          cb,
          show: false,
          state: EShowState.Hide,
        };

        // 优先级排序 从大到小
        _sortByLevel.push(_modalList[name]);
        _sortByLevel.sort((a, b) => b.level - a.level);
      }
    },
    /**
     * 发布
     */
    notify(name: string, show: boolean) {
      console.log("info-发布", name, show);

      if (!_modalList[name]) {
        return;
      }
      const currentModal = _modalList[name];
      const preState = currentModal.state;
      const nowState = show ? EShowState.Show : EShowState.Hide;
      // 状态改变
      if (preState !== nowState) {
        // 改变当前modal state
        currentModal.state = nowState;
        // 隐藏所有
        _sortByLevel.forEach((modal) => {
          modal.show = false;
          modal?.cb(modal.show);
        });
        let hasShow = false;
        // 选取优先级最高的 展示
        _sortByLevel.forEach((modal) => {
          if (modal.state === EShowState.Show && !hasShow) {
            modal.show = true;
            hasShow = true;
            modal?.cb(modal.show);
          }
        });
      }
    },
  };
};

export default modalManager;
