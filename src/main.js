import './views/brief-view';
import './views/add-view';
import './views/filter-view';
import './views/sort-view';
import './views/list-view';

import AppModel from './models/app-model';

import BriefPresenter from './presentors/brief-presenter';
import AddPresenter from './presentors/add-presenter';
import SortPresenter from './presentors/sort-presenter';
import FilterPresenter from './presentors/filter-presenter';
import ListPresenter from './presentors/list-presenter';


const appModel = new AppModel();

new BriefPresenter(document.querySelector('brief-view'));
new AddPresenter(document.querySelector('add-view'));
new SortPresenter(document.querySelector('sort-view'));
new FilterPresenter(document.querySelector('filter-view'));
new ListPresenter(document.querySelector('list-view'), appModel);
/**
  * @type {BriefView}
 */
const briefView = document.querySelector('brief-view');

/**
  * @type {AddView}
 */

const addView = document.querySelector('add-view');

/**
  * @type {FilterView}
 */

const filterView = document.querySelector('filter-view');

/**
  * @type {SortView}
 */

const sortView = document.querySelector('sort-view');

/**
  * @type {ListView}
 */

const listView = document.querySelector('list-view');

briefView.render();
addView.render();
filterView.render();
sortView.render();
listView.render();
