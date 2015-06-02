import Ember from 'ember';

export default Ember.Controller.extend({
    init: function(){
       /*init settings for different cloud providers*/
        this.initData();
    },

    initData: function(){
        var that = this;
        that.set('cloudProvider',"CloudProvider settings dashboard");
    }

});
