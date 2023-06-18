import Presenter from './presenter.js';

/**
 * @extends {Presenter<PlaceholderView, AppModel>}
 */
class PlaceholderPresenter extends Presenter {
  /**
   * @type {Record<FilterType, string>}
   */

  textMap = {
    everything: 'Click New Event to create your first point',
    future: 'There are no future events now',
    present: 'There are no present events now',
    past: 'There are no past events now'
  };

  /**
   * @override
   * @return {PlaceholderViewState}
   */
  createViewState() {
    const urlParams = this.getUrlParams();
    const points = this.model.getPoints(urlParams);
    const placeholderObject = {
      text: '',
      isHidden: points.length > 0
    };

    switch (urlParams.filter) {
      case 'everything':
        placeholderObject.text = this.textMap.everything;
        break;

      case 'future':
        placeholderObject.text = this.textMap.future;
        break;

      case 'present':
        placeholderObject.text = this.textMap.present;
        break;

      case 'past':
        placeholderObject.text = this.textMap.past;
        break;

      default:
        placeholderObject.text = this.textMap.everything;
        break;
    }
    return placeholderObject;
  }
}

export default PlaceholderPresenter;
