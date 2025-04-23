import '../styles.css'
import views from './ListViews.js';
import ListController from './ListController.js'
import ListModel from './ListModel.js';

const model = new ListModel()
const controller = new ListController(views, model);

document.querySelector('.list-add-button').addEventListener('click', controller.handleListCreate);