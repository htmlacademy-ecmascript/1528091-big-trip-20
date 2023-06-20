import './views/brief-view';
import './views/add-view';
import './views/filter-view';
import './views/sort-view';
import './views/list-view';
import './views/placeholder-view';

import AppModel from './models/app-model';

import BriefPresenter from './presentors/brief-presenter';
import AddPresenter from './presentors/add-presenter';
import SortPresenter from './presentors/sort-presenter';
import FilterPresenter from './presentors/filter-presenter';
import ListPresenter from './presentors/list-presenter';
import PlaceholderPresenter from './presentors/placeholder-presenter';

import ApiService from './services/api-service';
const apiService = new ApiService({
  authorization: 'Basic EmilyKanarsky'
});
const appModel = new AppModel(apiService);

new PlaceholderPresenter(document.querySelector('placeholder-view'), appModel);

appModel.loadData().then(()=> {
  new BriefPresenter(document.querySelector('brief-view'));
  new AddPresenter(document.querySelector('add-view'));
  new SortPresenter(document.querySelector('sort-view'));
  new FilterPresenter(document.querySelector('filter-view'));
  new ListPresenter(document.querySelector('list-view'), appModel);
});
