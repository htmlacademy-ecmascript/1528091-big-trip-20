import Presenter from './presenter.js';

/**
 * @extends {Presenter<SortView>}
 */
class SortPresenter extends Presenter {
  /**
  * @override
  * @return {SortViewState}
  */

  createViewState() {
    /**
     * @type {Array<SortType>}
     */

    const types = ['day', 'event', 'time', 'price', 'offers'];
    /**
     * @type {UrlParams}
     */
    const { sort } = this.getUrlParams();

    const items = types.map((it) => (
      {
        value: it,
        isSelected: it === sort,
        isDisabled: false
      }
    ));
    return {items};
  }

  /**
   * @override
   */

  addEventListeners() {
    /**
     * @param {Event & {target: {value: SortType}}} event
     */
    const handleViewChange = (event) => {
      /**
       * @type {UrlParams}
       */
      const urlParams = this.getUrlParams();
      delete urlParams.edit;
      urlParams.sort = event.target.value;
      this.setUrlParams(urlParams);
    };
    this.view.addEventListener('change', handleViewChange);
  }
}

export default SortPresenter;
