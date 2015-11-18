import Ember from 'ember';
import Constants from 'ember-validator/constants';

export default Ember.Mixin.create({
  FORMATS: [
    Constants.SSN_PATTERN1,
    Constants.SSN_PATTERN2,
    Constants.SSN_PATTERN3
  ],

  rules: {
    ssn: function(value) {
      var test  = false;
      var pattern = Ember.A();
      var format;
      var index;

      for (var count = 1; count <= this.FORMATS.length; count++) {
        index = count - 1;
        format = this.options['format' + count];
        if (format || this.options.all) {
          pattern.pushObject(this.FORMATS[index]);
        }
      }

      if (this.options.with) {
        pattern.pushObject(this.options.with);
      }

      if (Ember.isEmpty(pattern)) {
        pattern.pushObject(this.FORMATS[0]);
      }

      pattern.forEach(function(arr) {
        if (arr.test(value)) {
          test = true;
        }
      });

      return test;
    }
  },

  perform: function(value) {
    if (!Ember.isEmpty(value)) {
      this.process(value);
    }
  }
});
