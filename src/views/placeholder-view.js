import View from './view.js';
import {html} from '../utils.js';

/**
 * @extends View<PlaceholderViewState>}
 */

class PlaceholderView extends View {
  constructor() {
    super();

    this.classList.add('placeholder-view');
  }

  /**
   * @override
   */
  createHtml() {
    const placeholder = this.state;
    return html`
      <p ${placeholder.isHidden === true ? 'hidden' : ''} class="trip-events__msg">${placeholder.text}</p>
    `;
  }
}

customElements.define('placeholder-view', PlaceholderView);

export default PlaceholderView;
