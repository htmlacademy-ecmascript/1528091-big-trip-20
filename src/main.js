import './views/brief-view';
import './views/add-view';
import './views/filter-view';
import './views/sort-view';
import './views/list-view';
import './views/placeholder-view';
import './views/overlay-view';
import AppModel from './models/app-model';

import BriefPresenter from './presenters/brief-presenter';
import AddPresenter from './presenters/add-presenter';
import SortPresenter from './presenters/sort-presenter';
import FilterPresenter from './presenters/filter-presenter';
import ListPresenter from './presenters/list-presenter';
import PlaceholderPresenter from './presenters/placeholder-presenter';
import OverlayPresenter from './presenters/overlay-presenter';

import ApiService from './services/api-service';

const apiService = new ApiService({
  authorization: 'Basic EmilyKanarsky'
});
const appModel = new AppModel(apiService);

new PlaceholderPresenter(document.querySelector('placeholder-view'), appModel);

appModel.loadData().then(()=> {
  new BriefPresenter(document.querySelector('brief-view'), appModel);
  new AddPresenter(document.querySelector('add-view'));
  new SortPresenter(document.querySelector('sort-view'), appModel);
  new FilterPresenter(document.querySelector('filter-view'), appModel);
  new ListPresenter(document.querySelector('list-view'), appModel);
  new OverlayPresenter(document.querySelector('overlay-view'), appModel);
});
