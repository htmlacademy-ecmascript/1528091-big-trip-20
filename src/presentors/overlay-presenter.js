import Presenter from './presenter.js';

/**
 * @extends {Presenter<OverlayView, AppModel>}
 */
class OverlayPresenter extends Presenter {
  /**
   * @type {boolean}
   */
  isModelBusy;
  addEventListeners(){
    this.model.addEventListener('busy', this.handleModelBusy.bind(this));
    this.model.addEventListener('idle', this.handleModelIdle.bind(this));
  }

  handleModelBusy() {
    this.isModelBusy = true;
    this.updateView();
  }

  handleModelIdle() {
    this.isModelBusy = false;
    this.updateView();
  }

  /**
   * @override
   * @return {OverlayViewState}
   */
  createViewState() {
    if(this.isModelBusy) {
      return {
        isActive: true
      };
    }
    return {
      isActive: false
    };
  }
}

export default OverlayPresenter;
