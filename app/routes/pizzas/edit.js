// app/routes/libraries/edit.js
import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('pizza', params.pizza_id);
  },

  actions: {

    saveLibrary(newLibrary) {
      newLibrary.save().then(() => this.transitionTo('pizzas'));
    },

    willTransition(transition) {

      let model = this.controller.get('model');

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
