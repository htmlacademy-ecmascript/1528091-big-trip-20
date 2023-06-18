import Model from './model';
import points from '../data/points.json';
import destinations from '../data/destinations.json';
import offerGroups from '../data/offers.json';

class AppModel extends Model{
  #points = points;
  #destinations = destinations;
  #offerGroups = offerGroups;

  /**
   * @type {Record<FilterType, (it:Point) => boolean>}
   */
  #filterCallbackMap = {
    everything: () => true,
    future:(it)=> Date.parse(it.startDateTime) > Date.now(),
    present: (it) => !this.#filterCallbackMap.past(it) && !this.#filterCallbackMap.future(it),
    past: (it) => Date.parse(it.endDateTime) < Date.now(),
  };

  /**
   * @type {Record<SortType, (a: Point, b: Point) => number>}
   */
  #sortCallbackMap = {
    day: (a, b) => Date.parse(a.startDateTime) - Date.parse(b.startDateTime),
    event:()=> 0,
    time: (a, b) => this.#calcPointDuration(a) - this.#calcPointDuration(b) ,
    price: (a, b) => a.basePrice - b.basePrice,
    offers: () => 0,
  };

  /**
   * @param {{filter?: FilterType, sort?: SortType}} [criteria]
   * @return {Array<Point>}
   */

  getPoints(criteria = {}) {
    const adaptedPoints = this.#points.map(AppModel.adaptPointForClient);
    const filterCallback = this.#filterCallbackMap[criteria.filter] ?? this.#filterCallbackMap.everything;
    const sortCallback = this.#sortCallbackMap[criteria.sort] ?? this.#sortCallbackMap.day;

    return adaptedPoints.sort(sortCallback).filter(filterCallback);
  }

  /**
   * @returns {Array<Destination>}
   */


  getDestinations(){
    return structuredClone(this.#destinations);
  }

  /**
   * @returns {Array<OfferGroup>}
   */

  getOfferGroups() {
    //@ts-ignore
    return structuredClone(this.#offerGroups);
  }

  /**
 *
 * @param {Point} point
 * @return {number}
 */
  #calcPointDuration(point) {
    return Date.parse(point.endDateTime) - Date.parse(point.startDateTime);
  }

  /**
   * @param {PointInSnakeCase} point
   * @return {Point}
   */
  static adaptPointForClient(point) {
    return {
      id: point.id,
      type: point.type,
      destinationId: point.destination,
      startDateTime:point.date_from,
      endDateTime: point.date_to,
      basePrice:point.base_price,
      offerIds: point.offers,
      isFavorite: point.is_favorite
    };
  }

}

export default AppModel;
