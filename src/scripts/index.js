import '../styles.css'
import views from './views/ListViews.js';
import ListController from './controllers/ListController.js'
import ListModel from './models/ListModel.js';

const model = new ListModel()
const controller = new ListController(views, model);

document.querySelector('.list-add-button').addEventListener('click', controller.handleListCreate);