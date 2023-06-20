import Service from './service';
/**
 * @extends {Service}
 */
class ApiService extends Service{
  /**
   * @param {Partial<ServiceOptions>} options
   */
  constructor(options){
    super({
      baseUrl: 'https://20.ecmascript.pages.academy/big-trip/',
      minResponseTime: 500,
      authorization: '',
      ...options
    });
  }

  /**
 * @return {Promise<Array<PointInSnakeCase>>}
 */
  async getPoints() {
    const response = await this.request('points');
    const points = response.json();
    return points;
  }

  /**
 * @return {Promise<Array<Destination>>}
 */
  async getDestinations() {
    const response = await this.request('destinations');
    const destinations = response.json();
    return destinations;
  }

  /**
 * @return {Promise<Array<OfferGroup>>}
 */
  async getOfferGroups() {
    const response = await this.request('offers');
    const offers = response.json();
    return offers;
  }
}
export default ApiService;
