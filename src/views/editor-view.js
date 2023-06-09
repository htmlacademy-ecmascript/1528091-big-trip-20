import './editor-view';
import View from './view.js';
import {createDatePickers, html} from '../utils.js';
/**
 * @extends {View<PointViewState>}
 * @implements {EventListenerObject}
 */

class EditorView extends View {
  /**
   * @type {ReturnType<createDatePickers>}
   */
  #destroyDatePickers;
  constructor() {
    super();

    this.classList.add('editor-view');
    this.setAttribute('role', 'list');
    this.addEventListener('click', this.handleClick);
    this.addEventListener('input', this.handleInput);
    this.addEventListener('submit', this.handleSubmit);
    this.addEventListener('reset', this.handleReset);
  }

  connectedCallback() {
    /**
     * @type {NodeListOf<HTMLInputElement>}
     */
    const dateFields = this.querySelectorAll('.event__input--time');
    const [startDateField, endDateField] = dateFields;
    this.#destroyDatePickers = createDatePickers(startDateField, endDateField);
    document.addEventListener('keydown', this);
  }

  disconnectedCallback() {
    this.#destroyDatePickers();
    document.removeEventListener('keydown', this);
  }

  /**
   * @param {MouseEvent & {target: Element}} event
   */
  handleClick(event) {
    if(event.target.closest('.event__rollup-btn') !== null) {
      this.notify('close');
    }
  }


  /**
   * @param {KeyboardEvent} event
  */
  handleEvent(event) {
    if(event.key === 'Escape') {
      this.notify('close');
    }
  }

  /**
   * @param {InputEvent} event
   */
  handleInput(event) {
    this.notify('edit', event.target);
  }

  /**
   * @param {SubmitEvent} event
   */
  handleSubmit(event) {
    const actByDefault = this.notify('save', event.target);

    if(!actByDefault) {
      event.preventDefault();
    }
  }

  /**
   * @param {Event} event
   */
  handleReset(event) {
    const point = this.state;
    const actByDefault = this.notify(point.isDraft ? 'close' : 'delete');

    if(!actByDefault) {
      event.preventDefault();
    }
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${this.createTypeFieldHtml()}
          ${this.createDestinationFieldHtml()}
          ${this.createScheduleFieldHtml()}
          ${this.createPriceFieldHtml()}
          ${this.createSubmitBtnHtml()}
          ${this.createResetBtnHtml()}
          ${this.createCloseBtnHtml()}

        </header>
        <section class="event__details">
          ${this.createOfferListFieldHtml()}
          ${this.createDestinationHtml()}
        </section>
      </form>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createTypeFieldHtml() {
    const point = this.state;
    const chosenType = this.state.types.find((it) => it.isSelected === true);
    return html`
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${chosenType.value}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${point.types.map((it) => html`
              <div class="event__type-item">
                <input id="event-type-${it.value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${it.value} ${it.isSelected ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${it.value}" for="event-type-${it.value}-1">${it.value.slice(0, 1).toUpperCase() + it.value.slice(1)}</label>
              </div>
          `)}

          </fieldset>
        </div>
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createDestinationFieldHtml() {
    const chosenType = this.state.types.find((it) => it.isSelected === true);
    const chosenDestination = this.state.destinations.find((it) => it.isSelected === true);
    return html`
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${chosenType.value}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${chosenDestination?.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${this.state.destinations.map((it) => html`
            <option value=${it.name}></option>
          `)}
        </datalist>
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createScheduleFieldHtml() {

    return html`
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${this.state.startDateTime}>
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${this.state.endDateTime}>
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createPriceFieldHtml() {
    return html`
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value=${this.state.basePrice}>
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createSubmitBtnHtml() {
    const point = this.state;
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit" ${point.isSaving ? 'disabled' : ''}>
        ${point.isSaving ? 'Saving...' : 'Save'}
      </button>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createResetBtnHtml() {
    const point = this.state;
    if(point.isDraft) {
      return html`
        <button class="event__reset-btn" type="reset">Cancel</button>
      `;
    }
    return html`
      <button class="event__reset-btn btn" type="reset" ${point.isDeleting ? 'disabled' : ''}>
        ${point.isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createCloseBtnHtml() {
    const point = this.state;
    if(point.isDraft) {
      return '';
    }
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createOfferListFieldHtml() {
    const offersList = this.state.offers;
    return html`
    <section class="event__section  event__section--offers"  ${offersList.length ? '' : 'hidden'}>
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersList.map((it) => html`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${it.id}" type="checkbox" name="event-offer" ${it.isSelected ? 'checked' : ''} value=>
          <label class="event__offer-label" for="${it.id}">
            <span class="event__offer-title">${it.title}</span>
            +€&nbsp;
            <span class="event__offer-price">${it.price}</span>
          </label>
        </div>
        `)}
      </div>
  </section>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createDestinationHtml() {
    const destinationsList = this.state.destinations;
    const chosenDestination = destinationsList.find((it) => it.isSelected === true);

    return html`
      <section ${chosenDestination ? '' : 'hidden'} class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${chosenDestination?.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${chosenDestination?.pictures.map((it) => html`
            <img class="event__photo" src=${it.src} alt="${it.description}">
          `)}
          </div>
        </div>
      </section>
    `;
  }

  renderTypeAndRelatedFields() {
    this.render('.event__type-wrapper', this.createTypeFieldHtml());
    this.render('.event__field-group--destination', this.createDestinationFieldHtml());
    this.render('.event__section--offers', this.createOfferListFieldHtml());
  }

  renderDestination() {
    this.render('.event__section--destination', this.createDestinationHtml());
  }

  renderSubmitButton() {
    this.render('.event__save-btn', this.createSubmitBtnHtml());
  }

  renderResetButton() {
    this.render('.event__reset-btn', this.createResetBtnHtml());
  }

}

customElements.define('editor-view', EditorView);

export default EditorView;
