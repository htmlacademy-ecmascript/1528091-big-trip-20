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
    const types = ['Day', 'Event', 'Time', 'Price', 'Offers'];
    const items = types.map((it) => (
      {
        value: it,
        isSelected: it === 'Offers',
        isDisabled: false
      }
    ));
    return {items};
  }
}

export default SortPresenter;
