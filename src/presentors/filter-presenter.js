import Presenter from './presenter.js';

/**
 * @extends {Presenter<FilterView>}
 */
class FilterPresenter extends Presenter {
  /**
   * @override
   * @return {FilterViewState}
   */
  createViewState() {
    /**
     * @type {Array<FilterType>}
     */

    const types = ['Everything', 'Future', 'Past', 'Present'];
    const items = types.map((it) => (
      {
        value: it,
        isSelected: it === 'Past',
        isDisabled: false
      }
    ));
    return {items};
  }
}

export default FilterPresenter;
