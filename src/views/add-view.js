import View from './view.js';
import {html} from '../utils.js';

/**
 * @extends {View<AddViewState>}
 */
class AddView extends View {
  /**
   * @override
   */
  createHtml() {
    const add = this.state;

    return html`
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${add.isDisabled ? 'disabled' : ''}>New event</button>
    `;
  }
}

customElements.define('add-view', AddView);

export default AddView;
